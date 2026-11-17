"use client"

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, ExternalLink, Sparkles } from "lucide-react";

const SITE_URL = "https://glitchcn-ui.vercel.app";

type RegistryFile = { path: string; content?: string };
type RegistryItem = { dependencies?: string[]; registryDependencies?: string[]; files?: RegistryFile[] };

type CopyForAIProps = {
  name: string;
  title: string;
  description: string;
  usage: string;
};

function buildBasePrompt({ name, title, description, usage }: CopyForAIProps) {
  return [
    `I want to add the "${title}" component from glitchcn/ui (a cyberpunk, glitch-styled shadcn/ui registry) to my React + Tailwind CSS project.`,
    "",
    `Description: ${description}`,
    `Docs: ${SITE_URL}/docs/components/${name}`,
    `Registry JSON (full source): ${SITE_URL}/r/${name}.json`,
    "",
    "Install with the shadcn CLI:",
    `npx shadcn@latest add ${SITE_URL}/r/${name}.json`,
    "",
    "Usage:",
    "```tsx",
    usage,
    "```",
  ].join("\n");
}

function buildFullPrompt(props: CopyForAIProps, registry: RegistryItem | null) {
  const base = buildBasePrompt(props);
  if (!registry?.files?.length) {
    return `${base}\n\nPlease fetch the registry JSON above for the full source, then help me integrate this component into my project.`;
  }
  const deps = registry.dependencies?.length ? `\n\nnpm dependencies: ${registry.dependencies.join(", ")}` : "";
  const regDeps = registry.registryDependencies?.length
    ? `\nRegistry dependencies: ${registry.registryDependencies.join(", ")}`
    : "";
  const files = registry.files
    .filter((f) => f.content)
    .map((f) => `File: ${f.path}\n\`\`\`tsx\n${f.content}\n\`\`\``)
    .join("\n\n");
  return `${base}${deps}${regDeps}\n\nSource:\n\n${files}\n\nHelp me integrate this component into my project, keeping the glitch styling intact.`;
}

function buildLinkPrompt(props: CopyForAIProps) {
  return `${buildBasePrompt(props)}\n\nRead the registry JSON for the full source, then help me integrate this component into my project, keeping the glitch styling intact.`;
}

export function CopyForAI(props: CopyForAIProps) {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [registry, setRegistry] = useState<RegistryItem | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch(`/r/${name}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) setRegistry(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [name]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildFullPrompt(props, registry));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    setOpen(false);
  };

  const linkPrompt = encodeURIComponent(buildLinkPrompt(props));
  const registryUrl = encodeURIComponent(`${SITE_URL}/r/${name}.json`);

  const links = [
    { label: "Open in v0", href: `https://v0.dev/chat/api/open?url=${registryUrl}` },
    { label: "Open in ChatGPT", href: `https://chatgpt.com/?q=${linkPrompt}` },
    { label: "Open in Claude", href: `https://claude.ai/new?q=${linkPrompt}` },
  ];

  const itemClass =
    "flex w-full items-center gap-2 px-3 py-2 text-left text-xs sm:text-sm font-mono text-[rgb(var(--glitch-primary))] hover:bg-[rgb(var(--glitch-border)/15%)] focus:bg-[rgb(var(--glitch-border)/15%)] focus:outline-none transition-colors";

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Copy for AI"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[rgb(var(--glitch-border)/10%)] hover:bg-[rgb(var(--glitch-border)/20%)] border border-[rgb(var(--glitch-border)/30%)] text-xs sm:text-sm font-mono text-[rgb(var(--glitch-primary))] transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[rgb(var(--glitch-border-hover))]" />
        ) : (
          <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--glitch-border-hover))]" />
        )}
        {copied ? "Copied" : "Copy for AI"}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 sm:left-0 sm:right-auto z-50 mt-2 w-52 overflow-hidden rounded border border-[rgb(var(--glitch-border)/40%)] bg-[rgb(var(--glitch-surface))] shadow-[0_0_16px_rgb(var(--glitch-accent)/15%)]"
        >
          <button type="button" role="menuitem" onClick={copyPrompt} className={itemClass}>
            <Copy className="h-3.5 w-3.5 shrink-0 text-[rgb(var(--glitch-border-hover))]" />
            Copy prompt
          </button>
          {links.map((link) => (
            <a
              key={link.label}
              role="menuitem"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[rgb(var(--glitch-border-hover))]" />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
