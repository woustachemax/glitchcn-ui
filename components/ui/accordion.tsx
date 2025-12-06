"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b border-emerald-500/30 last:border-b-0",
        "relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,transparent,rgba(6,182,212,0.5),transparent)]",
        "data-[theme=light]:border-emerald-500/30",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 px-6 text-left font-mono tracking-wider uppercase text-sm font-bold",
          "text-emerald-300 data-[theme=light]:text-emerald-300",
          "transition-all duration-300 outline-none group/trigger",
          "hover:text-emerald-200 hover:[text-shadow:0_0_8px_rgba(6,182,212,0.6)]",
          "focus-visible:text-emerald-200 focus-visible:[text-shadow:0_0_8px_rgba(6,182,212,0.6)]",
          "disabled:pointer-events-none disabled:opacity-25",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.1),transparent)]",
          "before:-translate-x-full hover:before:translate-x-full before:duration-500 before:pointer-events-none",
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
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
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
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }