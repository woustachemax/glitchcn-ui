# 🌐 GlitchCN Component Library

**A retro-futuristic React component library for Next.js applications, bringing terminal-styled aesthetics to modern web development.**

[![Live Demo](https://img.shields.io/badge/demo-live-00ff88?style=for-the-badge)](https://glitchcn-ui.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-repository-00ccff?style=for-the-badge)](https://github.com/woustachemax/glitchcn-ui)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Design Philosophy](#-design-philosophy)
- [Component Aesthetics](#-component-aesthetics)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Available Components](#-available-components)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

GlitchCN is a comprehensive component library that bridges the gap between nostalgic terminal interfaces and modern web design. Built specifically for Next.js applications using the App Router, GlitchCN delivers a collection of highly customizable React components that embody a cyberpunk, retro-futuristic aesthetic.

Whether you're building a developer portfolio, a tech-focused dashboard, or an application that demands a unique visual identity, GlitchCN provides the building blocks to create memorable user experiences.

**Key Features:**
- 🎨 **15+ Production-Ready Components** - From basic UI elements to complex layouts
- ⚡ **Performance-Optimized** - Built with modern React patterns and best practices
- 🎭 **Animated & Interactive** - Scanline effects, glowing borders, and smooth transitions
- 🌙 **Dark Mode Native** - Designed from the ground up for dark interfaces
- 📦 **Easy Integration** - Works seamlessly with shadcn/ui ecosystem
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🔧 **Highly Customizable** - Tailwind CSS powered styling system

---

## 🎨 Design Philosophy

GlitchCN draws inspiration from classic computer terminals, cyberpunk aesthetics, and retro-futuristic interfaces. The design language emphasizes:

### Visual Identity
- **Nostalgia Meets Modern**: Combining the charm of vintage CRT displays with contemporary UI patterns
- **High Contrast**: Strategic use of glowing elements against deep dark backgrounds for maximum visual impact
- **Terminal Authenticity**: Monospace typography and grid-based layouts that feel like genuine command-line interfaces
- **Cyberpunk Edge**: Neon glows, animated scanlines, and futuristic geometric shapes

### User Experience
- **Instant Recognition**: Distinctive visual style that immediately communicates a tech-forward brand
- **Accessibility Focused**: High contrast ratios and clear visual hierarchy ensure usability
- **Performance First**: Optimized animations and efficient rendering for smooth interactions
- **Responsive Design**: Components adapt beautifully across all screen sizes

---

## ✨ Component Aesthetics

Every component in GlitchCN is crafted with meticulous attention to visual detail. Here's what makes them unique:

### 🎬 Animated Scanline Effects
Subtle horizontal line animations sweep across components, mimicking the characteristic scan pattern of vintage CRT monitors. This creates a sense of movement and technical authenticity without being distracting.

**What it does:**
- Adds depth and dimension to flat UI elements
- Creates a living, breathing quality to static components
- Reinforces the retro-terminal aesthetic
- Provides subtle visual feedback during user interactions

### 💎 Glowing Borders & Accents
Components feature luminous cyan (`#00ffff`) and emerald (`#10b981`) borders that appear to emit light, creating a striking neon effect against dark backgrounds.

**What it does:**
- Draws attention to interactive elements and important content
- Creates visual hierarchy through light intensity
- Provides instant feedback on hover and focus states
- Establishes a cohesive color language across the interface

### 🔤 Monospace Typography
All text is rendered in the custom **Bitcount Grid Single** monospace font, delivering authentic terminal vibes while maintaining excellent readability.

**What it does:**
- Creates consistent vertical rhythm and alignment
- Evokes the feeling of reading code or terminal output
- Ensures text is crisp and legible at all sizes
- Maintains the technical, developer-focused aesthetic

### 🌊 Dark Teal Backgrounds
A carefully selected dark teal palette (`#001a1a` to `#002626`) serves as the foundation, providing depth without the harshness of pure black.

**What it does:**
- Reduces eye strain during extended use
- Creates depth through subtle color variations
- Provides the perfect canvas for glowing elements to stand out
- Maintains a sophisticated, professional appearance

### 📐 Clipped Corner Styling
Strategic use of angled corners and geometric shapes adds a modern, tech-inspired edge to traditional component layouts.

**What it does:**
- Breaks away from standard rounded corners for a unique look
- Creates visual interest and geometric harmony
- Reinforces the futuristic, engineered aesthetic
- Guides the eye through intentional directional cues

### 🎭 Interactive States
Components respond to user interaction with smooth transitions, color shifts, and subtle scale effects that feel natural and satisfying.

**What it does:**
- Provides clear feedback for hover, focus, and active states
- Creates a sense of physicality and responsiveness
- Guides users through their interactions
- Enhances overall usability and user confidence

---

## 🚀 Getting Started

### Prerequisites

Ensure your development environment meets these requirements:

| Requirement | Version | Notes |
|------------|---------|-------|
| **Node.js** | 18.17+ | LTS version recommended |
| **Next.js** | 14+ | App Router required |
| **React** | 18+ | Server Components supported |
| **Tailwind CSS** | 3.4+ | Must be configured |
| **TypeScript** | 5+ | Recommended but optional |

### Installation

GlitchCN integrates seamlessly with the shadcn/ui CLI for easy component installation.

#### Step 1: Configure components.json

Add the GlitchCN registry to your `components.json` file:

```json
{
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
```

#### Step 2: Install Components

**Option A: Install All Components**

Get the complete component library in one command:

```bash
npx shadcn@latest add @glitchcn/all
```

**Option B: Install Individual Components**

Cherry-pick only the components you need:

```bash
npx shadcn@latest add @glitchcn/button @glitchcn/card

npx shadcn@latest add @glitchcn/button
npx shadcn@latest add @glitchcn/input
```

---

## 💻 Usage

### Basic Example

Import and use components in your Next.js app:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Terminal Interface</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter command..." />
          <Button>Execute</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### With Server Components

GlitchCN components work seamlessly with Next.js Server Components:

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default async function ServerPage() {
  const data = await fetchData()
  
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>System Status</AlertTitle>
      <AlertDescription>
        {data.message}
      </AlertDescription>
    </Alert>
  )
}
```

### Advanced Composition

Build complex interfaces by combining multiple components:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Service</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Badge variant="default">Active</Badge>
              </TableCell>
              <TableCell>API Server</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
```

---

## 📦 Available Components

GlitchCN includes 15+ production-ready components, each designed with the signature retro-futuristic aesthetic:

### Layout & Structure
- **Sidebar** - Collapsible navigation with nested menu support
- **Card** - Content containers with headers, footers, and multiple variants
- **Separator** - Visual dividers with glowing effects
- **Sheet** - Slide-out panels for secondary content

### Form Elements
- **Button** - Multiple variants with hover effects and loading states
- **Input** - Text inputs with glowing focus states
- **Command** - Command palette for keyboard-driven navigation

### Feedback & Display
- **Alert** - Status messages with icons and variants
- **Badge** - Small status indicators and labels
- **Progress** - Animated progress bars with glowing fill
- **Skeleton** - Loading placeholders with scanline animation
- **Tooltip** - Contextual information on hover

### Data Display
- **Table** - Data tables with sortable columns and hover effects
- **Tabs** - Tabbed interfaces with smooth transitions

### Overlays & Modals
- **Dialog** - Modal dialogs with backdrop blur
- **Alert Dialog** - Confirmation dialogs for critical actions

Each component is fully documented with:
- ✅ Live interactive previews
- 📝 Complete API documentation
- 🎨 Variant examples
- 💡 Usage recommendations
- ⌨️ Keyboard navigation support

**[View all components →](https://glitchcn-ui.vercel.app/docs/components)**

---

## 🎛️ Customization

### Color Scheme

GlitchCN uses CSS variables for easy theming. Override in your `globals.css`:

```css
:root {
  --primary: oklch(0.7 0.3 180); 
  --secondary: oklch(0.7 0.2 150); 
  --background: oklch(0.145 0.02 180); 
  --foreground: oklch(0.985 0 0); 
}
```

### Typography

Change the monospace font by updating your layout:

```tsx
import { JetBrains_Mono } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mono.className}>
      {children}
    </html>
  )
}
```

### Animation Intensity

Control scanline and glow effects via Tailwind classes:

```tsx
<Button className="animate-none">No Animation</Button>

<Card className="shadow-[0_0_30px_rgba(16,185,129,0.5)]">
  Glowing Card
</Card>
```

---

## 🤝 Contributing

We welcome contributions! GlitchCN is an open-source project that thrives on community input.

### How to Contribute

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** (`git checkout -b feature/amazing-component`)
4. **Make your changes** and commit (`git commit -m 'Add amazing component'`)
5. **Push to your fork** (`git push origin feature/amazing-component`)
6. **Open a Pull Request** with a detailed description

### Development Setup

```bash
git clone https://github.com/woustachemax/glitchcn-ui.git
cd glitchcn-ui

pnpm install

pnpm run dev
```

### Guidelines

- Follow the existing code style and conventions
- Maintain the retro-futuristic aesthetic in new components
- Include TypeScript types for all props
- Add documentation and examples for new components
- Test across different screen sizes and browsers

---

## 📄 License

GlitchCN is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- 🌐 **Live Demo**: [glitchcn-ui.vercel.app](https://glitchcn-ui.vercel.app/)
- 📦 **GitHub Repository**: [github.com/woustachemax/glitchcn-ui](https://github.com/woustachemax/glitchcn-ui)
- 📖 **Documentation**: [glitchcn-ui.vercel.app/docs](https://glitchcn-ui.vercel.app/docs)
- 🎨 **Component Gallery**: [glitchcn-ui.vercel.app/docs/components](https://glitchcn-ui.vercel.app/docs/components)

---

## 💡 Credits

Built without '$$' by [@woustachemax](https://github.com/woustachemax)

Powered by:
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component Architecture
- [Radix UI](https://www.radix-ui.com/) - Accessible Primitives

---

<div align="center">

**If you find GlitchCN useful, consider giving it a ⭐ on GitHub!**

Made with 💚 and a love for retro aesthetics

</div>