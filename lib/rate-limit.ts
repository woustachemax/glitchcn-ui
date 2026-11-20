import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"

// Per-visitor (IP) and site-wide caps on AI theme generations. The global cap
// bounds daily API spend even if someone rotates IPs.
export const PER_VISITOR_DAILY_LIMIT = Number(process.env.THEME_GEN_PER_IP_DAILY ?? 5)
export const GLOBAL_DAILY_LIMIT = Number(process.env.THEME_GEN_GLOBAL_DAILY ?? 300)

export type LimitResult = { ok: true; remaining: number } | { ok: false; scope: "visitor" | "global"; reset: number }

type Limiter = { limit: (id: string) => Promise<{ success: boolean; remaining: number; reset: number }> }

function memoryLimiter(max: number, windowMs: number): Limiter {
  // Fallback for local dev or before Redis is connected. Only counts per
  // server instance, so it is not a real limit in production.
  const hits = new Map<string, { count: number; reset: number }>()
  return {
    async limit(id) {
      const now = Date.now()
      let entry = hits.get(id)
      if (!entry || entry.reset <= now) {
        entry = { count: 0, reset: now + windowMs }
        hits.set(id, entry)
      }
      entry.count++
      return { success: entry.count <= max, remaining: Math.max(0, max - entry.count), reset: entry.reset }
    },
  }
}

const DAY_MS = 24 * 60 * 60 * 1000

let visitorLimiter: Limiter
let globalLimiter: Limiter

if (redis) {
  visitorLimiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(PER_VISITOR_DAILY_LIMIT, "1 d"), prefix: "theme-gen:ip" })
  globalLimiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(GLOBAL_DAILY_LIMIT, "1 d"), prefix: "theme-gen:global" })
} else {
  if (process.env.NODE_ENV === "production") {
    console.warn("rate-limit: no Redis configured, falling back to per-instance in-memory limits")
  }
  visitorLimiter = memoryLimiter(PER_VISITOR_DAILY_LIMIT, DAY_MS)
  globalLimiter = memoryLimiter(GLOBAL_DAILY_LIMIT, DAY_MS)
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export async function checkThemeGenLimit(ip: string): Promise<LimitResult> {
  const perVisitor = await visitorLimiter.limit(ip)
  if (!perVisitor.success) return { ok: false, scope: "visitor", reset: perVisitor.reset }
  const global = await globalLimiter.limit("all")
  if (!global.success) return { ok: false, scope: "global", reset: global.reset }
  return { ok: true, remaining: perVisitor.remaining }
}
