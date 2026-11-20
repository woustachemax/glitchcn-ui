import { redis } from "@/lib/redis"
import type { Palette, ThemeShape } from "@/lib/custom-theme"

// Themes corner: every generated theme, newest first, credited to an anon handle.
// Redis layout:
//   corner:theme:<id>  JSON CornerTheme (id is the same as its /r/theme/<id> install URL)
//   corner:recent      sorted set, score = createdAt (ms)

export type CornerTheme = {
  id: string
  name: string
  prompt: string
  dark: Palette
  light: Palette
  shape?: ThemeShape
  anon: string
  createdAt: number
}

export const CORNER_PAGE_SIZE = 24
// Keep the list bounded; older themes still install from their URL.
const MAX_CORNER_SIZE = 1000

const themeKey = (id: string) => `corner:theme:${id}`

export async function addToCorner(theme: CornerTheme) {
  if (!redis) return
  await redis
    .pipeline()
    .set(themeKey(theme.id), theme)
    .zadd("corner:recent", { score: theme.createdAt, member: theme.id })
    .zremrangebyrank("corner:recent", 0, -(MAX_CORNER_SIZE + 1))
    .exec()
}

export async function listCorner(offset: number, limit = CORNER_PAGE_SIZE) {
  if (!redis) return { themes: [] as CornerTheme[], nextOffset: null }
  const ids = await redis.zrange<string[]>("corner:recent", offset, offset + limit - 1, { rev: true })
  if (ids.length === 0) return { themes: [] as CornerTheme[], nextOffset: null }
  const themes = (await redis.mget<(CornerTheme | null)[]>(...ids.map(themeKey))).filter(
    (t): t is CornerTheme => t !== null
  )
  return { themes, nextOffset: ids.length === limit ? offset + limit : null }
}

const ADJECTIVES = ["neon", "static", "glitchy", "chrome", "phantom", "pixel", "rogue", "silent", "hex", "laser", "null", "binary"]
const NOUNS = ["otter", "raven", "fox", "moth", "byte", "wolf", "ghost", "lynx", "cipher", "koi", "drone", "kernel"]

/** A random anonymous handle like "anon_neon-otter_42". */
export function newAnonHandle() {
  const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]
  return `anon_${pick(ADJECTIVES)}-${pick(NOUNS)}_${Math.floor(Math.random() * 100)}`
}

export const ANON_COOKIE = "glitch_anon"
const ANON_PATTERN = /^anon_[a-z]+-[a-z]+_\d{1,2}$/

export function readAnonCookie(request: Request): string | null {
  const match = /(?:^|;\s*)glitch_anon=([^;]+)/.exec(request.headers.get("cookie") ?? "")
  const value = match ? decodeURIComponent(match[1]) : null
  return value && ANON_PATTERN.test(value) ? value : null
}
