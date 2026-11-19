import Anthropic from "@anthropic-ai/sdk"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import { z } from "zod"
import { THEME_TOKENS, hexToTriplet, type Palette } from "@/lib/custom-theme"
import { checkThemeGenLimit, clientIp } from "@/lib/rate-limit"
import { saveTheme } from "@/lib/theme-store"

const MAX_PROMPT_LENGTH = 300

const paletteSchema = z.object(
  Object.fromEntries(THEME_TOKENS.map((t) => [t, z.string()])) as Record<
    (typeof THEME_TOKENS)[number],
    z.ZodString
  >
)

const ThemeSchema = z.object({
  name: z.string(),
  dark: paletteSchema,
  light: paletteSchema,
})

const SYSTEM_PROMPT = `You design color themes for Glitchcn/ui, a cyberpunk, terminal-styled React component library.

Each theme has a dark and a light palette. Every palette has these 12 tokens, each a 6-digit hex color like "#10b981":

- surface: component background. Dark mode: near-black with a slight tint of the theme hue (e.g. #001a1a). Light mode: a very pale tint (e.g. #ecfdf5).
- surface-hover: surface, slightly lighter (dark mode) or slightly more saturated (light mode).
- primary: main text and icon color. Must be highly legible on surface (WCAG AA contrast at least). Dark mode: a light pastel of the hue. Light mode: a deep, dark shade of the hue.
- border: the signature neon color of the theme, used for borders and glows.
- border-hover: a brighter variant of border.
- accent: a complementary or contrasting highlight color (e.g. emerald theme uses cyan, synthwave uses yellow). In light mode, accent is usually a soft pastel close to border.
- destructive-surface, destructive-surface-hover: like surface/surface-hover but tinted red/rose for error states.
- destructive: error text color, legible on destructive-surface.
- destructive-border, destructive-border-hover: red/rose/orange neon for error borders.
- destructive-glow: a saturated red used for glow shadows.

Reference — the built-in "emerald" theme:
dark: surface #001a1a, surface-hover #002626, primary #6ee7b7, border #10b981, border-hover #34d399, accent #06b6d4, destructive-surface #1a0000, destructive-surface-hover #260000, destructive #fda4af, destructive-border #f43f5e, destructive-border-hover #fb7185, destructive-glow #ef4444
light: surface #ecfdf5, surface-hover #d1fae5, primary #047857, border #6ee7b7, border-hover #34d399, accent #6ee7b7, destructive-surface #fff1f2, destructive-surface-hover #ffe4e6, destructive #be123c, destructive-border #fda4af, destructive-border-hover #fb7185, destructive-glow #ef4444

Interpret the user's description (a mood, a place, a brand vibe, a color, a movie aesthetic) and produce a cohesive theme. Keep the destructive tokens recognizably red/rose/orange unless the theme's main hue is already red, in which case shift them toward rose or magenta so errors stay distinguishable. Give the theme a short, evocative name (1-2 words).`

const client = new Anthropic()

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Theme generation is not configured." }, { status: 503 })
  }

  let prompt: unknown
  try {
    ;({ prompt } = await request.json())
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }
  if (typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: "Describe the theme you want." }, { status: 400 })
  }
  const trimmed = prompt.trim().slice(0, MAX_PROMPT_LENGTH)

  const limit = await checkThemeGenLimit(clientIp(request))
  if (!limit.ok) {
    return Response.json(
      {
        error:
          limit.scope === "ip"
            ? "You've used all your free generations for today."
            : "The theme generator hit its daily limit. Back tomorrow.",
        limited: true,
        scope: limit.scope,
        reset: limit.reset,
      },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) } }
    )
  }

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      output_config: {
        effort: "low",
        format: zodOutputFormat(ThemeSchema),
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Theme description: ${trimmed}` }],
    })

    if (response.stop_reason === "refusal") {
      return Response.json({ error: "Couldn't generate a theme for that prompt. Try another." }, { status: 422 })
    }

    const output = response.parsed_output
    if (!output) {
      return Response.json({ error: "The model returned an unreadable theme. Try again." }, { status: 502 })
    }

    const toPalette = (raw: Record<string, string>): Palette | null => {
      const palette = {} as Palette
      for (const token of THEME_TOKENS) {
        const triplet = hexToTriplet(raw[token] ?? "")
        if (!triplet) return null
        palette[token] = triplet
      }
      return palette
    }

    const dark = toPalette(output.dark)
    const light = toPalette(output.light)
    if (!dark || !light) {
      return Response.json({ error: "The model returned invalid colors. Try again." }, { status: 502 })
    }

    const theme = { name: output.name.slice(0, 40), prompt: trimmed, dark, light }
    const id = await saveTheme(theme)
    return Response.json({ ...theme, id: id ?? undefined, remaining: limit.remaining })
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "Too many requests right now. Try again in a minute." }, { status: 429 })
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("generate-theme: invalid ANTHROPIC_API_KEY")
      return Response.json({ error: "Theme generation is misconfigured." }, { status: 500 })
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`generate-theme: API error ${error.status}`, error.message)
      return Response.json({ error: "Theme generation failed. Try again." }, { status: 502 })
    }
    console.error("generate-theme:", error)
    return Response.json({ error: "Theme generation failed. Try again." }, { status: 500 })
  }
}
