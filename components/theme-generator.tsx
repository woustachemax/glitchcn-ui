"use client"

import * as React from "react"
import { Sparkles, X, Check, Copy, RotateCcw, Loader2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  THEME_TOKENS,
  customThemeToCss,
  themeInstallCommand,
  tripletToHex,
  type CustomTheme,
  type Palette,
} from "@/lib/custom-theme"

const SUGGESTIONS = ["Tokyo at 3am, neon rain", "Matrix green phosphor CRT", "Vaporwave sunset", "Deep sea bioluminescence"]

const SWATCH_TOKENS: { token: (typeof THEME_TOKENS)[number]; label: string }[] = [
  { token: "surface", label: "surface" },
  { token: "primary", label: "primary" },
  { token: "border", label: "border" },
  { token: "accent", label: "accent" },
  { token: "destructive-border", label: "error" },
]

function Swatches({ palette, label }: { palette: Palette; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-wider text-[rgb(var(--glitch-primary)/60%)]">{label}</div>
      <div className="flex gap-1">
        {SWATCH_TOKENS.map(({ token, label: name }) => (
          <div
            key={token}
            title={`${name} ${tripletToHex(palette[token])}`}
            className="h-6 flex-1 border border-[rgb(var(--glitch-border)/40%)]"
            style={{ background: `rgb(${palette[token]})` }}
          />
        ))}
      </div>
    </div>
  )
}

export const OPEN_GENERATOR_EVENT = "glitch:open-theme-generator"

/** Open the AI theme generator from anywhere, optionally running a prompt right away. */
export function openThemeGenerator(prompt?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_GENERATOR_EVENT, { detail: { prompt } }))
}

function formatReset(reset: number) {
  const ms = reset - Date.now()
  if (ms <= 0) return "soon"
  const hours = Math.floor(ms / 3_600_000)
  const minutes = Math.ceil((ms % 3_600_000) / 60_000)
  return hours > 0 ? `in ${hours}h ${minutes}m` : `in ${minutes}m`
}

type Props = {
  open: boolean
  /** Prompt to run as soon as the panel opens (from the landing page). */
  autoPrompt?: string | null
  onClose: () => void
  onPreview: (theme: CustomTheme | null) => void
  onKeep: (theme: CustomTheme) => void
}

