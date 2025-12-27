"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        // Default cyberpunk styling
        "flex w-full items-center justify-between gap-4 py-4 px-6 text-left font-mono tracking-wider uppercase text-sm font-bold",
        "text-emerald-300 data-[theme=light]:text-emerald-300",
        "transition-all duration-300 outline-none group/trigger",
        "hover:text-emerald-200 hover:[text-shadow:0_0_8px_rgba(6,182,212,0.6)]",
        "focus-visible:text-emerald-200 focus-visible:[text-shadow:0_0_8px_rgba(6,182,212,0.6)]",
        "disabled:pointer-events-none disabled:opacity-25",
        "relative overflow-hidden",
        "border-b border-emerald-500/30 data-[theme=light]:border-emerald-500/30",
        "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.1),transparent)]",
        "before:-translate-x-full hover:before:translate-x-full before:duration-500 before:pointer-events-none",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(to_right,transparent,rgba(6,182,212,0.5),transparent)]",
        "data-[theme=light]:hover:text-emerald-700",
        // User's custom className can override everything
        className
      )}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        // Default collapse animation
        "overflow-hidden transition-all duration-300",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        // Default cyberpunk content styling
        "relative",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] before:bg-size[100%_4px] before:pointer-events-none",
        "px-6 pb-4 pt-0 font-mono text-sm",
        "text-emerald-200/90 data-[theme=light]:text-emerald-200/90",
        // User's custom className can override
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }