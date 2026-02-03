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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Spinner, LoadingOverlay } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";


const docs: Record<string, { 
  title: string; 
  description: string; 
  preview: React.ReactNode;
  code: string;
  dependencies?: string[];
}> = {
  accordion: {
  title: "Accordion",
  description: "Collapsible content sections for organizing information",
  preview: (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>System Configuration</AccordionTrigger>
        <AccordionContent>
          Network protocols initialized. Security parameters verified.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Data Processing</AccordionTrigger>
        <AccordionContent>
          All data streams operating within normal parameters.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Security Status</AccordionTrigger>
        <AccordionContent>
          Encryption active. Firewall enabled. No threats detected.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>System Configuration</AccordionTrigger>
    <AccordionContent>
      Network protocols initialized.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Data Processing</AccordionTrigger>
    <AccordionContent>
      All data streams operating within normal parameters.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Security Status</AccordionTrigger>
    <AccordionContent>
      Encryption active. No threats detected.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
},
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
  checkbox: {
    title: "Checkbox",
    description: "Toggle control with the project's emerald/dark aesthetic",
    preview: (
      <div className="flex items-center gap-6 flex-wrap">
        <label className="flex items-center gap-2">
          <Checkbox />
          <span className="font-mono text-emerald-300">Enable feature</span>
        </label>

        <label className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <span className="font-mono text-emerald-300">Checked</span>
        </label>

        <label className="flex items-center gap-2">
          <Checkbox disabled />
          <span className="font-mono text-emerald-300/70">Disabled</span>
        </label>
      </div>
    ),
    code: `import { Checkbox } from "@/components/ui/checkbox"

// Basic usage
<label>
  <Checkbox />
  <span>Enable feature</span>
</label>

// Checked or disabled
<Checkbox defaultChecked />
<Checkbox disabled />`,
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
      <Card className="w-full">
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
      <div className="text-emerald-300/70 text-sm font-mono wrap-break-word">
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
      <div className="w-full space-y-4">
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
  "input-otp": {
    title: "Input OTP",
    description: "One-time password input with emerald/dark aesthetic",
    preview: (
      <div className="w-full space-y-6 overflow-hidden scrollbar-hide">
        <div>
          <p className="text-emerald-300/70 font-mono text-sm mb-3">6-Digit OTP</p>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div>
          <p className="text-emerald-300/70 font-mono text-sm mb-3">4-Digit PIN</p>
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    ),
    code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

// 6-digit OTP
<InputOTP maxLength={6}>
  <InputOTPGroup>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <InputOTPSlot key={i} index={i} />
    ))}
  </InputOTPGroup>
</InputOTP>

// 4-digit PIN
<InputOTP maxLength={4}>
  <InputOTPGroup>
    {[0, 1, 2, 3].map((i) => (
      <InputOTPSlot key={i} index={i} />
    ))}
  </InputOTPGroup>
</InputOTP>`,
  },
  progress: {
    title: "Progress",
    description: "Progress indicator",
    preview: (
      <div className="w-full space-y-4">
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
      <div className="text-emerald-300/70 text-sm font-mono wrap-break-word">
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
      <div className="space-y-4 w-full">
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
      <div className="relative w-full h-80 flex items-center justify-center p-2 sm:p-4">
        <div
          className="relative w-full h-full bg-[#001a1a] text-emerald-300 border border-emerald-500/50 clip-corners-table overflow-auto group 
          shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15),0_4px_24px_rgba(0,0,0,0.4)]"
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] 
            bg-position[100%_4px] animate-scanline pointer-events-none z-0"
          />

          <table className="w-full caption-bottom text-sm font-mono relative z-10 min-w-[400px]">
            <thead className="[&_tr]:border-b [&_tr]:border-emerald-500/30">
              <tr>
                <th className="h-10 px-2 sm:px-4 text-left align-middle font-bold uppercase tracking-wider text-xs group-hover:text-shadow-glow">
                  ID
                </th>
                <th className="h-10 px-2 sm:px-4 text-left align-middle font-bold uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="h-10 px-2 sm:px-4 text-left align-middle font-bold uppercase tracking-wider text-xs">
                  Task
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b border-emerald-500/30 hover:bg-[#002626]">
                <td className="p-2 sm:p-3 align-middle text-emerald-200/90">0x001A</td>
                <td className="p-2 sm:p-3 align-middle text-red-400">
                  <span className="text-shadow-glow-red">ERROR</span>
                </td>
                <td className="p-2 sm:p-3 align-middle text-emerald-200/90">
                  Initialize Subsystem
                </td>
              </tr>
              <tr
                className="border-b border-emerald-500/30 hover:bg-[#002626] data-[state=selected]:bg-[#002626]"
                data-state="selected"
              >
                <td className="p-2 sm:p-3 align-middle text-emerald-200/90">0x002B</td>
                <td className="p-2 sm:p-3 align-middle text-cyan-400/90 font-bold">
                  RUNNING
                </td>
                <td className="p-2 sm:p-3 align-middle text-emerald-200/90">
                  Data Fetch Cycle
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    code: `import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

<Table>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  spinner: {
    title: "Spinner",
    description: "Loading spinner with multiple sizes and variants",
    preview: (
      <div className="space-y-8 w-full">
        <div>
          <p className="text-emerald-300/70 font-mono text-sm mb-4">Sizes</p>
          <div className="flex gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-emerald-300/50 font-mono">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner />
              <span className="text-xs text-emerald-300/50 font-mono">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-emerald-300/50 font-mono">Large</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="xl" />
              <span className="text-xs text-emerald-300/50 font-mono">XL</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-emerald-300/70 font-mono text-sm mb-4">Variants</p>
          <div className="flex gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="default" size="lg" />
              <span className="text-xs text-emerald-300/50 font-mono">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="destructive" size="lg" />
              <span className="text-xs text-emerald-300/50 font-mono">Destructive</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-emerald-300/70 font-mono text-sm mb-4">Loading Overlay</p>
          <div className="relative h-48 bg-[#001a1a] border border-emerald-500/30 [clip-path:polygon(0_8px,8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px))]">
            <LoadingOverlay text="Loading data..." />
          </div>
        </div>
      </div>
    ),
    code: `import { Spinner, LoadingOverlay } from "@/components/ui/spinner"

// Basic spinner
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="lg" />
<Spinner size="xl" />

// Variants
<Spinner variant="default" />
<Spinner variant="destructive" />

// Loading overlay
<div className="relative">
  <LoadingOverlay text="Loading data..." />
  {/* Your content */}
</div>

// Loading overlay with custom variant and size
<LoadingOverlay 
  text="Processing..." 
  variant="destructive" 
  size="xl"
/>`,
  },
  tabs: {
    title: "Tabs",
    description: "Tabbed content container",
    preview: (
      <div className="relative w-full h-32 flex items-start justify-center p-2 sm:p-4 overflow-x-auto">
        <div
          data-slot="tabs-list"
          className="inline-flex h-9 min-w-fit items-center justify-center p-[3px] gap-1
          bg-[#001a1a] border border-emerald-500/50 clip-corners-tabs relative overflow-hidden"
        >
          <div
            data-slot="tabs-trigger"
            className="inline-flex h-[calc(100%-1px)] items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-300
            font-mono uppercase tracking-wider text-emerald-400/70 hover:text-emerald-300 hover:bg-[#002626]/50 whitespace-nowrap"
          >
            Tab One
          </div>
          <div
            data-slot="tabs-trigger"
            data-state="active"
            className="inline-flex h-[calc(100%-1px)] items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-300
            font-mono uppercase tracking-wider text-emerald-300 bg-[#002626] border-emerald-500/50 clip-corners-trigger
            shadow-[inset_0_0_16px_rgba(6,182,212,0.15),0_0_8px_rgba(6,182,212,0.2)] whitespace-nowrap"
          >
            Active
          </div>
          <div
            data-slot="tabs-trigger"
            data-state="active"
            className="inline-flex h-[calc(100%-1px)] items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-300
            font-mono uppercase tracking-wider text-emerald-400/70 hover:text-emerald-300 hover:bg-[#002626]/50 whitespace-nowrap"
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
      <div className="text-emerald-300/70 text-sm font-mono wrap-break-word">
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
      className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors z-10"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
      ) : (
        <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
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
    <div className="w-full max-w-4xl space-y-6 sm:space-y-8 px-4 sm:px-6 py-4 sm:py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-emerald-300 mb-2 wrap-break-word">
          {doc.title}
        </h1>
        <p className="text-sm sm:text-base text-emerald-300/70 font-mono wrap-break-word">{doc.description}</p>
      </div>

      {doc.dependencies && doc.dependencies.length > 0 && (
        <Alert variant="default" className="border-amber-500/30 bg-amber-500/5">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <AlertTitle className="text-amber-300 text-sm sm:text-base">Additional Components Required</AlertTitle>
          <AlertDescription className="text-amber-300/70 text-xs sm:text-sm wrap-break-word">
            This component will also install: {doc.dependencies.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Preview</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {doc.preview}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <CopyButton text={`npx shadcn@latest add @glitchcn/${componentName}`} />
            <pre className="bg-black/60 p-3 pr-10 sm:p-4 sm:pr-12 rounded border border-emerald-500/20 overflow-x-auto">
              <code className="text-emerald-300 font-mono text-xs sm:text-sm break-all">
                npx shadcn@latest add @glitchcn/{componentName}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <CopyButton text={doc.code} />
            <pre className="bg-black/60 p-3 pr-10 sm:p-4 sm:pr-12 rounded border border-emerald-500/20 overflow-x-auto">
              <code className="text-emerald-300 font-mono text-xs sm:text-sm whitespace-pre-wrap wrap-break-word">
                {doc.code}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}