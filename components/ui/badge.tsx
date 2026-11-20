import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 font-mono tracking-[0.15em] uppercase text-[10px] font-bold transition-all duration-200 [clip-path:var(--glitch-clip,polygon(0_calc(var(--glitch-cut,8px)/2),calc(var(--glitch-cut,8px)/2)_0,calc(100%-var(--glitch-cut,8px)/2)_0,100%_calc(var(--glitch-cut,8px)/2),100%_calc(100%-var(--glitch-cut,8px)/2),calc(100%-var(--glitch-cut,8px)/2)_100%,calc(var(--glitch-cut,8px)/2)_100%,0_calc(100%-var(--glitch-cut,8px)/2)))] rounded-[var(--glitch-radius,0px)] relative overflow-hidden cursor-default w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: `
          bg-[rgb(var(--glitch-surface))] text-[rgb(var(--glitch-primary))] border border-[rgb(var(--glitch-border)/70%)] px-2.5 py-1
          shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%)]
          hover:border-[rgb(var(--glitch-border-hover))] hover:text-[rgb(var(--glitch-primary))]
          hover:shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/30%),0_0_8px_rgb(var(--glitch-accent)/40%)]
          before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-accent)/15%),transparent)]
          before:-translate-x-full hover:before:translate-x-full before:duration-300
        `,
        destructive: `
          bg-[rgb(var(--glitch-destructive-surface))] text-[rgb(var(--glitch-destructive))] border border-[rgb(var(--glitch-destructive-border)/70%)] px-2.5 py-1
          shadow-[inset_0_1px_0_0_rgb(var(--glitch-destructive-glow)/20%),0_0_0_1px_rgb(var(--glitch-destructive-glow)/15%)]
          hover:border-[rgb(var(--glitch-destructive-border-hover))]
          hover:shadow-[inset_0_1px_0_0_rgb(var(--glitch-destructive-glow)/30%),0_0_8px_rgb(var(--glitch-destructive-glow)/40%)]
          before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-destructive-glow)/15%),transparent)]
          before:-translate-x-full hover:before:translate-x-full before:duration-300
        `
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }