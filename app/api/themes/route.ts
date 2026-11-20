import { CORNER_PAGE_SIZE, listCorner } from "@/lib/corner"

export const dynamic = "force-dynamic"

// GET /api/themes?offset=0&limit=24 — the themes corner, newest first.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const offset = Math.max(0, Math.min(10_000, Number(searchParams.get("offset")) || 0))
  const limit = Math.max(1, Math.min(CORNER_PAGE_SIZE, Number(searchParams.get("limit")) || CORNER_PAGE_SIZE))
  try {
    return Response.json(await listCorner(offset, limit))
  } catch (error) {
    console.error("themes: list failed", error)
    return Response.json({ error: "Couldn't load themes." }, { status: 500 })
  }
}
