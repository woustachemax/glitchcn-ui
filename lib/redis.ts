import { Redis } from "@upstash/redis"

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

/** Shared Upstash client, or null when Redis isn't configured (e.g. a fresh clone). */
export const redis = url && token ? new Redis({ url, token }) : null
