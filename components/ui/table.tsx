"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto",
        "bg-[rgb(var(--glitch-surface))] text-[rgb(var(--glitch-primary))] border border-[rgb(var(--glitch-border)/50%)] clip-corners-table overflow-hidden group rounded-[var(--glitch-radius,0px)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%),0_4px_24px_rgba(0,0,0,0.4)]",
        "hover:border-[rgb(var(--glitch-border-hover)/70%)] hover:shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/30%),0_0_16px_rgb(var(--glitch-accent)/30%),0_0_32px_rgb(var(--glitch-accent)/15%)]",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/3%)_50%,transparent_100%)] before:bg-size[100%_4px] before:animate-scanline before:pointer-events-none before:z-0"
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm font-mono relative z-10", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b [&_tr]:border-[rgb(var(--glitch-border)/30%)]",
        "relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-accent)/50%),transparent)]",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-[rgb(var(--glitch-border)/30%)] font-medium [&>tr]:last:border-b-0",
        "relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-accent)/50%),transparent)]",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-[rgb(var(--glitch-border)/30%)] transition-all duration-300",
        "hover:bg-[rgb(var(--glitch-surface-hover))] hover:shadow-[inset_0_0_16px_rgb(var(--glitch-accent)/15%)]",
        "data-[state=selected]:bg-[rgb(var(--glitch-surface-hover))] data-[state=selected]:border-[rgb(var(--glitch-border-hover)/50%)] data-[state=selected]:shadow-[inset_0_0_16px_rgb(var(--glitch-accent)/20%)]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-4 text-left align-middle font-bold uppercase tracking-wider whitespace-nowrap",
        "text-[rgb(var(--glitch-primary))] text-xs",
        "group-hover:text-shadow-glow transition-all duration-300",
        "[&:has([role=checkbox])]:pr-0 :[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle whitespace-nowrap",
        "text-[rgb(var(--glitch-primary)/90%)]",
        "[&:has([role=checkbox])]:pr-0 :[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-4 text-sm font-mono tracking-wide",
        "text-[rgb(var(--glitch-primary)/70%)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

