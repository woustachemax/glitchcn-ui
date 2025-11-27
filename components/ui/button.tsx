import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono tracking-[0.2em] uppercase text-lg font-bold transition-all duration-150 disabled:pointer-events-none disabled:opacity-25 [&_svg:not([class*='size-'])]:size-4 outline-none relative overflow-hidden group cursor-pointer",
  {
    variants: {
      variant: {
        default: `
          bg-[#001a1a] text-emerald-300 border border-emerald-500/70 clip-corners
          hover:bg-[#002626] hover:border-emerald-400 hover:text-emerald-200
          shadow-[inset_0_1px_0_0_rgba(6,182,212,0.25),0_0_0_1px_rgba(6,182,212,0.2)]
          hover:shadow-[inset_0_1px_0_0_rgba(6,182,212,0.4),0_0_16px_rgba(6,182,212,0.5),0_0_24px_rgba(6,182,212,0.3)]
          before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.25),transparent)]
          before:-translate-x-full hover:before:translate-x-full before:duration-500
          after:absolute after:inset-0 after:bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.1)_50%,transparent_100%)]
          after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
          hover: animate-glotch

          data-[theme=light]:bg-white
          data-[theme=light]:text-emerald-700
          data-[theme=light]:border-emerald-300
          data-[theme=light]:hover:bg-emerald-50
          data-[theme=light]:hover:border-emerald-400
          data-[theme=light]:hover:text-emerald-800
          data-[theme=light]:shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_0_1px_rgba(16,185,129,0.15)]
        `,
        destructive: `
          bg-[#1a0000] text-rose-300 border border-rose-500/70 clip-corners
          hover:bg-[#260000] hover:border-rose-400
          shadow-[inset_0_1px_0_0_rgba(239,68,68,0.25),0_0_0_1px_rgba(239,68,68,0.2)]
          hover:shadow-[inset_0_1px_0_0_rgba(239,68,68,0.4),0_0_16px_rgba(239,68,68,0.5),0_0_24px_rgba(239,68,68,0.3)]
          before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(239,68,68,0.25),transparent)]
          before:-translate-x-full hover:before:translate-x-full before:duration-500
          after:absolute after:inset-0 after:bg-[linear-gradient(0deg,transparent_0%,rgba(239,68,68,0.1)_50%,transparent_100%)]
          after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
          hover:animate-glitch

          data-[theme=light]:bg-rose-50
          data-[theme=light]:text-rose-700
          data-[theme=light]:border-rose-300
          data-[theme=light]:hover:bg-rose-100
          data-[theme=light]:hover:border-rose-400
          data-[theme=light]:shadow-[inset_0_1px_0_0_rgba(239,68,68,0.2),0_0_0_1px_rgba(239,68,68,0.15)]
        `,
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1.5 text-[10px]",
        lg: "h-12 px-8 py-3 text-sm",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)


function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Comp>
  )
}


export { Button, buttonVariants }

if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    .clip-corners {
      clip-path: polygon(
        0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
        100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
      );
    }
    
    @keyframes glitch {
      0%, 100% { 
        transform: translate(0);
      }
      20% { 
        transform: translate(-2px, 1px);
      }
      40% { 
        transform: translate(2px, -1px);
      }
      60% { 
        transform: translate(-1px, 2px);
      }
      80% { 
        transform: translate(1px, -2px);
      }
    }
    
    @keyframes scanline {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 100%;
      }
    }
    
    .animate-glitch {
      animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2;
    }
    
    button[data-slot="button"]:hover::before {
      animation: scanline 0.5s linear infinite;
    }
  `
  document.head.appendChild(style)
}