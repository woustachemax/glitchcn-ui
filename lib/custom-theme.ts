export const THEME_TOKENS = [
  "surface",
  "surface-hover",
  "primary",
  "border",
  "border-hover",
  "accent",
  "destructive-surface",
  "destructive-surface-hover",
  "destructive",
  "destructive-border",
  "destructive-border-hover",
  "destructive-glow",
] as const

export type ThemeToken = (typeof THEME_TOKENS)[number]
// Each value is an "R G B" triplet, matching how globals.css stores --glitch-* vars.
export type Palette = Record<ThemeToken, string>

/**
 * Container shape, in px. `cut` is the chamfered (sliced) corner size the components
 * clip to; `radius` rounds the corners. The default look is cut 8, radius 0.
 */
export type ThemeShape = { radius: number; cut: number }

export const DEFAULT_SHAPE: ThemeShape = { radius: 0, cut: 8 }
export const MAX_RADIUS = 24
export const MAX_CUT = 16

export function clampShape(shape: Partial<ThemeShape> | undefined | null): ThemeShape {
  const num = (v: unknown, max: number, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.round(Math.min(max, Math.max(0, v))) : fallback
  const radius = num(shape?.radius, MAX_RADIUS, DEFAULT_SHAPE.radius)
  // Rounded corners and sliced corners fight each other visually; rounding wins.
  const cut = radius > 0 ? 0 : num(shape?.cut, MAX_CUT, DEFAULT_SHAPE.cut)
  return { radius, cut }
}

/** CSS variables for a shape. --radius also drives the rounded-* utilities on buttons and inputs. */
export function shapeVars(shape: ThemeShape | undefined): Record<string, string> {
  const s = clampShape(shape)
  return {
    "--glitch-radius": `${s.radius}px`,
    "--glitch-cut": `${s.cut}px`,
    "--radius": `${s.radius > 0 ? s.radius : s.cut > 0 ? 10 : 0}px`,
    // Rounded themes clip to a rounded rect so shadows don't leak past the curve.
    // `initial` makes var(--glitch-clip, <sliced polygon>) fall back to the polygon.
    "--glitch-clip": s.radius > 0 ? `inset(0 round ${s.radius}px)` : "initial",
  }
}

export function describeShape(shape: ThemeShape | undefined): string {
  const s = clampShape(shape)
  if (s.radius > 0) return `rounded ${s.radius}px`
  if (s.cut > 0) return `sliced ${s.cut}px`
  return "sharp"
}

export type CustomTheme = {
  name: string
  prompt: string
  dark: Palette
  light: Palette
  /** Missing on themes made before shapes existed; treated as DEFAULT_SHAPE. */
  shape?: ThemeShape
  /** Set when the server saved the theme; gives it an install URL at /r/theme/<id>. */
  id?: string
}

export const CUSTOM_THEME_STORAGE_KEY = "glitch-custom-theme"

export function hexToTriplet(hex: string): string | null {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) return null
  let value = match[1]
  if (value.length === 3) value = value.split("").map((c) => c + c).join("")
  const n = parseInt(value, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export function tripletToHex(triplet: string): string {
  return (
    "#" +
    triplet
      .split(" ")
      .map((part) => Number(part).toString(16).padStart(2, "0"))
      .join("")
  )
}

const SHAPE_VAR_NAMES = ["--glitch-radius", "--glitch-cut", "--radius", "--glitch-clip"]

export function applyCustomPalette(palette: Palette, shape?: ThemeShape) {
  const style = document.documentElement.style
  for (const token of THEME_TOKENS) {
    style.setProperty(`--glitch-${token}`, palette[token])
  }
  for (const [name, value] of Object.entries(shapeVars(shape))) {
    style.setProperty(name, value)
  }
}

export function clearCustomPalette() {
  const style = document.documentElement.style
  for (const token of THEME_TOKENS) {
    style.removeProperty(`--glitch-${token}`)
  }
  for (const name of SHAPE_VAR_NAMES) {
    style.removeProperty(name)
  }
}

export function loadCustomTheme(): CustomTheme | null {
  try {
    const raw = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CustomTheme
    if (!parsed?.dark || !parsed?.light) return null
    return parsed
  } catch {
    return null
  }
}

export function saveCustomTheme(theme: CustomTheme) {
  try {
    localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(theme))
  } catch {}
}

export function themeSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom"
  )
}

