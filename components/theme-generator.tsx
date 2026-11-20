"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, X, Check, Copy, RotateCcw, Loader2, Lock, LayoutGrid, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  THEME_TOKENS,
  customThemeToCss,
  themeInstallCommand,
  themeAiPrompt,
  describeShape,
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
export const THEME_GENERATED_EVENT = "glitch:theme-generated"

export type OpenGeneratorDetail = {
  /** Run this prompt as soon as the panel opens. */
  prompt?: string
  /** Show an existing theme (e.g. from the themes corner) as the preview instead of generating. */
  theme?: CustomTheme
}

/** Open the AI theme generator from anywhere, optionally running a prompt right away. */
export function openThemeGenerator(prompt?: string) {
  window.dispatchEvent(new CustomEvent<OpenGeneratorDetail>(OPEN_GENERATOR_EVENT, { detail: { prompt } }))
}

/** Preview an existing theme on the whole site, with keep / discard / install. */
export function tryOnTheme(theme: CustomTheme) {
  window.dispatchEvent(new CustomEvent<OpenGeneratorDetail>(OPEN_GENERATOR_EVENT, { detail: { theme } }))
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
  autoPrompt?: string | null
  autoTheme?: CustomTheme | null
  onClose: () => void
  onPreview: (theme: CustomTheme | null) => void
  onKeep: (theme: CustomTheme) => void
}

const panelButton =
  "rounded-[var(--glitch-radius,0px)] h-8 px-3 flex items-center justify-center gap-1 border border-[rgb(var(--glitch-border)/50%)] hover:bg-[rgb(var(--glitch-border)/10%)] uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"

export function ThemeGenerator({ open, autoPrompt, autoTheme, onClose, onPreview, onKeep }: Props) {
  const [prompt, setPrompt] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState<CustomTheme | null>(null)
  // True when the draft came from the themes corner rather than a fresh generation.
  const [draftFromCorner, setDraftFromCorner] = React.useState(false)
  const [anon, setAnon] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [promptCopied, setPromptCopied] = React.useState(false)
  const [remaining, setRemaining] = React.useState<number | null>(null)
  const [limitedUntil, setLimitedUntil] = React.useState<number | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  const showDraft = (theme: CustomTheme | null, fromCorner = false) => {
    setDraft(theme)
    setDraftFromCorner(fromCorner)
    onPreview(theme)
  }

  const close = () => {
    abortRef.current?.abort()
    if (draft) onPreview(null)
    setDraft(null)
    setDraftFromCorner(false)
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
      if (typeof data.anon === "string") setAnon(data.anon)
      // Let the themes corner show the new theme without a reload.
      if (data.id) window.dispatchEvent(new Event(THEME_GENERATED_EVENT))
      showDraft(data as CustomTheme)
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      setError((err as Error).message || "Something went wrong.")
    } finally {
      if (abortRef.current === controller) setLoading(false)
    }
  }

  const keep = () => {
    if (!draft) return
    onKeep(draft)
    setDraft(null)
    onClose()
  }

  const installCommand = draft?.id ? themeInstallCommand(window.location.origin, draft.id) : null

  // One click copies the install command; raw CSS only if the theme could not be saved.
  const copyAiPrompt = async () => {
    if (!draft) return
    try {
      await navigator.clipboard.writeText(themeAiPrompt(draft, window.location.origin))
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 1500)
    } catch {}
  }

  const copyInstall = async () => {
    if (!draft) return
    try {
      await navigator.clipboard.writeText(installCommand ?? customThemeToCss(draft))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  // Open requests from elsewhere: run a prompt, or try on a themes-corner theme.
  const lastRequest = React.useRef<unknown>(null)
  React.useEffect(() => {
    if (!open) {
      lastRequest.current = null
      return
    }
    const request = autoTheme ?? autoPrompt
    if (!request || lastRequest.current === request) return
    lastRequest.current = request
    if (autoTheme) {
      showDraft(autoTheme, true)
    } else if (autoPrompt) {
      setPrompt(autoPrompt)
      generate(autoPrompt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoPrompt, autoTheme])

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
        "fixed z-[60] bottom-4 right-4 left-4 sm:left-auto sm:w-96 p-4 space-y-3 font-mono text-xs rounded-[var(--glitch-radius,0px)]",
        "bg-[rgb(var(--glitch-surface))] border border-[rgb(var(--glitch-border)/60%)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%),0_0_24px_rgb(var(--glitch-border)/25%),0_8px_32px_rgba(0,0,0,0.6)]",
        "text-[rgb(var(--glitch-primary))]"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 uppercase tracking-wider">
          <Sparkles size={14} className="text-[rgb(var(--glitch-accent))]" />
          {draftFromCorner ? "try_theme" : "generate_theme"}
          {remaining !== null && !limited && !draftFromCorner && (
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

      {!draftFromCorner && (
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
            className={cn(panelButton, "border-[rgb(var(--glitch-border))]")}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "run"}
          </button>
        </form>
      )}

      {!draft && !loading && !limited && !draftFromCorner && (
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

      {limited && !draftFromCorner && (
        <div className="p-3 space-y-2 border border-[rgb(var(--glitch-accent)/60%)] bg-[rgb(var(--glitch-surface-hover))]">
          <div className="flex items-center gap-2 uppercase tracking-wider text-[rgb(var(--glitch-accent))]">
            <Lock size={12} /> quota_exceeded
          </div>
          <p className="text-[rgb(var(--glitch-primary)/80%)]">
            You&apos;ve used your free AI themes for today. Resets {formatReset(limitedUntil!)}.
          </p>
          <p className="text-[rgb(var(--glitch-primary)/60%)]">
            Meanwhile, try on themes other people made in the{" "}
            <Link href="/themes" className="underline text-[rgb(var(--glitch-accent))]">
              themes corner
            </Link>
            .
          </p>
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
            <span className="text-[rgb(var(--glitch-primary)/50%)]"> · {describeShape(draft.shape)} corners</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Swatches palette={draft.dark} label="dark" />
            <Swatches palette={draft.light} label="light" />
          </div>

          {installCommand && (
            <>
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
              <p className="text-[10px] text-[rgb(var(--glitch-primary)/55%)]">
                Run it in your project and the theme drops straight into your globals.css. Nothing to paste.
              </p>
            </>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={keep}
              className={cn(panelButton, "flex-1 border-[rgb(var(--glitch-border))] bg-[rgb(var(--glitch-border)/15%)] hover:bg-[rgb(var(--glitch-border)/25%)]")}
            >
              <Check size={12} /> keep
            </button>
            <button type="button" onClick={copyAiPrompt} title="Copy a prompt for your AI assistant" className={panelButton}>
              {promptCopied ? <Check size={12} /> : <Bot size={12} />} prompt
            </button>
            {!installCommand && (
              <button type="button" onClick={copyInstall} className={panelButton}>
                {copied ? <Check size={12} /> : <Copy size={12} />} css
              </button>
            )}
            <button type="button" onClick={() => showDraft(null)} aria-label="Discard preview" className={panelButton}>
              <RotateCcw size={12} />
            </button>
          </div>
          {!draftFromCorner && draft.id && (
            <Link
              href="/themes"
              className="flex items-center gap-1 text-[10px] text-[rgb(var(--glitch-primary)/60%)] hover:text-[rgb(var(--glitch-accent))]"
            >
              <LayoutGrid size={10} /> added to the themes corner{anon ? ` as ${anon}` : ""} &rarr;
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
