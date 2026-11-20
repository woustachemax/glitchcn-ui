"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Terminal, Cpu, Shield, Activity, Lock, AlertTriangle, CheckCircle, Github, Zap, Code, Database, Network, HardDrive, Server, Copy, Check, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeHero } from "@/components/theme-hero";
import { ThemesCorner } from "@/components/themes-corner";

// Drifts each value around its base so the demo dashboard feels alive.
function useLiveValues(bases: number[], spread = 12, ms = 1400) {
  const [values, setValues] = useState(bases);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const next = v + (Math.random() - 0.5) * spread;
          const min = Math.max(0, bases[i] - spread * 1.5);
          const max = Math.min(100, bases[i] + spread * 1.5);
          return Math.round(Math.min(max, Math.max(min, next)));
        })
      );
    }, ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return values;
}

export default function Home() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Glitchcn/ui";
  const [demoA, demoB] = useLiveValues([82, 45]);
  const [cpu, mem, disk] = useLiveValues([42, 68, 31], 16, 1100);
  const [latency] = useLiveValues([12], 8, 900);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        const nextDelay = 150 + Math.random() * 300;
        timeoutId = setTimeout(typeNextChar, nextDelay);
      }
    };

    timeoutId = setTimeout(typeNextChar, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("npx shadcn@latest add @glitchcn/all");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--glitch-surface))] p-2 sm:p-3 animate-in fade-in duration-2000">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgb(var(--glitch-accent)/2%)_50%,transparent_100%)] bg-size[100%_4px] animate-scanline pointer-events-none" />

      <div className="relative max-w-[1800px] mx-auto space-y-2 sm:space-y-3">
        <header className="flex items-center justify-between p-2 sm:p-3 border-b border-[rgb(var(--glitch-border)/30%)]">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <Terminal className="text-[rgb(var(--glitch-accent))]" size={20} />
            <div className="flex items-baseline">
              <h1 className="font-mono text-lg sm:text-2xl font-bold tracking-wider text-[rgb(var(--glitch-primary))] min-w-[1ch]">
                {displayText}
                <span className="animate-pulse ml-1 inline-block w-2 sm:w-3 h-4 sm:h-6 bg-[rgb(var(--glitch-border)/20%)] align-middle shadow-[0_0_2px_rgb(var(--glitch-border)/10%)]" />
              </h1>
            </div>
            <span className="font-mono text-xs text-[rgb(var(--glitch-border-hover)/50%)] ml-1 sm:ml-2 hidden sm:inline">v2.0.0</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button size="sm" asChild>
              <Link href="/themes">Themes</Link>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" asChild onClick={() => router.push('/docs')}>
              Docs
            </Button>
            <Button size="sm" className="" asChild onClick={() => router.push('/docs/components')}>
              Components
            </Button>
            <Button size="sm" onClick={() => window.open("https://github.com/woustachemax/glitchcn-ui", "_blank")}>
              <Github size={14} />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3" id="components">
          <div className="lg:col-span-12">
            <ThemeHero />
          </div>

          <div className="lg:col-span-12">
            <ThemesCorner preview />
          </div>

          <div className="lg:col-span-3 space-y-2 sm:space-y-3">
            <Card className="border-[rgb(var(--glitch-border)/50%)] bg-[rgb(var(--glitch-surface))] hover:border-[rgb(var(--glitch-border-hover)/70%)] cursor-pointer transition-all" onClick={() => setVideoOpen(true)}>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base flex items-center gap-2"><Play className="inline" size={14} />Featured</CardTitle>
                <CardDescription className="text-xs">YouTube showcase</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[rgb(var(--glitch-primary)/80%)]">We just got featured in a YouTube video! Click to watch.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base"><Terminal className="inline mr-1" size={14} />Components</CardTitle>
                <CardDescription className="text-xs">UI Library Demo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span>Cards</span><Badge>✓</Badge></div>
                  <div className="flex justify-between"><span>Tables</span><Badge>✓</Badge></div>
                  <div className="flex justify-between"><span>Inputs</span><Badge>✓</Badge></div>
                  <div className="flex justify-between"><span>Dialogs</span><Badge>✓</Badge></div>
                  <div className="flex justify-between"><span>Tabs</span><Badge>✓</Badge></div>
                  <div className="flex justify-between"><span>Alerts</span><Badge>✓</Badge></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" asChild onClick={() => router.push('/docs/components')}>
                  View All
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base"><Shield className="inline mr-1" size={14} />Install</CardTitle>
                <CardDescription className="text-xs">Add any component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-2 bg-[rgb(var(--glitch-surface)/40%)] rounded text-xs border border-[rgb(var(--glitch-border)/30%)] font-mono overflow-x-auto">
                  <pre className="text-[rgb(var(--glitch-primary))]">npx shadcn@latest add{'\n'}@glitchcn/all</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" onClick={copyInstallCommand}>
                  {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </CardFooter>
            </Card>


            <Alert>
              <CheckCircle size={14} />
              <AlertTitle className="text-sm">Ready to use</AlertTitle>
              <AlertDescription className="text-xs">Copy paste components</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle size={14} />
              <AlertTitle className="text-sm">Example Alert</AlertTitle>
              <AlertDescription className="text-xs">Destructive variant demo</AlertDescription>
            </Alert>

            <Card className="hidden lg:block">
              <CardHeader>
                <CardTitle className="text-sm"><Database className="inline mr-1" size={14} />System Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Node</span><span className="text-[rgb(var(--glitch-primary))]">v20.11.0</span></div>
                <div className="flex justify-between"><span>React</span><span className="text-[rgb(var(--glitch-primary))]">v18.3.1</span></div>
                <div className="flex justify-between"><span>Next</span><span className="text-[rgb(var(--glitch-primary))]">v15.0.3</span></div>
                <div className="flex justify-between"><span>Tailwind</span><span className="text-[rgb(var(--glitch-primary))]">v3.4.1</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-6 space-y-2 sm:space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base"><Cpu className="inline mr-1" size={14} />Progress Demo</CardTitle>
                <CardDescription className="text-xs">Animated bars</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs"><span>Example</span><span>{demoA}%</span></div>
                <Progress value={demoA} />
                <div className="flex justify-between text-xs"><span>Loading</span><span>{demoB}%</span></div>
                <Progress value={demoB} />
                <div className="flex justify-between text-xs"><span>Complete</span><span>100%</span></div>
                <Progress value={100} />
              </CardContent>
              <CardFooter><Button size="sm" onClick={() => window.location.reload()}>Refresh</Button></CardFooter>
            </Card>

            <div className="space-y-2">
              <Input placeholder="$ input component demo..." />
              <Input placeholder="$ another example input..." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="$ user@host" />
                <Input placeholder="$ password" type="password" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[rgb(var(--glitch-primary))]"><span>Progress bar</span><span>73%</span></div>
                <Progress value={73} />
              </div>
            </div>

            <Tabs defaultValue="sys">
              <TabsList className="w-full">
                <TabsTrigger value="sys" className="flex-1">Tabs</TabsTrigger>
                <TabsTrigger value="net" className="flex-1">Example</TabsTrigger>
                <TabsTrigger value="log" className="flex-1">Demo</TabsTrigger>
                <TabsTrigger value="test" className="flex-1">Test</TabsTrigger>
              </TabsList>
              <TabsContent value="sys" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-[rgb(var(--glitch-primary)/80%)]">Tab component showcase</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="net" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-[rgb(var(--glitch-primary)/80%)]">Switch between tabs</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="log" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-[rgb(var(--glitch-primary)/80%)]">Terminal styled tabs</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="test" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-[rgb(var(--glitch-primary)/80%)]">Additional tab content</p></CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm"><Network className="inline mr-1" size={14} />Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-xs">
                  <div className="flex justify-between"><span>Latency</span><Badge>{Math.max(3, latency)}ms</Badge></div>
                  <div className="flex justify-between"><span>Bandwidth</span><Badge>1.2GB/s</Badge></div>
                  <div className="flex justify-between"><span>Packets</span><Badge>847K</Badge></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm"><HardDrive className="inline mr-1" size={14} />Storage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-xs">
                  <div className="flex justify-between"><span>Used</span><Badge>342GB</Badge></div>
                  <div className="flex justify-between"><span>Free</span><Badge>658GB</Badge></div>
                  <div className="flex justify-between"><span>Total</span><Badge>1TB</Badge></div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm">Button</Button>
              <Button size="sm" variant="destructive">Alert</Button>
              <Button size="sm">Action</Button>
              <Button size="sm">Execute</Button>
              <Dialog>
                <DialogTrigger asChild><Button size="sm">Modal</Button></DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-sm sm:text-base">Dialog Component</DialogTitle>
                    <DialogDescription className="text-xs">Example modal window</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <div className="p-2 bg-[rgb(var(--glitch-surface)/40%)] rounded text-xs border border-[rgb(var(--glitch-border)/30%)]">
                      <p className="text-green-400">$ component.render()</p>
                    </div>
                    <Input placeholder="demo input..." />
                  </div>
                  <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="destructive" className="w-full sm:w-auto">Cancel</Button>
                    <Button size="sm" className="w-full sm:w-auto">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm">Process</Button>
              <Button size="sm">Run</Button>
              <Badge>Badge</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge><Activity size={10} className="mr-1" />Live</Badge>
              <Badge><Zap size={10} className="mr-1" />Fast</Badge>
              <Badge><Code size={10} className="mr-1" />Code</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Terminal Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="p-2 bg-[rgb(var(--glitch-surface)/40%)] rounded text-xs border border-[rgb(var(--glitch-border)/30%)] font-mono overflow-x-auto">
                  <p className="text-green-400">$ npm install glitchcn</p>
                  <p className="text-[rgb(var(--glitch-primary)/70%)]">Installing dependencies...</p>
                  <p className="text-[rgb(var(--glitch-accent))]">✓ Installed 12 packages</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-2 sm:space-y-3">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Component</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">Cards</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Buttons</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Alerts</TableCell>
                    <TableCell><Badge variant="destructive">Demo</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Tables</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Dialogs</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Inputs</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Progress</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">Tabs</TableCell>
                    <TableCell><Badge>Ready</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm"><Server className="inline mr-1" size={14} />Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>CPU Usage</span><span>{cpu}%</span></div>
                  <Progress value={cpu} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Memory</span><span>{mem}%</span></div>
                  <Progress value={mem} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Disk I/O</span><span>{disk}%</span></div>
                  <Progress value={disk} />
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base"><Code className="inline mr-1" size={14} />Features</CardTitle>
                <CardDescription className="text-xs">Terminal styling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1"><Lock size={12} className="text-green-400" /><span>Cyberpunk theme</span></div>
                  <div className="flex items-center gap-1"><Activity size={12} className="text-[rgb(var(--glitch-accent))]" /><span>React ready</span></div>
                  <div className="flex items-center gap-1"><Zap size={12} className="text-yellow-400" /><span>Fast rendering</span></div>
                  <div className="flex items-center gap-1"><Code size={12} className="text-purple-400" /><span>TypeScript</span></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" onClick={() => window.open("https://github.com/woustachemax/glitchcn", "_blank")}>
                  GitHub
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs">
                <div className="flex justify-between"><span>Build Time</span><span className="text-[rgb(var(--glitch-primary))]">2.4s</span></div>
                <div className="flex justify-between"><span>Bundle Size</span><span className="text-[rgb(var(--glitch-primary))]">142KB</span></div>
                <div className="flex justify-between"><span>Components</span><span className="text-[rgb(var(--glitch-primary))]">12</span></div>
                <div className="flex justify-between"><span>Downloads</span><span className="text-[rgb(var(--glitch-primary))]">1.2K</span></div>
              </CardContent>
            </Card>

            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0 gap-0 bg-[rgb(var(--glitch-surface))] border-[rgb(var(--glitch-border)/50%)]">
                <DialogHeader className="p-4 border-b border-[rgb(var(--glitch-border)/30%)]">
                  <DialogTitle>Glitchcn Featured on YouTube</DialogTitle>
                  <DialogDescription className="text-xs">Watch our showcase video</DialogDescription>
                </DialogHeader>
                <div className="relative w-full aspect-video bg-[rgb(var(--glitch-surface))]">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/15ZVQVlNR-o?si=XO9saWhYz9CRsn1w"
                    title="Glitchcn UI Showcase"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="col-span-1 lg:col-span-12">
            <footer className="text-end py-3">
              <p className="font-mono text-xs text-[rgb(var(--glitch-border-hover)/70%)]">
                Made without '$$' by <a href="https://www.siddharththakkar.xyz/" target="_blank" rel="noopener noreferrer" className="text-[rgb(var(--glitch-primary))] hover:text-[rgb(var(--glitch-accent))]">woustachemax</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}