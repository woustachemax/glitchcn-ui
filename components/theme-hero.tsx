"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { openThemeGenerator } from "@/components/theme-generator"
import { Card } from "@/components/ui/card"

// Every shape is sampled at the same number of points so `d` can morph smoothly between them.
const POINTS = 72
const SIZE = 200
const C = SIZE / 2

function polygonRadius(theta: number, sides: number) {
  const seg = (2 * Math.PI) / sides
  const local = ((theta % seg) + seg) % seg
  return Math.cos(Math.PI / sides) / Math.cos(local - Math.PI / sides)
}

function shapePath(radius: (theta: number) => number, scale = 72) {
  const pts: string[] = []
  for (let i = 0; i < POINTS; i++) {
    const theta = (i / POINTS) * Math.PI * 2 - Math.PI / 2
    const r = radius(theta) * scale
    pts.push(`${(C + r * Math.cos(theta)).toFixed(2)},${(C + r * Math.sin(theta)).toFixed(2)}`)
  }
  return `M${pts.join("L")}Z`
}

const SHAPES = [
  shapePath(() => 1),
  shapePath((t) => polygonRadius(t + Math.PI / 4, 4) * 0.95),
  shapePath((t) => polygonRadius(t + Math.PI / 2, 3) * 1.15),
  shapePath((t) => polygonRadius(t, 6)),
  shapePath((t) => 0.62 + 0.38 * Math.abs(Math.cos((5 * (t + Math.PI / 2)) / 2)) ** 3),
  shapePath((t) => 0.78 + 0.22 * Math.sin(8 * t)),
]

const SHAPE_NAMES = ["circle", "square", "triangle", "hexagon", "star", "gear"]

const VIBES = [
  "Tokyo at 3am, neon rain",
  "Matrix green phosphor CRT",
  "Vaporwave sunset over a mall",
  "Deep sea bioluminescence",
  "Blade Runner orange haze",
  "Arctic aurora terminal",
]

function useCycle(length: number, ms: number, paused: boolean) {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms)
    return () => clearInterval(id)
  }, [length, ms, paused])
  return index
}

function MorphingShape() {
  const reduce = useReducedMotion() ?? false
  const index = useCycle(SHAPES.length, 2200, reduce)
  const transition = { duration: 1.1, ease: [0.7, 0, 0.3, 1] as const }

  return (
    <div className="relative h-40 w-40 sm:h-52 sm:w-52 shrink-0" aria-hidden>
      <motion.svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Chromatic-aberration layers: accent offset left, border offset right. */}
        <motion.path
          d={SHAPES[0]}
          animate={{ d: SHAPES[index], x: [-3, 1, -3] }}
          transition={{ d: transition, x: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } }}
          fill="none"
          stroke="rgb(var(--glitch-accent))"
          strokeWidth={2}
          opacity={0.7}
        />
        <motion.path
          d={SHAPES[0]}
          animate={{ d: SHAPES[index], x: [3, -1, 3] }}
          transition={{ d: transition, x: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } }}
          fill="none"
          stroke="rgb(var(--glitch-border))"
          strokeWidth={2}
          opacity={0.7}
        />
        <motion.path
          d={SHAPES[0]}
          animate={{ d: SHAPES[index] }}
          transition={transition}
          fill="rgb(var(--glitch-border) / 8%)"
          stroke="rgb(var(--glitch-primary))"
          strokeWidth={1.5}
          style={{ filter: "drop-shadow(0 0 8px rgb(var(--glitch-border) / 70%))" }}
        />
        {[0, 1, 2].map((ring) => (
          <circle
            key={ring}
            cx={C}
            cy={C}
            r={86 + ring * 6}
            fill="none"
            stroke="rgb(var(--glitch-border) / 25%)"
            strokeDasharray={`${2 + ring * 2} ${8 + ring * 4}`}
          />
        ))}
      </motion.svg>
      <motion.span
        key={SHAPE_NAMES[index]}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--glitch-primary)/50%)]"
      >
        shape::{SHAPE_NAMES[index]}
      </motion.span>
    </div>
  )
}

export function ThemeHero() {
  const reduce = useReducedMotion() ?? false
  const [prompt, setPrompt] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const vibeIndex = useCycle(VIBES.length, 2600, reduce || focused || prompt.length > 0)

  const run = (text: string) => openThemeGenerator(text.trim() || VIBES[vibeIndex])

  return (
    <Card className="p-0">
      {/* Moving grid backdrop. Card forces children to `relative`, so override with `absolute!`. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute! inset-0 z-0! opacity-40 [background-image:linear-gradient(rgb(var(--glitch-border)/12%)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--glitch-border)/12%)_1px,transparent_1px)] [background-size:24px_24px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "24px 24px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-8">
        <MorphingShape />

        <div className="flex-1 w-full space-y-4 font-mono">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[rgb(var(--glitch-accent))]">
              <Sparkles size={12} /> new · ai theme generator
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-wide text-[rgb(var(--glitch-primary))]">
              Don&apos;t like our themes? Generate your own.
            </h2>
            <p className="text-xs sm:text-sm text-[rgb(var(--glitch-primary)/70%)] max-w-xl">
              Describe a vibe. Watch every component on this page re-skin itself live, in dark and light. Keep it, or
              install it into your own project with one command.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              run(prompt)
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-xl"
          >
            <div className="relative flex-1 flex items-center gap-2 h-10 px-3 border border-[rgb(var(--glitch-border)/60%)] focus-within:border-[rgb(var(--glitch-border-hover))] bg-[rgb(var(--glitch-surface-hover)/60%)]">
              <span className="text-[rgb(var(--glitch-accent))]">&gt;</span>
              <input
                value={prompt}
                maxLength={300}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label="Describe your theme"
                className="peer flex-1 bg-transparent text-sm outline-none text-[rgb(var(--glitch-primary))]"
              />
              {!prompt && (
                <motion.span
                  key={vibeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute left-8 text-sm text-[rgb(var(--glitch-primary)/40%)] truncate max-w-[calc(100%-3rem)]"
                >
                  {VIBES[vibeIndex]}
                </motion.span>
              )}
            </div>
            <button
              type="submit"
              className="h-10 px-5 flex items-center justify-center gap-2 border border-[rgb(var(--glitch-border))] bg-[rgb(var(--glitch-border)/15%)] text-[rgb(var(--glitch-primary))] uppercase tracking-wider text-sm hover:bg-[rgb(var(--glitch-border)/25%)] hover:shadow-[0_0_16px_rgb(var(--glitch-border)/40%)] transition-all"
            >
              <Sparkles size={14} /> generate
            </button>
          </form>
          <Link
            href="/themes"
            className="inline-flex items-center gap-1 text-xs text-[rgb(var(--glitch-accent))] hover:underline"
          >
            or browse the themes corner &rarr;
          </Link>
        </div>
      </div>
    </Card>
  )
}
