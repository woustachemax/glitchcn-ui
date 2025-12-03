"use client"

import { use } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal, Info, Copy, Check, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogClose, DialogHeader, DialogTitle, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Sheet, SheetHeader, SheetDescription, SheetFooter, SheetTrigger, SheetTitle, SheetContent, SheetClose } from "@/components/ui/sheet";
const docs: Record<string, { 
  title: string; 
  description: string; 
  preview: React.ReactNode;
  code: string;
  dependencies?: string[];
}> = {
  alert: {
    title: "Alert",
    description: "Display important messages and notifications",
    preview: (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>System Alert</AlertTitle>
        <AlertDescription>
          Connection established. All systems operational.
        </AlertDescription>
      </Alert>
    ),
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>System Alert</AlertTitle>
  <AlertDescription>
    Connection established.
  </AlertDescription>
</Alert>`,
  },
  badge: {
    title: "Badge",
    description: "Display status indicators and labels",
    preview: (
      <div className="flex gap-2 flex-wrap items-center">
        <Badge className="h-8">Default</Badge>
        <Badge variant="destructive" className="h-8">Destructive</Badge>
      </div>
    ),
    code: `import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="destructive">Destructive</Badge>`,
  },
  button: {
    title: "Button",
    description: "Clickable button component with multiple variants",
    preview: (
      <div className="flex gap-4 flex-wrap">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="destructive">Destructive</Button>`,
  },
  card: {
    title: "Card",
    description: "Container for grouping related content",
    preview: (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>All systems operational</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-300/70">Connection: Active</p>
        </CardContent>
      </Card>
    ),
    code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>System Status</CardTitle>
    <CardDescription>All systems operational</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Connection: Active</p>
  </CardContent>
</Card>`,
  },
  command: {
    title: "Command",
    description: "Command palette for keyboard navigation",
    preview: (
      <div className="text-emerald-300/70 text-sm font-mono">
        Press Cmd+K to open command palette
      </div>
    ),
    code: `import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandItem>Search</CommandItem>
    <CommandItem>Settings</CommandItem>
  </CommandList>
</Command>`,
    dependencies: ["dialog"],
  },
  dialog: {
    title: "Dialog",
    description: "Modal dialog component",
   preview: (
    <Dialog>
    <DialogTrigger asChild>
      <Button size="sm">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Test Dialog</DialogTitle>
        <DialogDescription>
          This is a live preview inside the docs page.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
),

    code: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  input: {
    title: "Input",
    description: "Text input field",
    preview: (
      <div className="max-w-md space-y-4">
        <Input placeholder="Enter text..." />
        <Input type="email" placeholder="Email address" />
        <Input disabled placeholder="Disabled input" />
      </div>
    ),
    code: `import { Input } from "@/components/ui/input"

<Input placeholder="Enter text..." />
<Input type="email" placeholder="Email address" />
<Input disabled placeholder="Disabled" />`,
  },
  progress: {
    title: "Progress",
    description: "Progress indicator",
    preview: (
      <div className="max-w-md space-y-4">
        <Progress value={33} />
        <Progress value={66} />
        <Progress value={100} />
      </div>
    ),
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`,
  },
  separator: {
    title: "Separator",
    description: "Divider line component",
    preview: (
      <div className="space-y-4">
        <div>Section 1</div>
        <Separator />
        <div>Section 2</div>
      </div>
    ),
    code: `import { Separator } from "@/components/ui/separator"

<div>Section 1</div>
<Separator />
<div>Section 2</div>`,
  },
  sheet: {
    title: "Sheet",
    description: "Slide-over panel component",
    preview: (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">
            Open Sheet
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet panel</SheetTitle>
            <SheetDescription>
              This is the Glitchcn sheet. Put any content you want here.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 text-sm text-emerald-200 font-mono">
            Sheet content goes here. It slides over the page from the right.
          </div>
        </SheetContent>
      </Sheet>
    ),
    code: `import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="sm">
      Open Sheet
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
},
  sidebar: {
    title: "Sidebar",
    description: "Navigation sidebar component",
    preview: (
      <div className="text-emerald-300/70 text-sm font-mono">
        Collapsible sidebar navigation (see the sidebar on the left)
      </div>
    ),
    code: `import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      Your content here
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
  },
  skeleton: {
    title: "Skeleton",
    description: "Loading placeholder component",
    preview: (
      <div className="space-y-4 max-w-md">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-12 w-1/2" />
      </div>
    ),
    code: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-12 w-full" />
<Skeleton className="h-12 w-3/4" />`,
  },
  table: {
    title: "Table",
    description: "Data table component",
preview: (
  <div className="relative w-full h-80 flex items-center justify-center p-4">
    <div
      className="relative w-full h-full bg-[#001a1a] text-emerald-300 border border-emerald-500/50 clip-corners-table overflow-hidden group 
      shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15),0_4px_24px_rgba(0,0,0,0.4)]"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] 
        bg-position[100%_4px] animate-scanline pointer-events-none z-0"
      />

      <table className="w-full caption-bottom text-sm font-mono relative z-10">
        <thead className="[&_tr]:border-b [&_tr]:border-emerald-500/30">
          <tr>
            <th className="h-10 px-4 text-left align-middle font-bold uppercase tracking-wider text-xs group-hover:text-shadow-glow">
              ID
            </th>
            <th className="h-10 px-4 text-left align-middle font-bold uppercase tracking-wider text-xs">
              Status
            </th>
            <th className="h-10 px-4 text-left align-middle font-bold uppercase tracking-wider text-xs">
              Task
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          <tr className="border-b border-emerald-500/30 hover:bg-[#002626]">
            <td className="p-3 align-middle text-emerald-200/90">0x001A</td>
            <td className="p-3 align-middle text-red-400">
              <span className="text-shadow-glow-red">ERROR</span>
            </td>
            <td className="p-3 align-middle text-emerald-200/90">
              Initialize Subsystem
            </td>
          </tr>
          <tr
            className="border-b border-emerald-500/30 hover:bg-[#002626] data-[state=selected]:bg-[#002626]"
            data-state="selected"
          >
            <td className="p-3 align-middle text-emerald-200/90">0x002B</td>
            <td className="p-3 align-middle text-cyan-400/90 font-bold">
              RUNNING
            </td>
            <td className="p-3 align-middle text-emerald-200/90">
              Data Fetch Cycle
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
),    code: `import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

<Table>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  tabs: {
    title: "Tabs",
    description: "Tabbed content container",
   preview: (
  <div className="relative w-full h-32 flex items-start justify-center p-4">
    <div
      data-slot="tabs-list"
      className="inline-flex h-9 w-fit items-center justify-center p-[3px] gap-1
      bg-[#001a1a] border border-emerald-500/50 clip-corners-tabs relative overflow-hidden"
    >
      <div
        data-slot="tabs-trigger"
        className="inline-flex h-[calc(100%-1px)] items-center px-3 py-1 text-sm font-medium transition-all duration-300
        font-mono uppercase tracking-wider text-emerald-400/70 hover:text-emerald-300 hover:bg-[#002626]/50"
      >
        Tab One
      </div>
      <div
        data-slot="tabs-trigger"
        data-state="active"
        className="inline-flex h-[calc(100%-1px)] items-center px-3 py-1 text-sm font-medium transition-all duration-300
        font-mono uppercase tracking-wider text-emerald-300 bg-[#002626] border-emerald-500/50 clip-corners-trigger
        shadow-[inset_0_0_16px_rgba(6,182,212,0.15),0_0_8px_rgba(6,182,212,0.2)]"
      >
        Active
      </div>
      <div
        data-slot="tabs-trigger"
        data-state="active"
        className="inline-flex h-[calc(100%-1px)] items-center px-3 py-1 text-sm font-medium transition-all duration-300
        font-mono uppercase tracking-wider text-emerald-400/70 hover:text-emerald-300 hover:bg-[#002626]/50"
      >
        Info
      </div>
    </div>
  </div>
),
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
  },
  tooltip: {
    title: "Tooltip",
    description: "Contextual information on hover",
    preview: (
      <div className="text-emerald-300/70 text-sm font-mono">
        Tooltip on hover
      </div>
    ),
    code: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Tooltip text</p>
  </TooltipContent>
</Tooltip>`,
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-4 right-4 p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4 text-emerald-400" />
      )}
    </button>
  );
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const componentName = slug[0];
  const doc = docs[componentName];

  if (!doc) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-mono text-emerald-300 mb-2">
          {doc.title}
        </h1>
        <p className="text-emerald-300/70 font-mono">{doc.description}</p>
      </div>

      {doc.dependencies && doc.dependencies.length > 0 && (
        <Alert variant="default" className="border-amber-500/30 bg-amber-500/5">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertTitle className="text-amber-300">Additional Components Required</AlertTitle>
          <AlertDescription className="text-amber-300/70">
            This component will also install: {doc.dependencies.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {doc.preview}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <CopyButton text={`npx shadcn@latest add @glitchcn/${componentName}`} />
            <pre className="bg-black/60 p-4 pr-12 rounded border border-emerald-500/20">
              <code className="text-emerald-300 font-mono text-sm">
                npx shadcn@latest add @glitchcn/{componentName}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <CopyButton text={doc.code} />
            <pre className="bg-black/60 p-4 pr-12 rounded border border-emerald-500/20">
              <code className="text-emerald-300 font-mono text-sm whitespace-pre-wrap wrap-break-words">
                {doc.code}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}