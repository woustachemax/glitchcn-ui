import * as React from "react"
import { Loader2Icon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-3",
        default: "size-4",
        lg: "size-6",
        xl: "size-8",
      },
      variant: {
        default: cn(
          "text-[rgb(var(--glitch-primary)/70%)]",
          "drop-shadow-[0_0_8px_rgb(var(--glitch-accent)/60%)]"
        ),
        destructive: cn(
          "text-[rgb(var(--glitch-destructive-border-hover)/70%)]",
          "drop-shadow-[0_0_8px_rgb(var(--glitch-destructive-glow)/60%)]"
        ),
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default"
    }
  }
)

function Spinner({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  )
}

function LoadingOverlay({
  className,
  children,
  size = "default",
  variant = "default",
  text,
  ...props
}: React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof spinnerVariants> & {
    text?: string
  }) {
  return (
    <div
      data-slot="loading-overlay"
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center gap-4",
        "bg-[rgb(var(--glitch-surface))]/95 backdrop-blur-sm",
        "border border-[rgb(var(--glitch-border)/30%)]",
        "[clip-path:var(--glitch-clip,polygon(0_var(--glitch-cut,8px),var(--glitch-cut,8px)_0,calc(100%-var(--glitch-cut,8px))_0,100%_var(--glitch-cut,8px),100%_calc(100%-var(--glitch-cut,8px)),calc(100%-var(--glitch-cut,8px))_100%,var(--glitch-cut,8px)_100%,0_calc(100%-var(--glitch-cut,8px))))] rounded-[var(--glitch-radius,0px)]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/5%)_50%,transparent_100%)]",
        "before:bg-size[100%_4px] before:pointer-events-none",
        className
      )}
      {...props}
    >
      <Spinner size={size} variant={variant} />
      {(text || children) && (
        <div className="font-mono text-sm tracking-wider uppercase text-[rgb(var(--glitch-primary)/90%)]">
          {text || children}
        </div>
      )}
    </div>
  )
}

export { Spinner, LoadingOverlay, spinnerVariants }