"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center p-[3px] gap-1",
        "bg-[rgb(var(--glitch-surface))] border border-[rgb(var(--glitch-border)/50%)] clip-corners-tabs relative overflow-hidden rounded-[var(--glitch-radius,0px)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%)]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/3%)_50%,transparent_100%)] before:bg-size[:100%_4px] before:animate-scanline before:pointer-events-none before:z-0",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-3 py-1 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-[calc(var(--glitch-radius,0px)*0.7)]",
        "font-mono uppercase tracking-wider",
        "text-[rgb(var(--glitch-primary)/70%)] border border-transparent",
        "hover:text-[rgb(var(--glitch-primary))] hover:bg-[rgb(var(--glitch-surface-hover))]/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--glitch-accent)/50%)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-[rgb(var(--glitch-surface-hover))] data-[state=active]:text-[rgb(var(--glitch-primary))] data-[state=active]:border-[rgb(var(--glitch-border)/50%)]",
        "data-[state=active]:shadow-[inset_0_0_16px_rgb(var(--glitch-accent)/15%),0_0_8px_rgb(var(--glitch-accent)/20%)]",
        "data-[state=active]:clip-corners-trigger",
        "relative z-10",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none",
        "font-mono text-[rgb(var(--glitch-primary)/90%)]",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }