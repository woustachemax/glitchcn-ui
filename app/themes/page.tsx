import type { Metadata } from "next"
import Link from "next/link"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ThemesCorner } from "@/components/themes-corner"
import { GenerateButton } from "./generate-button"

export const metadata: Metadata = {
  title: "Themes Corner",
  description:
    "AI-generated Glitchcn/ui themes from anonymous visitors. Try any of them on live and install one with a single command.",
  alternates: { canonical: "/themes" },
}

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--glitch-surface))] p-2 sm:p-3">
      <div className="relative max-w-[1800px] mx-auto space-y-3">
        <header className="flex items-center justify-between p-2 sm:p-3 border-b border-[rgb(var(--glitch-border)/30%)]">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="text-[rgb(var(--glitch-accent))]" size={20} />
            <span className="font-mono text-lg sm:text-2xl font-bold tracking-wider text-[rgb(var(--glitch-primary))]">
              Glitchcn/ui
            </span>
            <span className="font-mono text-xs text-[rgb(var(--glitch-accent))] ml-1 hidden sm:inline">/themes</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/docs">Docs</Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1 font-mono">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-bold tracking-wide text-[rgb(var(--glitch-primary))]">Themes Corner</h1>
            <p className="text-xs sm:text-sm text-[rgb(var(--glitch-primary)/70%)]">
              Every theme people have generated, credited to an anonymous handle. Try one on or install it.
            </p>
          </div>
          <GenerateButton />
        </div>

        <ThemesCorner />
      </div>
    </div>
  )
}
