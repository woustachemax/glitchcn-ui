import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full [clip-path:var(--glitch-clip,polygon(0_var(--glitch-cut,8px),var(--glitch-cut,8px)_0,calc(100%-var(--glitch-cut,8px))_0,100%_var(--glitch-cut,8px),100%_calc(100%-var(--glitch-cut,8px)),calc(100%-var(--glitch-cut,8px))_100%,var(--glitch-cut,8px)_100%,0_calc(100%-var(--glitch-cut,8px))))] rounded-[var(--glitch-radius,0px)] border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current overflow-hidden transition-all duration-300 font-mono after:content-[''] after:absolute after:top-0 after:left-0 after:w-2 after:h-2 after:border-l-2 after:border-t-2 after:border-[rgb(var(--glitch-accent)/60%)] after:transition-all after:duration-300 after:pointer-events-none after:z-10 hover:after:w-3 hover:after:h-3 [&>*]:relative [&>*]:z-[1]",
  {
    variants: {
      variant: {
        default: `
          bg-[rgb(var(--glitch-surface))] text-[rgb(var(--glitch-primary))] border-[rgb(var(--glitch-border)/50%)]
          shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/20%),0_0_0_1px_rgb(var(--glitch-accent)/15%)]
          hover:border-[rgb(var(--glitch-border-hover)/70%)] hover:shadow-[inset_0_1px_0_0_rgb(var(--glitch-accent)/30%),0_0_8px_rgb(var(--glitch-accent)/30%)]
          before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/3%)_50%,transparent_100%)] before:bg-[length:100%_4px] before:[animation:scanline_8s_linear_infinite] before:pointer-events-none
        `,
        destructive: `
          bg-[rgb(var(--glitch-destructive-surface))] text-[rgb(var(--glitch-destructive))] border-[rgb(var(--glitch-destructive-border)/50%)]
          shadow-[inset_0_1px_0_0_rgb(var(--glitch-destructive-glow)/20%),0_0_0_1px_rgb(var(--glitch-destructive-glow)/15%)]
          hover:border-[rgb(var(--glitch-destructive-border-hover)/70%)] hover:shadow-[inset_0_1px_0_0_rgb(var(--glitch-destructive-glow)/30%),0_0_8px_rgb(var(--glitch-destructive-glow)/30%)]
          before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-destructive-glow)/3%)_50%,transparent_100%)] before:bg-[length:100%_4px] before:[animation:scanline_8s_linear_infinite] before:pointer-events-none
          [&>svg]:text-[rgb(var(--glitch-destructive-border-hover))]
          *:data-[slot=alert-description]:text-[rgb(var(--glitch-destructive)/90%)]
          after:!border-[rgb(var(--glitch-destructive-border-hover)/60%)]
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-bold tracking-wider uppercase text-xs",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-xs tracking-wide [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }