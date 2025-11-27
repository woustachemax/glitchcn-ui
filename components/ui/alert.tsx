import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full clip-corners border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current overflow-hidden transition-all duration-300 font-mono",
  {
    variants: {
      variant: {
        default: `
          bg-[#001a1a] text-emerald-300 border-emerald-500/50
          shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15)]
          hover:border-emerald-400/70 hover:shadow-[inset_0_1px_0_0_rgba(6,182,212,0.3),0_0_8px_rgba(6,182,212,0.3)]
          before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] before:bg-[length:100%_4px] before:animate-scanline before:pointer-events-none
          
          data-[theme=light]:bg-[#001a1a] data-[theme=light]:text-emerald-300 data-[theme=light]:border-emerald-500/50
          data-[theme=light]:shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15)]
        `,
        destructive: `
          bg-[#1a0000] text-rose-300 border-rose-500/50
          shadow-[inset_0_1px_0_0_rgba(239,68,68,0.2),0_0_0_1px_rgba(239,68,68,0.15)]
          hover:border-rose-400/70 hover:shadow-[inset_0_1px_0_0_rgba(239,68,68,0.3),0_0_8px_rgba(239,68,68,0.3)]
          before:absolute before:inset-0 before:bg-[linear-gradient(0deg,transparent_0%,rgba(239,68,68,0.03)_50%,transparent_100%)] before:bg-[length:100%_4px] before:animate-scanline before:pointer-events-none
          [&>svg]:text-rose-400
          *:data-[slot=alert-description]:text-rose-300/90
          
          data-[theme=light]:bg-[#1a0000] data-[theme=light]:text-rose-300 data-[theme=light]:border-rose-500/50
          data-[theme=light]:shadow-[inset_0_1px_0_0_rgba(239,68,68,0.2),0_0_0_1px_rgba(239,68,68,0.15)]
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

if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    .clip-corners {
      clip-path: polygon(
        0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
        100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
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
    
    [data-slot="alert"] {
      position: relative;
    }
    
    [data-slot="alert"]::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      border-left: 2px solid rgba(6, 182, 212, 0.6);
      border-top: 2px solid rgba(6, 182, 212, 0.6);
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 10;
    }
    
    [data-slot="alert"][data-variant="destructive"]::after {
      border-color: rgba(239, 68, 68, 0.6);
    }
    
    [data-slot="alert"]:hover::after {
      width: 12px;
      height: 12px;
    }
    
    [data-slot="alert"] > * {
      position: relative;
      z-index: 1;
    }
  `
  document.head.appendChild(style)
}