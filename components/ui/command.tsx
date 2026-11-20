"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-[rgb(var(--glitch-surface))] text-[rgb(var(--glitch-primary))] flex h-full w-full flex-col overflow-hidden border border-[rgb(var(--glitch-border)/50%)] relative",
        "[clip-path:var(--glitch-clip,polygon(0_var(--glitch-cut,8px),var(--glitch-cut,8px)_0,calc(100%-var(--glitch-cut,8px))_0,100%_var(--glitch-cut,8px),100%_calc(100%-var(--glitch-cut,8px)),calc(100%-var(--glitch-cut,8px))_100%,var(--glitch-cut,8px)_100%,0_calc(100%-var(--glitch-cut,8px))))] rounded-[var(--glitch-radius,0px)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%)]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/3%)_50%,transparent_100%)] before:bg-size[100%_4px] before:pointer-events-none",
        "after:content-[''] after:absolute after:top-0 after:left-0 after:w-[calc(0.75rem+var(--glitch-radius,0px)/2)] after:h-[calc(0.75rem+var(--glitch-radius,0px)/2)] after:rounded-tl-[var(--glitch-radius,0px)] after:border-l-2 after:border-t-2 after:border-[rgb(var(--glitch-accent)/60%)] after:transition-all after:duration-300 after:pointer-events-none after:z-50",
        "hover:after:w-4 hover:after:h-4 hover:after:border-[rgb(var(--glitch-accent))]",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn("overflow-hidden p-0", className)}>
        <Command className="**:[[cmdk-group-heading]]:text-[rgb(var(--glitch-primary)/70%)] **:data-[slot=command-input-wrapper]:h-12 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group]]:px-2 **:[[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-input-wrapper]_svg]:h-5 **:[[cmdk-input-wrapper]_svg]:w-5 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3 **:[[cmdk-item]_svg]:h-5 **:[[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b border-[rgb(var(--glitch-border)/30%)] px-3 relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-accent)/50%),transparent)]"
    >
      <SearchIcon className="size-4 shrink-0 text-[rgb(var(--glitch-accent))]" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-[rgb(var(--glitch-primary)/50%)] flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 font-mono tracking-wide text-[rgb(var(--glitch-primary))]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm font-mono text-[rgb(var(--glitch-primary)/70%)]"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-[rgb(var(--glitch-primary))] **:[[cmdk-group-heading]]:text-[rgb(var(--glitch-primary)/70%)] overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("border-[rgb(var(--glitch-border)/30%)] -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-[rgb(var(--glitch-surface-hover))] data-[selected=true]:text-[rgb(var(--glitch-primary))] data-[selected=true]:border data-[selected=true]:border-[rgb(var(--glitch-border)/50%)] data-[selected=true]:shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_8px_rgb(var(--glitch-accent)/30%)]",
        "**:[svg:not([class*='text-'])]:text-[rgb(var(--glitch-accent))]",
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none font-mono",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "**:[svg]:pointer-events-none **:[svg]:shrink-0 **:[svg:not([class*='size-'])]:size-4",
        "transition-all duration-150",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-[rgb(var(--glitch-accent)/70%)] ml-auto text-[10px] tracking-widest font-mono font-bold uppercase",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}