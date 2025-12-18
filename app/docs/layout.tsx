"use client"

import Link from "next/link";
import { Terminal, BookOpen, Package, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const components = [
  "accordion",
  "alert",
  "badge", 
  "button",
  "card",
  "command",
  "dialog",
  "input",
  "progress",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "spinner",
  "table",
  "tabs",
  "tooltip"
];

const searchItems = [
  { title: "Getting Started", href: "/docs", type: "Documentation" },
  { title: "Components", href: "/docs/components", type: "Documentation" },
  ...components.map(comp => ({
    title: comp.charAt(0).toUpperCase() + comp.slice(1),
    href: `/docs/components/${comp}`,
    type: "Component"
  }))
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 flex h-14 items-center justify-between border-b border-emerald-500/30 bg-black px-4">
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="text-cyan-400" size={20} />
          <span className="font-mono text-lg font-bold text-emerald-300">Glitchcn</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            
            onClick={() => setSearchOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
          >
            <Search size={18} />
          </Button>
          <Button 
            size="sm" 
            
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          <div className="h-full overflow-y-auto p-6 pt-20">
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-sm font-semibold text-emerald-300/70 mb-3">Documentation</h3>
                <div className="space-y-2">
                  <Link 
                    href="/docs" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="font-mono">Getting Started</span>
                  </Link>
                  <Link 
                    href="/docs/components"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    <span className="font-mono">Components</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-emerald-500/30 pt-6">
                <h3 className="font-mono text-sm font-semibold text-emerald-300/70 mb-3">Components</h3>
                <div className="grid grid-cols-2 gap-2">
                  {components.map((comp) => (
                    <Link
                      key={comp}
                      href={`/docs/components/${comp}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded text-emerald-300 hover:bg-emerald-500/10 transition-colors text-sm font-mono capitalize"
                    >
                      {comp}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <SidebarProvider defaultOpen={true} className="bg-black overflow-x-hidden">
          <Sidebar variant="inset" collapsible="icon" className="overflow-x-hidden">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 group px-2">
                <Terminal className="text-cyan-400" size={24} />
                <span className="font-mono text-xl font-bold text-emerald-300 group-data-[collapsible=icon]:hidden">
                  Glitchcn
                </span>
              </Link>
            </SidebarHeader>
            
            <SidebarContent className="overflow-x-hidden">
              <SidebarGroup>
                <SidebarGroupContent>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-2 w-full px-2 py-2 text-sm font-mono text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search...</span>
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 font-mono text-xs font-medium text-emerald-300/70">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </button>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/docs">
                          <BookOpen className="h-4 w-4" />
                          <span>Getting Started</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/docs/components">
                          <Package className="h-4 w-4" />
                          <span>Components</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel>Components</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {components.map((comp) => (
                      <SidebarMenuItem key={comp}>
                        <SidebarMenuButton asChild>
                          <Link href={`/docs/components/${comp}`}>
                            <span className="capitalize">{comp}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset className="bg-black">
            <main className="flex-1 p-8 overflow-x-hidden">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>

      <main className="lg:hidden p-4 bg-black min-h-screen">
        {children}
      </main>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0 gap-0 bg-[#001a1a] border-emerald-500/50">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="flex items-center border-b border-emerald-500/30 px-4 py-3">
            <Search className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 shadow-none bg-transparent text-emerald-300 placeholder:text-emerald-300/50"
              autoFocus
            />
          </div>
          <div className="max-h-[60vh] sm:max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-emerald-300/70 font-mono text-sm">
                No results found
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-emerald-500/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Terminal className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span className="font-mono text-emerald-300 group-hover:text-emerald-200 text-sm">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-300/50">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}