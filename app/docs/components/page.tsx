"use client"

import Link from "next/link";
import { Terminal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const components = [
  "accordion", "alert", "badge", "button", "card", "command", "dialog",
  "input", "progress", "separator", "sheet", "sidebar",
  "skeleton", "table", "tabs", "tooltip"
];

export default function ComponentsListPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyInstall = (comp: string) => {
    navigator.clipboard.writeText(`npx shadcn@latest add @glitchcn/${comp}`);
    setCopied(comp);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div className="space-y-4">
        <h1 className="font-mono text-5xl font-bold text-emerald-300">Components</h1>
        <p className="font-mono text-xl text-emerald-300/70">
          Browse all available components. Click to view details or copy install command.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((comp) => (
          <Card key={comp} className="group hover:border-cyan-400/50 transition-colors">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  href={`/docs/components/${comp}`}
                  className="flex items-center gap-2 flex-1"
                >
                  <Terminal size={16} className="text-cyan-400" />
                  <span className="font-mono text-lg text-emerald-300 group-hover:text-emerald-200 capitalize">
                    {comp}
                  </span>
                </Link>
                <Button 
                  size="sm" 
                  onClick={() => copyInstall(comp)}
                  className="ml-2"
                >
                  {copied === comp ? <Check size={14} /> : <Copy size={14} />}
                </Button>
              </div>
              <div className="bg-black border border-emerald-500/30 rounded p-2">
                <code className="font-mono text-xs text-emerald-300/80">
                  npx shadcn@latest add @glitchcn/{comp}
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}