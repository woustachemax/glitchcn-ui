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
        "bg-[#001a1a] border border-emerald-500/50 clip-corners-tabs relative overflow-hidden",
        "shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15)]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] before:bg-size[:100%_4px] before:animate-scanline before:pointer-events-none before:z-0",
        "data-[theme=light]:bg-[#001a1a] data-[theme=light]:border-emerald-500/50",
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
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-3 py-1 text-sm font-medium whitespace-nowrap transition-all duration-300",
        "font-mono uppercase tracking-wider",
        "text-emerald-400/70 border border-transparent",
        "hover:text-emerald-300 hover:bg-[#002626]/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-[#002626] data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-500/50",
        "data-[state=active]:shadow-[inset_0_0_16px_rgba(6,182,212,0.15),0_0_8px_rgba(6,182,212,0.2)]",
        "data-[state=active]:clip-corners-trigger",
        "relative z-10",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[theme=light]:text-emerald-400/70 data-[theme=light]:data-[state=active]:text-emerald-300",
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
        "font-mono text-emerald-200/90",
        "data-[theme=light]:text-emerald-200/90",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    .clip-corners-tabs {
      clip-path: polygon(
        0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px,
        100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px)
      );
    }
    
    .clip-corners-trigger {
      clip-path: polygon(
        0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px,
        100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px)
      );
    }
    
    @keyframes scanline {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 200%;
      }
    }
    
    .animate-scanline {
      animation: scanline 8s linear infinite;
    }
    
    [data-slot="tabs-list"] {
      position: relative;
    }
    
    [data-slot="tabs-list"]::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      border-left: 2px solid rgba(6, 182, 212, 0.6);
      border-top: 2px solid rgba(6, 182, 212, 0.6);
      transition: all 0.3s ease;
      z-index: 20;
    }
    
    [data-slot="tabs-list"]:hover::after {
      width: 10px;
      height: 10px;
      border-color: rgba(34, 211, 238, 1);
    }
  `
  document.head.appendChild(style)
}