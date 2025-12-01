"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

export default function GettingStarted() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const componentsJson = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@glitchcn": "https://glitchcn-ui.vercel.app/r/{name}.json"
  }
}
`;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-5xl font-bold font-mono text-emerald-300 mb-2">
          Getting Started
        </h1>
        <p className="text-xl text-emerald-300/70 font-mono">
          Hollywood's idea of what a hacker's screen looks like
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What is GlitchCN?</CardTitle>
          <CardDescription>
            A terminal-styled cyberpunk component library for Next.js with scanline effects, 
            glowing borders, and monospace typography.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-emerald-300/70">
            GlitchCN provides drop-in React components with a distinctive retro-futuristic aesthetic. 
            All components feature:
          </p>
          <ul className="space-y-2 text-emerald-300/70 list-disc list-inside">
            <li>Animated scanline effects</li>
            <li>Glowing cyan/emerald borders</li>
            <li>Monospace typography</li>
            <li>Dark teal backgrounds (#001a1a)</li>
            <li>Clipped corner styling</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prerequisites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-emerald-300/70">
            Before installing components, make sure you have:
          </p>
          <ul className="space-y-2 text-emerald-300/70 list-disc list-inside">
            <li>Next.js 14+ project with App Router</li>
            <li>Tailwind CSS configured</li>
            <li>TypeScript (recommended)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 1: Create components.json</CardTitle>
          <CardDescription>
            Create this file in your project root
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <button
              onClick={() => copy(componentsJson, "components-json")}
              className="absolute top-2 right-2 p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
            >
              {copied === "components-json" ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4 text-emerald-400" />
              )}
            </button>
            <pre className="bg-black/60 p-4 pr-14 rounded border border-emerald-500/20 overflow-x-auto">
              <code className="text-emerald-300 font-mono text-sm">
                {componentsJson}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 2: Install Components</CardTitle>
          <CardDescription>
            Use shadcn CLI with the @glitchcn registry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-emerald-300/70 mb-3 font-bold">Install all components:</p>
            <div className="relative">
              <button
                onClick={() => copy("npx shadcn@latest add @glitchcn/all", "install-all")}
                className="absolute top-2 right-2 p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
              >
                {copied === "install-all" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-emerald-400" />
                )}
              </button>
              <pre className="bg-black/60 p-4 pr-14 rounded border border-emerald-500/20">
                <code className="text-emerald-300 font-mono text-sm">
                  npx shadcn@latest add @glitchcn/all
                </code>
              </pre>
            </div>
          </div>

          <div>
            <p className="text-emerald-300/70 mb-3 font-bold">Or install individual components:</p>
            <div className="relative">
              <button
                onClick={() => copy("npx shadcn@latest add @glitchcn/button @glitchcn/card", "install-individual")}
                className="absolute top-2 right-2 p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
              >
                {copied === "install-individual" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-emerald-400" />
                )}
              </button>
              <pre className="bg-black/60 p-4 pr-14 rounded border border-emerald-500/20">
                <code className="text-emerald-300 font-mono text-sm">
                  npx shadcn@latest add @glitchcn/button @glitchcn/card
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 3: Use Components</CardTitle>
          <CardDescription>
            Import and use in your app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <button
              onClick={() => copy('import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return <Button>Click me</Button>\n}', "usage-code")}
              className="absolute top-2 right-2 p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
            >
              {copied === "usage-code" ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4 text-emerald-400" />
              )}
            </button>
            <pre className="bg-black/60 p-4 pr-14 rounded border border-emerald-500/20">
              <code className="text-emerald-300 font-mono text-sm whitespace-pre">
{`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Terminal className="inline-block mr-2 h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-emerald-300/70">
            Browse all available components in the sidebar or visit the{" "}
            <a href="/docs/components" className="text-cyan-400 hover:text-cyan-300 underline">
              Components
            </a>{" "}
            page.
          </p>
          <p className="text-emerald-300/70">
            Each component page includes live previews, installation commands, and usage examples.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}