export function ThemeGenerator({ open, autoPrompt, onClose, onPreview, onKeep }: Props) {
  const [prompt, setPrompt] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState<CustomTheme | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [remaining, setRemaining] = React.useState<number | null>(null)
  const [limitedUntil, setLimitedUntil] = React.useState<number | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  const close = () => {
    abortRef.current?.abort()
    if (draft) onPreview(null)
    setDraft(null)
    setError(null)
    setLoading(false)
    onClose()
  }

  const generate = async (text: string) => {
    if (!text.trim() || loading) return
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/generate-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
        signal: controller.signal,
      })
      const data = await res.json()
      if (res.status === 429 && data.limited) {
        setLimitedUntil(typeof data.reset === "number" ? data.reset : Date.now() + 86_400_000)
        setRemaining(0)
        return
      }
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.")
      if (typeof data.remaining === "number") setRemaining(data.remaining)
      const theme = data as CustomTheme
      setDraft(theme)
      onPreview(theme)
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      setError((err as Error).message || "Something went wrong.")
    } finally {
      if (abortRef.current === controller) setLoading(false)
    }
  }

  const discard = () => {
    onPreview(null)
    setDraft(null)
  }

  const keep = () => {
    if (!draft) return
    onKeep(draft)
    setDraft(null)
    onClose()
  }

  const installCommand = draft?.id ? themeInstallCommand(window.location.origin, draft.id) : null

  // One click copies the install command; raw CSS only if the theme could not be saved.
  const copyInstall = async () => {
    if (!draft) return
    try {
      await navigator.clipboard.writeText(installCommand ?? customThemeToCss(draft))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const lastAutoPrompt = React.useRef<string | null>(null)
  React.useEffect(() => {
    if (!open || !autoPrompt || lastAutoPrompt.current === autoPrompt) return
    lastAutoPrompt.current = autoPrompt
    setPrompt(autoPrompt)
    generate(autoPrompt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoPrompt])

  React.useEffect(() => {
    if (!open) lastAutoPrompt.current = null
  }, [open])

  const limited = limitedUntil !== null && limitedUntil > Date.now()

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  })

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Generate a theme with AI"
      className={cn(
        "fixed z-[60] bottom-4 right-4 left-4 sm:left-auto sm:w-96 p-4 space-y-3 font-mono text-xs",
        "bg-[rgb(var(--glitch-surface))] border border-[rgb(var(--glitch-border)/60%)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%),0_0_24px_rgb(var(--glitch-border)/25%),0_8px_32px_rgba(0,0,0,0.6)]",
        "text-[rgb(var(--glitch-primary))]"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 uppercase tracking-wider">
          <Sparkles size={14} className="text-[rgb(var(--glitch-accent))]" />
          generate_theme
          {remaining !== null && !limited && (
            <span className="normal-case tracking-normal text-[rgb(var(--glitch-primary)/50%)]">
              · {remaining} left today
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="text-[rgb(var(--glitch-border-hover))] hover:text-[rgb(var(--glitch-primary))]"
        >
          <X size={14} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          generate(prompt)
        }}
        className="flex gap-2"
      >
        <div className="flex-1 flex items-center gap-1 px-2 border border-[rgb(var(--glitch-border)/50%)] focus-within:border-[rgb(var(--glitch-border-hover))] bg-[rgb(var(--glitch-surface-hover)/50%)]">
          <span className="text-[rgb(var(--glitch-accent))]">&gt;</span>
          <input
            autoFocus
            value={prompt}
            maxLength={300}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="describe a vibe..."
            className="flex-1 h-8 bg-transparent outline-none placeholder:text-[rgb(var(--glitch-primary)/40%)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !prompt.trim() || limited}
          className={cn(
            "h-8 px-3 border border-[rgb(var(--glitch-border))] uppercase tracking-wider",
            "hover:bg-[rgb(var(--glitch-border)/15%)] disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "run"}
        </button>
      </form>

      {limited && (
        <div className="relative overflow-hidden p-3 space-y-2 border border-[rgb(var(--glitch-accent)/60%)] bg-[rgb(var(--glitch-surface-hover))]">
          <div className="flex items-center gap-2 uppercase tracking-wider text-[rgb(var(--glitch-accent))]">
            <Lock size={12} /> quota_exceeded
          </div>
          <p className="text-[rgb(var(--glitch-primary)/80%)]">
            You&apos;ve used your free AI themes for today. Resets {formatReset(limitedUntil!)}.
          </p>
          <p className="text-[rgb(var(--glitch-primary)/60%)]">
            Your kept theme stays saved, and the built-in themes are always free.
          </p>
        </div>
      )}

      {!draft && !loading && !limited && (
        <div className="flex flex-wrap gap-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setPrompt(s)
                generate(s)
              }}
              className="px-2 py-0.5 border border-[rgb(var(--glitch-border)/30%)] text-[rgb(var(--glitch-primary)/70%)] hover:text-[rgb(var(--glitch-primary))] hover:border-[rgb(var(--glitch-border)/70%)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {loading && <div className="text-[rgb(var(--glitch-primary)/70%)] animate-pulse">compiling palette...</div>}

      {error && (
        <div className="px-2 py-1.5 border border-[rgb(var(--glitch-destructive-border)/60%)] bg-[rgb(var(--glitch-destructive-surface))] text-[rgb(var(--glitch-destructive))]">
          {error}
        </div>
      )}

      {draft && !loading && (
        <div className="space-y-3">
          <div>
            <span className="text-[rgb(var(--glitch-primary)/60%)]">previewing: </span>
            <span className="text-[rgb(var(--glitch-accent))]">{draft.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Swatches palette={draft.dark} label="dark" />
            <Swatches palette={draft.light} label="light" />
          </div>
          {installCommand && (
            <button
              type="button"
              onClick={copyInstall}
              title="Copy install command"
              className="group w-full flex items-center gap-2 px-2 py-2 text-left border border-[rgb(var(--glitch-accent)/50%)] bg-[rgb(var(--glitch-surface-hover)/60%)] hover:border-[rgb(var(--glitch-accent))]"
            >
              <span className="text-[rgb(var(--glitch-accent))]">$</span>
              <span className="flex-1 truncate text-[rgb(var(--glitch-primary)/85%)]">{installCommand}</span>
              {copied ? (
                <Check size={12} className="shrink-0 text-[rgb(var(--glitch-accent))]" />
              ) : (
                <Copy size={12} className="shrink-0 text-[rgb(var(--glitch-primary)/60%)] group-hover:text-[rgb(var(--glitch-primary))]" />
              )}
            </button>
          )}
          {installCommand && (
            <p className="text-[10px] text-[rgb(var(--glitch-primary)/55%)]">
              Run it in your project and the theme drops straight into your globals.css. Nothing to paste.
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={keep}
              className="flex-1 h-8 flex items-center justify-center gap-1 border border-[rgb(var(--glitch-border))] bg-[rgb(var(--glitch-border)/15%)] hover:bg-[rgb(var(--glitch-border)/25%)] uppercase tracking-wider"
            >
              <Check size={12} /> keep
            </button>
            {!installCommand && (
              <button
                type="button"
                onClick={copyInstall}
                className="h-8 px-3 flex items-center gap-1 border border-[rgb(var(--glitch-border)/50%)] hover:bg-[rgb(var(--glitch-border)/10%)] uppercase tracking-wider"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />} css
              </button>
            )}
            <button
              type="button"
              onClick={discard}
              aria-label="Discard preview"
              className="h-8 px-3 flex items-center border border-[rgb(var(--glitch-border)/50%)] hover:bg-[rgb(var(--glitch-border)/10%)]"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
