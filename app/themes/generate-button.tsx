"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { openThemeGenerator } from "@/components/theme-generator"

export function GenerateButton() {
  return (
    <Button size="sm" onClick={() => openThemeGenerator()}>
      <Sparkles size={14} className="mr-1" /> Make one
    </Button>
  )
}
