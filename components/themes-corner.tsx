"use client"

import * as React from "react"
import Link from "next/link"
import { Terminal, Eye, Copy, Check, Loader2, Sparkles, LayoutGrid, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { THEME_GENERATED_EVENT, openThemeGenerator, tryOnTheme } from "@/components/theme-generator"
import { THEME_TOKENS, describeShape, shapeVars, themeAiPrompt, themeInstallCommand, type Palette, type ThemeShape } from "@/lib/custom-theme"
import type { CornerTheme } from "@/lib/corner"

/** Tracks the site's light/dark mode so previews use the matching palette. */
function useSiteMode() {
  const [mode, setMode] = React.useState<"dark" | "light">("dark")
  React.useEffect(() => {
    const read = () => setMode(document.documentElement.dataset.mode === "light" ? "light" : "dark")
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] })
    return () => observer.disconnect()
  }, [])
  return mode
}

// Scoping the --glitch-* vars onto an element makes everything inside it render in that theme.
function paletteStyle(palette: Palette, shape?: ThemeShape): React.CSSProperties {
  return {
    ...Object.fromEntries(THEME_TOKENS.map((t) => [`--glitch-${t}`, palette[t]])),
    ...shapeVars(shape),
  } as React.CSSProperties
}

// Chips inside the preview pick up the theme's corner rounding.
const chip = "rounded-[var(--glitch-radius)]"

function timeAgo(ms: number) {
  const s = Math.max(1, Math.floor((Date.now() - ms) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

/** A tiny dashboard drawn in the theme's own colours. */
function ThemePreview({ palette, shape, name }: { palette: Palette; shape?: ThemeShape; name: string }) {
  return (
    <div
      style={paletteStyle(palette, shape)}
      className="bg-[rgb(var(--glitch-surface))] p-3 space-y-2 font-mono text-[10px] text-[rgb(var(--glitch-primary))] border-b border-[rgb(var(--glitch-border)/40%)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 truncate text-[rgb(var(--glitch-accent))]">
          <Terminal size={10} /> {name.toLowerCase().replace(/\s+/g, "_")}
        </span>
        <span className={`${chip} px-1.5 border border-[rgb(var(--glitch-border))] shadow-[0_0_6px_rgb(var(--glitch-border)/60%)]`}>live</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[rgb(var(--glitch-primary)/70%)]">
          <span>cpu</span>
          <span>72%</span>
        </div>
        <div className={`${chip} overflow-hidden h-1.5 bg-[rgb(var(--glitch-surface-hover))] border border-[rgb(var(--glitch-border)/30%)]`}>
          <div className="h-full w-[72%] bg-[linear-gradient(90deg,rgb(var(--glitch-border)),rgb(var(--glitch-accent)))]" />
        </div>
      </div>
      <div className="flex gap-1.5">
        <span className={`${chip} px-2 py-0.5 border border-[rgb(var(--glitch-border))] bg-[rgb(var(--glitch-border)/15%)]`}>execute</span>
        <span className={`${chip} px-2 py-0.5 border border-[rgb(var(--glitch-destructive-border))] bg-[rgb(var(--glitch-destructive-surface))] text-[rgb(var(--glitch-destructive))]`}>
          abort
        </span>
        <span className={`${chip} ml-auto px-2 py-0.5 border border-[rgb(var(--glitch-border)/40%)] bg-[rgb(var(--glitch-surface-hover))] text-[rgb(var(--glitch-primary)/60%)]`}>
          $ _
        </span>
      </div>
    </div>
  )
}

function CornerCard({ theme, mode }: { theme: CornerTheme; mode: "dark" | "light" }) {
  const [copied, setCopied] = React.useState(false)
  const [promptCopied, setPromptCopied] = React.useState(false)
  const asCustomTheme = { id: theme.id, name: theme.name, prompt: theme.prompt, dark: theme.dark, light: theme.light, shape: theme.shape }
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(themeAiPrompt(asCustomTheme, window.location.origin))
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 1500)
    } catch {}
  }
  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(themeInstallCommand(window.location.origin, theme.id))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    // The card itself takes the theme's shape so rounded vs sliced corners are visible at a glance.
    <Card className="p-0 gap-0" style={shapeVars(theme.shape) as React.CSSProperties}>
      <ThemePreview palette={theme[mode]} shape={theme.shape} name={theme.name} />
      <div className="p-3 space-y-2 font-mono">
        <div className="min-w-0">
          <div className="text-sm text-[rgb(var(--glitch-primary))] truncate">{theme.name}</div>
          <div className="text-[11px] text-[rgb(var(--glitch-primary)/60%)] line-clamp-2" title={theme.prompt}>
            &quot;{theme.prompt}&quot;
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[rgb(var(--glitch-primary)/55%)]">
          <span className="truncate text-[rgb(var(--glitch-accent)/80%)]">{theme.anon}</span>
          <span>·</span>
          <span className="shrink-0">{timeAgo(theme.createdAt)}</span>
          <span className="ml-auto shrink-0">{describeShape(theme.shape)}</span>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => tryOnTheme(asCustomTheme)}
            className="rounded-[var(--glitch-radius,0px)] flex-1 h-8 flex items-center justify-center gap-1 border border-[rgb(var(--glitch-border))] bg-[rgb(var(--glitch-border)/15%)] hover:bg-[rgb(var(--glitch-border)/25%)] text-xs uppercase tracking-wider text-[rgb(var(--glitch-primary))]"
          >
            <Eye size={12} /> try it on
          </button>
          <button
            type="button"
            onClick={copyInstall}
            title="Copy install command"
            className="rounded-[var(--glitch-radius,0px)] h-8 px-3 flex items-center gap-1 border border-[rgb(var(--glitch-border)/50%)] hover:bg-[rgb(var(--glitch-border)/10%)] text-xs uppercase tracking-wider text-[rgb(var(--glitch-primary))]"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />} install
          </button>
          <button
            type="button"
            onClick={copyPrompt}
            title="Copy a prompt for your AI assistant"
            aria-label="Copy AI prompt"
            className="rounded-[var(--glitch-radius,0px)] h-8 px-2.5 flex items-center border border-[rgb(var(--glitch-border)/50%)] hover:bg-[rgb(var(--glitch-border)/10%)] text-[rgb(var(--glitch-primary))]"
          >
            {promptCopied ? <Check size={12} /> : <Bot size={12} />}
          </button>
        </div>
      </div>
    </Card>
  )
}

