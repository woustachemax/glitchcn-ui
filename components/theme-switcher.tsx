"use client"

import * as React from "react"
import { Palette, Sun, Moon, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const THEMES = [
  { id: "emerald", label: "Emerald" },
  { id: "synthwave", label: "Synthwave" },
  { id: "amber", label: "Amber" },
  { id: "crimson", label: "Crimson" },
  { id: "glacier", label: "Glacier" },
] as const

type ThemeId = (typeof THEMES)[number]["id"]
type Mode = "dark" | "light"

const FAVICON_COLORS: Record<ThemeId, { border: string; accent: string }> = {
  emerald: { border: "#10b981", accent: "#06b6d4" },
  synthwave: { border: "#d946ef", accent: "#facc15" },
  amber: { border: "#f59e0b", accent: "#3b82f6" },
  crimson: { border: "#ef4444", accent: "#f97316" },
  glacier: { border: "#38bdf8", accent: "#f472b6" },
}

function buildFaviconHref(theme: ThemeId) {
  const { border, accent } = FAVICON_COLORS[theme]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#000000"/><rect x="4" y="4" width="24" height="2" fill="${border}"/><rect x="4" y="6" width="2" height="20" fill="${border}"/><rect x="26" y="6" width="2" height="20" fill="${border}"/><rect x="4" y="26" width="24" height="2" fill="${border}"/><rect x="8" y="10" width="8" height="2" fill="${accent}"/><rect x="8" y="14" width="12" height="2" fill="${accent}"/><rect x="8" y="18" width="6" height="2" fill="${accent}"/><rect x="8" y="22" width="3" height="2" fill="${border}"/><rect x="12" y="22" width="2" height="2" fill="${border}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function applyFavicon(theme: ThemeId) {
  const href = buildFaviconHref(theme)
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

function applyTheme(theme: ThemeId, mode: Mode) {
  document.documentElement.dataset.glitchTheme = theme
  document.documentElement.dataset.mode = mode
  applyFavicon(theme)
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<ThemeId>("emerald")
  const [mode, setMode] = React.useState<Mode>("dark")
  const [open, setOpen] = React.useState(false)
  const [showHint, setShowHint] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("glitch-theme") as ThemeId | null
    const storedMode = localStorage.getItem("glitch-mode") as Mode | null
    const nextTheme = storedTheme && THEMES.some((t) => t.id === storedTheme) ? storedTheme : "emerald"
    const nextMode = storedMode === "light" ? "light" : "dark"
    setTheme(nextTheme)
    setMode(nextMode)
    applyTheme(nextTheme, nextMode)
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

  const selectTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme)
    localStorage.setItem("glitch-theme", nextTheme)
    applyTheme(nextTheme, mode)
  }

  const toggleMode = () => {
    const nextMode: Mode = mode === "dark" ? "light" : "dark"
    setMode(nextMode)
    localStorage.setItem("glitch-mode", nextMode)
    applyTheme(theme, nextMode)
  }

  return (
    <div ref={containerRef} className={cn("relative flex items-center gap-1", className)}>
      {showHint && (
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--glitch-accent))] animate-pulse mr-1">
          5 themes, try me
        </span>
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
            "absolute right-0 top-full mt-2 z-50 w-40 p-1",
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
        </div>
      )}
    </div>
  )
}
