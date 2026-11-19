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

export type CustomTheme = {
  name: string
  prompt: string
  dark: Palette
  light: Palette
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

export function applyCustomPalette(palette: Palette) {
  const style = document.documentElement.style
  for (const token of THEME_TOKENS) {
    style.setProperty(`--glitch-${token}`, palette[token])
  }
}

export function clearCustomPalette() {
  const style = document.documentElement.style
  for (const token of THEME_TOKENS) {
    style.removeProperty(`--glitch-${token}`)
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

// Same selector shape as the built-in themes in globals.css, so it slots in
// next to them and wins over the default emerald :root block.
export function customThemeToCss(theme: CustomTheme): string {
  const slug = themeSlug(theme.name)
  const block = (selector: string, palette: Palette) =>
    `${selector} {\n${THEME_TOKENS.map((t) => `  --glitch-${t}: ${palette[t]};`).join("\n")}\n}`
  const prompt = theme.prompt.replace(/\*\//g, "* /")
  const name = theme.name.replace(/\*\//g, "* /")
  return [
    `/* Glitchcn theme "${name}", generated from: "${prompt}"\n   Paste into globals.css, then set <html data-glitch-theme="${slug}">.\n   Add data-mode="light" for the light variant. */`,
    block(`:root[data-glitch-theme="${slug}"]`, theme.dark),
    block(`:root[data-glitch-theme="${slug}"][data-mode="light"]`, theme.light),
  ].join("\n\n")
}

export function themeInstallCommand(origin: string, id: string) {
  return `npx shadcn@latest add ${origin}/r/theme/${id}`
}

type CssRules = Record<string, Record<string, string>>

/**
 * shadcn registry item that merges the theme straight into the user's globals.css.
 * The plain :root selectors make it the default theme with no extra setup; the
 * named data-glitch-theme selectors keep it switchable next to the built-ins.
 */
export function themeRegistryItem(theme: Omit<CustomTheme, "id">) {
  const slug = themeSlug(theme.name)
  const vars = (palette: Palette) =>
    Object.fromEntries(THEME_TOKENS.map((t) => [`--glitch-${t}`, palette[t]]))
  const css: CssRules = {
    [`:root, :root[data-glitch-theme="${slug}"]`]: vars(theme.dark),
    [`:root[data-mode="light"], :root[data-glitch-theme="${slug}"][data-mode="light"]`]: vars(theme.light),
  }
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${slug}`,
    type: "registry:theme",
    title: theme.name,
    description: `AI-generated Glitchcn theme from the prompt: "${theme.prompt}"`,
    registryDependencies: [],
    css,
    docs: `Installed the "${theme.name}" theme. It is now the default. Add data-mode="light" to <html> for the light variant, or data-glitch-theme="${slug}" to pick it explicitly alongside other themes.`,
  }
}
