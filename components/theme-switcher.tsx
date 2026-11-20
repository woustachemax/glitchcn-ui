"use client"

import * as React from "react"
import { Palette, Sun, Moon, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeGenerator, OPEN_GENERATOR_EVENT, type OpenGeneratorDetail } from "@/components/theme-generator"
import {
  applyCustomPalette,
  clearCustomPalette,
  loadCustomTheme,
  saveCustomTheme,
  tripletToHex,
  type CustomTheme,
} from "@/lib/custom-theme"

const THEMES = [
  { id: "emerald", label: "Emerald" },
  { id: "synthwave", label: "Synthwave" },
  { id: "amber", label: "Amber" },
  { id: "crimson", label: "Crimson" },
  { id: "glacier", label: "Glacier" },
] as const

type BuiltInThemeId = (typeof THEMES)[number]["id"]
type ThemeId = BuiltInThemeId | "custom"
type Mode = "dark" | "light"

const FAVICON_COLORS: Record<BuiltInThemeId, { border: string; accent: string }> = {
  emerald: { border: "#10b981", accent: "#06b6d4" },
  synthwave: { border: "#d946ef", accent: "#facc15" },
  amber: { border: "#f59e0b", accent: "#3b82f6" },
  crimson: { border: "#ef4444", accent: "#f97316" },
  glacier: { border: "#38bdf8", accent: "#f472b6" },
}

function buildFaviconHref({ border, accent }: { border: string; accent: string }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#000000"/><rect x="4" y="4" width="24" height="2" fill="${border}"/><rect x="4" y="6" width="2" height="20" fill="${border}"/><rect x="26" y="6" width="2" height="20" fill="${border}"/><rect x="4" y="26" width="24" height="2" fill="${border}"/><rect x="8" y="10" width="8" height="2" fill="${accent}"/><rect x="8" y="14" width="12" height="2" fill="${accent}"/><rect x="8" y="18" width="6" height="2" fill="${accent}"/><rect x="8" y="22" width="3" height="2" fill="${border}"/><rect x="12" y="22" width="2" height="2" fill="${border}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function applyFavicon(colors: { border: string; accent: string }) {
  const href = buildFaviconHref(colors)
  const links = document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']")
  if (links.length > 0) {
    links.forEach((el) => {
      el.href = href
    })
    return
  }
  const link = document.createElement("link")
  link.rel = "icon"
  link.href = href
  document.head.appendChild(link)
}

