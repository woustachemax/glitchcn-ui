import { getTheme } from "@/lib/theme-store"
import { themeRegistryItem } from "@/lib/custom-theme"

// `npx shadcn add https://<site>/r/theme/<id>` installs a generated theme.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const theme = await getTheme(id.replace(/\.json$/, ""))
  if (!theme) {
    return Response.json({ error: "theme not found" }, { status: 404 })
  }
  return Response.json(themeRegistryItem(theme), {
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  })
}
