import { Redis } from "@upstash/redis"
import type { CustomTheme } from "@/lib/custom-theme"

// Generated themes are saved so each one gets a permanent shadcn install URL.
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
const redis = url && token ? new Redis({ url, token }) : null

const ID_PATTERN = /^[a-z0-9]{12}$/

export type StoredTheme = Omit<CustomTheme, "id">

export async function saveTheme(theme: StoredTheme): Promise<string | null> {
  if (!redis) return null
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12)
  try {
    await redis.set(`theme:${id}`, theme)
    return id
  } catch (error) {
    console.error("theme-store: save failed", error)
    return null
  }
}

export async function getTheme(id: string): Promise<StoredTheme | null> {
  if (!redis || !ID_PATTERN.test(id)) return null
  try {
    return await redis.get<StoredTheme>(`theme:${id}`)
  } catch (error) {
    console.error("theme-store: read failed", error)
    return null
  }
}