const PAGE_SIZE = 24

/**
 * Grid of community-generated themes.
 * `preview` shows the latest few as a landing-page section; otherwise it's the full paginated list.
 */
export function ThemesCorner({ preview = false }: { preview?: boolean }) {
  const mode = useSiteMode()
  // Home page shows one row; the full list lives at /themes.
  const limit = preview ? 4 : PAGE_SIZE
  const [themes, setThemes] = React.useState<CornerTheme[]>([])
  const [nextOffset, setNextOffset] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const load = React.useCallback(
    async (offset: number) => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(`/api/themes?offset=${offset}&limit=${limit}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setThemes((prev) => (offset === 0 ? data.themes : [...prev, ...data.themes]))
        setNextOffset(data.nextOffset)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [limit]
  )

  React.useEffect(() => {
    load(0)
    const refresh = () => load(0)
    window.addEventListener(THEME_GENERATED_EVENT, refresh)
    return () => window.removeEventListener(THEME_GENERATED_EVENT, refresh)
  }, [load])

  const grid = (
    <div className={preview ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"}>
      {themes.map((theme) => (
        <CornerCard key={theme.id} theme={theme} mode={mode} />
      ))}
    </div>
  )

  const empty = !loading && !error && themes.length === 0 && (
    <div className="py-6 text-center font-mono space-y-3">
      <p className="text-sm text-[rgb(var(--glitch-primary)/80%)]">No themes yet. Make the first one.</p>
      <Button size="sm" onClick={() => openThemeGenerator()}>
        <Sparkles size={14} className="mr-1" /> Generate a theme
      </Button>
    </div>
  )

  const errorNote = error && (
    <p className="font-mono text-xs text-[rgb(var(--glitch-destructive))]">Couldn&apos;t load themes. Refresh to try again.</p>
  )

  if (preview) {
    return (
      <Card>
        <CardHeader className="flex-row flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <LayoutGrid size={14} /> Themes Corner
            </CardTitle>
            <CardDescription className="text-xs">Fresh themes from anonymous visitors. Try one on.</CardDescription>
          </div>
          <Button size="sm" asChild>
            <Link href="/themes">See all</Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {errorNote}
          {empty}
          {grid}
          {loading && themes.length === 0 && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin text-[rgb(var(--glitch-accent))]" size={18} />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {errorNote}
      {empty && <Card className="p-4">{empty}</Card>}
      {grid}
      <div className="flex justify-center py-4">
        {loading ? (
          <Loader2 className="animate-spin text-[rgb(var(--glitch-accent))]" size={18} />
        ) : nextOffset !== null ? (
          <Button size="sm" onClick={() => load(nextOffset)}>
            Load more
          </Button>
        ) : null}
      </div>
    </div>
  )
}