// `custom` is either a live preview (not yet kept) or the saved AI-generated theme.
function applyTheme(theme: ThemeId, mode: Mode, custom: CustomTheme | null) {
  document.documentElement.dataset.mode = mode
  if (custom) {
    document.documentElement.dataset.glitchTheme = "custom"
    applyCustomPalette(custom[mode], custom.shape)
    applyFavicon({ border: tripletToHex(custom.dark.border), accent: tripletToHex(custom.dark.accent) })
    return
  }
  const builtIn: BuiltInThemeId = theme === "custom" ? "emerald" : theme
  clearCustomPalette()
  document.documentElement.dataset.glitchTheme = builtIn
  applyFavicon(FAVICON_COLORS[builtIn])
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<ThemeId>("emerald")
  const [mode, setMode] = React.useState<Mode>("dark")
  const [open, setOpen] = React.useState(false)
  const [showHint, setShowHint] = React.useState(false)
  const [savedCustom, setSavedCustom] = React.useState<CustomTheme | null>(null)
  const [preview, setPreview] = React.useState<CustomTheme | null>(null)
  const [generatorOpen, setGeneratorOpen] = React.useState(false)
  const [autoPrompt, setAutoPrompt] = React.useState<string | null>(null)
  const [autoTheme, setAutoTheme] = React.useState<CustomTheme | null>(null)

  React.useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenGeneratorDetail>).detail
      setAutoPrompt(detail?.prompt?.trim() || null)
      setAutoTheme(detail?.theme ?? null)
      setGeneratorOpen(true)
      setOpen(false)
    }
    window.addEventListener(OPEN_GENERATOR_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_GENERATOR_EVENT, onOpen)
  }, [])
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("glitch-theme") as ThemeId | null
    const storedMode = localStorage.getItem("glitch-mode") as Mode | null
    const custom = loadCustomTheme()
    const nextTheme: ThemeId =
      storedTheme === "custom" && custom
        ? "custom"
        : storedTheme && THEMES.some((t) => t.id === storedTheme)
          ? storedTheme
          : "emerald"
    const nextMode = storedMode === "light" ? "light" : "dark"
    setTheme(nextTheme)
    setMode(nextMode)
    setSavedCustom(custom)
    applyTheme(nextTheme, nextMode, nextTheme === "custom" ? custom : null)
    setShowHint(!localStorage.getItem("glitch-theme-hint-seen"))
  }, [])

  const dismissHint = () => {
    if (showHint) {
      setShowHint(false)
      localStorage.setItem("glitch-theme-hint-seen", "1")
    }
  }

  React.useEffect(() => {
    if (!open) return
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const activeCustom = (t: ThemeId) => (t === "custom" ? savedCustom : null)

  const selectTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme)
    localStorage.setItem("glitch-theme", nextTheme)
    applyTheme(nextTheme, mode, preview ?? activeCustom(nextTheme))
  }

  const toggleMode = () => {
    const nextMode: Mode = mode === "dark" ? "light" : "dark"
    setMode(nextMode)
    localStorage.setItem("glitch-mode", nextMode)
    applyTheme(theme, nextMode, preview ?? activeCustom(theme))
  }

  const handlePreview = (next: CustomTheme | null) => {
    setPreview(next)
    applyTheme(theme, mode, next ?? activeCustom(theme))
  }

  const handleKeep = (kept: CustomTheme) => {
    saveCustomTheme(kept)
    setSavedCustom(kept)
    setPreview(null)
    setTheme("custom")
    localStorage.setItem("glitch-theme", "custom")
    applyTheme("custom", mode, kept)
  }

  return (
    <div ref={containerRef} className={cn("relative flex items-center gap-1", className)}>
      {showHint && (
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            dismissHint()
          }}
          className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--glitch-accent))] animate-pulse mr-1 hover:underline cursor-pointer"
        >
          5 themes + AI, try me
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value)
          dismissHint()
        }}
        aria-label="Choose theme"
        className={cn(
          "relative flex items-center justify-center h-8 w-8 rounded",
          "text-[rgb(var(--glitch-border-hover))] hover:text-[rgb(var(--glitch-primary))]",
          "hover:bg-[rgb(var(--glitch-border)/10%)] transition-colors"
        )}
      >
        <Palette size={16} />
        {showHint && (
          <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[rgb(var(--glitch-accent))] animate-pulse" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleMode}
        aria-label="Toggle light or dark mode"
        className={cn(
          "flex items-center justify-center h-8 w-8 rounded",
          "text-[rgb(var(--glitch-border-hover))] hover:text-[rgb(var(--glitch-primary))]",
          "hover:bg-[rgb(var(--glitch-border)/10%)] transition-colors"
        )}
      >
        {mode === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 z-50 w-44 p-1",
            "bg-[rgb(var(--glitch-surface))] border border-[rgb(var(--glitch-border)/50%)]",
            "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%),0_8px_32px_rgba(0,0,0,0.6)]"
          )}
        >
          {THEMES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                selectTheme(entry.id)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-2 py-1.5 text-xs font-mono text-left rounded",
                "text-[rgb(var(--glitch-primary)/90%)] hover:bg-[rgb(var(--glitch-border)/10%)] hover:text-[rgb(var(--glitch-primary))]",
                "transition-colors"
              )}
            >
              {entry.label}
              {entry.id === theme && <Check size={12} className="text-[rgb(var(--glitch-accent))]" />}
            </button>
          ))}
          {savedCustom && (
            <button
              type="button"
              onClick={() => {
                selectTheme("custom")
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-2 py-1.5 text-xs font-mono text-left rounded",
                "text-[rgb(var(--glitch-primary)/90%)] hover:bg-[rgb(var(--glitch-border)/10%)] hover:text-[rgb(var(--glitch-primary))]",
                "transition-colors"
              )}
            >
              <span className="truncate">{savedCustom.name}</span>
              {theme === "custom" && <Check size={12} className="shrink-0 text-[rgb(var(--glitch-accent))]" />}
            </button>
          )}
          <div className="my-1 h-px bg-[rgb(var(--glitch-border)/30%)]" />
          <button
            type="button"
            onClick={() => {
              setAutoPrompt(null)
              setAutoTheme(null)
              setGeneratorOpen(true)
              setOpen(false)
            }}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 text-xs font-mono text-left rounded",
              "text-[rgb(var(--glitch-accent))] hover:bg-[rgb(var(--glitch-border)/10%)]",
              "transition-colors"
            )}
          >
            <Sparkles size={12} />
            Generate with AI
          </button>
        </div>
      )}
      <ThemeGenerator
        open={generatorOpen}
        autoPrompt={autoPrompt}
        autoTheme={autoTheme}
        onClose={() => {
          setGeneratorOpen(false)
          setAutoPrompt(null)
          setAutoTheme(null)
        }}
        onPreview={handlePreview}
        onKeep={handleKeep}
      />
    </div>
  )
}