const paletteVars = (palette: Palette) => Object.fromEntries(THEME_TOKENS.map((t) => [`--glitch-${t}`, palette[t]]))

const cssBlock = (selector: string, vars: Record<string, string>) =>
  `${selector} {\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`

// Same selector shape as the built-in themes in globals.css, so it slots in
// next to them and wins over the default emerald :root block.
export function customThemeToCss(theme: CustomTheme): string {
  const slug = themeSlug(theme.name)
  const prompt = theme.prompt.replace(/\*\//g, "* /")
  const name = theme.name.replace(/\*\//g, "* /")
  return [
    `/* Glitchcn theme "${name}", generated from: "${prompt}"\n   Paste into globals.css, then set <html data-glitch-theme="${slug}">.\n   Add data-mode="light" for the light variant. */`,
    cssBlock(`:root[data-glitch-theme="${slug}"]`, { ...paletteVars(theme.dark), ...shapeVars(theme.shape) }),
    cssBlock(`:root[data-glitch-theme="${slug}"][data-mode="light"]`, paletteVars(theme.light)),
  ].join("\n\n")
}

export function themeInstallCommand(origin: string, id: string) {
  return `npx shadcn@latest add ${origin}/r/theme/${id}`
}

/** A ready-to-paste prompt for an AI coding assistant to apply the theme, colours and shape. */
export function themeAiPrompt(theme: CustomTheme, origin: string): string {
  const shape = clampShape(theme.shape)
  const lines = [
    `Apply the "${theme.name}" theme from glitchcn/ui (a cyberpunk, glitch-styled shadcn/ui registry) to my React + Tailwind CSS project.`,
    `It was generated from the vibe: "${theme.prompt}".`,
    "",
  ]
  if (theme.id) {
    lines.push("Easiest: install it with the shadcn CLI, which merges it into globals.css:", themeInstallCommand(origin, theme.id), "")
  }
  lines.push(
    `Shape: ${describeShape(shape)} corners. glitchcn components read --glitch-cut (sliced corner size), --glitch-radius (corner rounding) and --glitch-clip (clip shape); --radius drives the rounded-* utilities.`,
    "",
    "Theme CSS (colour values are space-separated RGB channels used as rgb(var(--glitch-*))):",
    "```css",
    customThemeToCss({ ...theme, shape }),
    "```",
    "",
    "Add this to my globals.css, set data-glitch-theme on <html> as the comment says (or make it the default), and keep the glitch styling intact. If my project isn't using glitchcn/ui components yet, map these colours and corner shapes onto my existing components."
  )
  return lines.join("\n")
}

type CssRules = Record<string, Record<string, string>>

/**
 * shadcn registry item that merges the theme straight into the user's main CSS file.
 * `:root:not([data-glitch-theme])` makes it the default when no built-in theme is
 * picked, and its extra specificity beats glitchcn's plain `:root` defaults even
 * when those load later (e.g. Vite, where globals.css and index.css are separate
 * files). The named data-glitch-theme selectors keep it switchable.
 */
export function themeRegistryItem(theme: Omit<CustomTheme, "id">) {
  const slug = themeSlug(theme.name)
  const css: CssRules = {
    [`:root:not([data-glitch-theme]), :root[data-glitch-theme="${slug}"]`]: {
      ...paletteVars(theme.dark),
      ...shapeVars(theme.shape),
    },
    [`:root:not([data-glitch-theme])[data-mode="light"], :root[data-glitch-theme="${slug}"][data-mode="light"]`]:
      paletteVars(theme.light),
  }
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${slug}`,
    type: "registry:theme",
    title: theme.name,
    description: `AI-generated Glitchcn theme from the prompt: "${theme.prompt}"`,
    registryDependencies: [],
    css,
    docs: `Installed the "${theme.name}" theme (${describeShape(theme.shape)} corners). It is now the default. Add data-mode="light" to <html> for the light variant, or data-glitch-theme="${slug}" to pick it explicitly alongside other themes.`,
  }
}
