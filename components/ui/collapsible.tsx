"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
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
        "[&[data-state=open]>svg]:rotate-180",
        "data-[theme=light]:hover:text-emerald-700",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <ChevronDown 
        className={cn(
          "size-4 shrink-0 transition-all duration-300 relative z-10",
          "text-emerald-400/70 group-hover/trigger:text-emerald-300",
          "group-hover/trigger:drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]",
          "data-[theme=light]:text-emerald-500 data-[theme=light]:group-hover/trigger:text-emerald-600"
        )}
      />
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden transition-all duration-300",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        "relative",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] before:bg-size[100%_4px] before:pointer-events-none"
      )}
      {...props}
    >
      <div className={cn(
        "px-6 pb-4 pt-0 font-mono text-sm relative z-10",
        "text-emerald-200/90 data-[theme=light]:text-emerald-200/90",
        className
      )}>
        {children}
      </div>
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }