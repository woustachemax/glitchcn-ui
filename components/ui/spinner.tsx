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
          "text-emerald-400/70",
          "drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]",
          "data-[theme=light]:text-emerald-500"
        ),
        destructive: cn(
          "text-rose-400/70",
          "drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",
          "data-[theme=light]:text-rose-500"
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
        "bg-[#001a1a]/95 backdrop-blur-sm",
        "data-[theme=light]:bg-white/95",
        "border border-emerald-500/30",
        "[clip-path:polygon(0_8px,8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px))]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)]",
        "before:bg-size[100%_4px] before:pointer-events-none",
        className
      )}
      {...props}
    >
      <Spinner size={size} variant={variant} />
      {(text || children) && (
        <div className="font-mono text-sm tracking-wider uppercase text-emerald-300/90 data-[theme=light]:text-emerald-700">
          {text || children}
        </div>
      )}
    </div>
  )
}

export { Spinner, LoadingOverlay, spinnerVariants }