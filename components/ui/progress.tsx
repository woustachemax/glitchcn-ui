"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-[var(--glitch-radius,0px)]",
        "bg-[rgb(var(--glitch-surface))] border border-[rgb(var(--glitch-border)/30%)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/10%)]",
        "clip-path-[polygon(0_2px,2px_0,calc(100%-2px)_0,100%_2px,100%_calc(100%-2px),calc(100%-2px)_100%,2px_100%,0_calc(100%-2px))]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all duration-300 ease-out",
          "bg-linear-to-r from-[rgb(var(--glitch-accent))] to-[rgb(var(--glitch-border-hover))]",
          "shadow-[0_0_8px_rgb(var(--glitch-accent)/40%)]",
          "relative",
          "after:absolute after:inset-0 after:bg-white/20 after:animate-pulse"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
