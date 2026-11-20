"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 p-6",
        "sm:rounded-lg border",

        "bg-[rgb(var(--glitch-surface))] text-[rgb(var(--glitch-primary))] border-[rgb(var(--glitch-border)/50%)]",
        "shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%),0_8px_32px_rgba(0,0,0,0.6)]",
        "[clip-path:var(--glitch-clip,polygon(0_var(--glitch-cut,8px),var(--glitch-cut,8px)_0,calc(100%-var(--glitch-cut,8px))_0,100%_var(--glitch-cut,8px),100%_calc(100%-var(--glitch-cut,8px)),calc(100%-var(--glitch-cut,8px))_100%,var(--glitch-cut,8px)_100%,0_calc(100%-var(--glitch-cut,8px))))] rounded-[var(--glitch-radius,0px)]",

        "duration-200 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0",

        className
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className={cn(
          "absolute right-4 top-4 p-1",
          "text-[rgb(var(--glitch-border-hover))] hover:text-[rgb(var(--glitch-primary))]",
          "[clip-path:var(--glitch-clip,polygon(0_calc(var(--glitch-cut,8px)*0.375),calc(var(--glitch-cut,8px)*0.375)_0,calc(100%-var(--glitch-cut,8px)*0.375)_0,100%_calc(var(--glitch-cut,8px)*0.375),100%_calc(100%-var(--glitch-cut,8px)*0.375),calc(100%-var(--glitch-cut,8px)*0.375)_100%,calc(var(--glitch-cut,8px)*0.375)_100%,0_calc(100%-var(--glitch-cut,8px)*0.375)))] rounded-[var(--glitch-radius,0px)]",
          "hover:bg-[rgb(var(--glitch-border)/10%)]",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--glitch-border-hover))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--glitch-surface))]"
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none font-mono uppercase tracking-wider text-[rgb(var(--glitch-primary))]",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[rgb(var(--glitch-primary)/70%)] font-mono", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
