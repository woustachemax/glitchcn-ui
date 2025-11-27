"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Terminal, Cpu, Shield, Activity, Lock, AlertTriangle, CheckCircle, Github, Sun, Moon, Zap, Code, Database, Network, HardDrive, Server } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-3">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(6,182,212,0.02)_50%,transparent_100%)] bg-size[100%_4px] animate-scanline pointer-events-none" />
      
      <div className="relative max-w-[1800px] mx-auto space-y-3">
        <header className="flex items-center justify-between p-3 border-b border-emerald-500/30">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Terminal className="text-cyan-400" size={28} />
            <h1 className="font-mono text-2xl font-bold tracking-wider uppercase text-emerald-300">GLITCHCN</h1>
            <span className="font-mono text-xs text-emerald-400/50 ml-2">v1.0.0</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </Button>
            <Button size="sm" asChild><a href="#components">Docs</a></Button>
            <Button className='flex-row'size="sm" asChild onClick={() => window.open("https://github.com/woustachemax/glitchcn-ui", "_blank")}>
              <Github size={14} className="mr-1" /></Button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-3" id="components">
          <div className="col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle><Terminal className="inline mr-1" size={14} />Components</CardTitle>
                <CardDescription>UI Library Demo</CardDescription>
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
              <CardFooter><Button size="sm" asChild><a href="#components">View All</a></Button></CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><Shield className="inline mr-1" size={14} />Features</CardTitle>
                <CardDescription>Terminal styling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1"><Lock size={12} className="text-green-400" /><span>Cyberpunk theme</span></div>
                  <div className="flex items-center gap-1"><Activity size={12} className="text-cyan-400" /><span>React ready</span></div>
                  <div className="flex items-center gap-1"><Zap size={12} className="text-yellow-400" /><span>Fast rendering</span></div>
                  <div className="flex items-center gap-1"><Code size={12} className="text-purple-400" /><span>TypeScript</span></div>
                </div>
              </CardContent>
              <CardFooter><Button size="sm" asChild><a href="https://github.com/woustachemax/glitchcn" target="_blank" rel="noopener noreferrer">Install</a></Button></CardFooter>
            </Card>

            <Alert>
              <CheckCircle size={14} />
              <AlertTitle>Ready to use</AlertTitle>
              <AlertDescription>Copy paste components</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle size={14} />
              <AlertTitle>Example Alert</AlertTitle>
              <AlertDescription>Destructive variant demo</AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm"><Database className="inline mr-1" size={14} />System Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Node</span><span className="text-emerald-300">v20.11.0</span></div>
                <div className="flex justify-between"><span>React</span><span className="text-emerald-300">v18.3.1</span></div>
                <div className="flex justify-between"><span>Next</span><span className="text-emerald-300">v15.0.3</span></div>
                <div className="flex justify-between"><span>Tailwind</span><span className="text-emerald-300">v3.4.1</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-6 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle><Cpu className="inline mr-1" size={14} />Progress Demo</CardTitle>
                <CardDescription>Animated bars</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs"><span>Example</span><span>82%</span></div>
                <Progress value={82} />
                <div className="flex justify-between text-xs"><span>Loading</span><span>45%</span></div>
                <Progress value={45} />
                <div className="flex justify-between text-xs"><span>Complete</span><span>100%</span></div>
                <Progress value={100} />
              </CardContent>
              <CardFooter><Button size="sm" onClick={() => window.location.reload()}>Refresh</Button></CardFooter>
            </Card>

            <div className="space-y-2">
              <Input placeholder="$ input component demo..." />
              <Input placeholder="$ another example input..." />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="$ user@host" />
                <Input placeholder="$ password" type="password" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-emerald-300 dark:text-emerald-300"><span>Progress bar</span><span>73%</span></div>
                <Progress value={73} />
              </div>
            </div>

            <Tabs defaultValue="sys">
              <TabsList>
                <TabsTrigger value="sys">Tabs</TabsTrigger>
                <TabsTrigger value="net">Example</TabsTrigger>
                <TabsTrigger value="log">Demo</TabsTrigger>
                <TabsTrigger value="test">Test</TabsTrigger>
              </TabsList>
              <TabsContent value="sys" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-emerald-300/80">Tab component showcase</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="net" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-emerald-300/80">Switch between tabs</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="log" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-emerald-300/80">Terminal styled tabs</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="test" className="pt-2">
                <Card>
                  <CardContent className="pt-4"><p className="text-xs text-emerald-300/80">Additional tab content</p></CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm"><Network className="inline mr-1" size={14} />Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-xs">
                  <div className="flex justify-between"><span>Latency</span><Badge>12ms</Badge></div>
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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Component</DialogTitle>
                    <DialogDescription>Example modal window</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <div className="p-2 bg-black/40 rounded text-xs border border-emerald-500/30">
                      <p className="text-green-400">$ component.render()</p>
                    </div>
                    <Input placeholder="demo input..." />
                  </div>
                  <DialogFooter>
                    <Button size="sm" variant="destructive">Cancel</Button>
                    <Button size="sm">Confirm</Button>
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
                <div className="p-2 bg-black/40 rounded text-xs border border-emerald-500/30 font-mono">
                  <p className="text-green-400">$ npm install glitchcn</p>
                  <p className="text-emerald-300/70">Installing dependencies...</p>
                  <p className="text-cyan-400">✓ Installed 12 packages</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-3 space-y-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Status</TableHead>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Components</span><span>12</span></div>
                  <Progress value={100} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Variants</span><span>24</span></div>
                  <Progress value={85} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Examples</span><span>48</span></div>
                  <Progress value={92} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm"><Server className="inline mr-1" size={14} />Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>CPU Usage</span><span>42%</span></div>
                  <Progress value={42} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Memory</span><span>68%</span></div>
                  <Progress value={68} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span>Disk I/O</span><span>31%</span></div>
                  <Progress value={31} />
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Zap size={14} />
              <AlertTitle>Performance</AlertTitle>
              <AlertDescription>Optimized rendering</AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs">
                <div className="flex justify-between"><span>Build Time</span><span className="text-emerald-300">2.4s</span></div>
                <div className="flex justify-between"><span>Bundle Size</span><span className="text-emerald-300">142KB</span></div>
                <div className="flex justify-between"><span>Components</span><span className="text-emerald-300">12</span></div>
                <div className="flex justify-between"><span>Downloads</span><span className="text-emerald-300">1.2K</span></div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12">
            <Separator />
            <footer className="text-center py-3">
              <p className="font-mono text-xs text-emerald-400/70 dark:text-emerald-400/70">
                Made with 💚 by <a href="https://www.siddharththakkar.xyz/" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-cyan-400">woustachemax</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}