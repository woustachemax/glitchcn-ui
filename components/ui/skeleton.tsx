import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-[#002626] border border-emerald-500/30",
        "shadow-[inset_0_1px_0_0_rgba(6,182,212,0.1)]",
        "dark:bg-[#002626] dark:border-emerald-500/30",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }