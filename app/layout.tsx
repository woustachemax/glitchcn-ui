import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://glitchcn-ui.vercel.app";
const siteTitle = "Glitchcn/ui";
const siteDescription = "Glitchcn/ui is a cyberpunk, terminal-styled React component library for shadcn/ui. 19+ components, 5 themes, dark and light modes, one npx install.";
const ogDescription = "Cyberpunk, terminal-styled React components for shadcn/ui. 19+ components, 5 themes with dark/light modes, one npx install.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  keywords: ["shadcn/ui", "shadcn cli", "react components", "cyberpunk ui", "terminal ui", "tailwind css", "component library", "next.js", "dark mode themes"],
  authors: [{ name: "woustachemax" }],
  creator: "woustachemax",
  publisher: "woustachemax",
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#001a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ecfdf5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('glitch-theme')||'emerald';var m=localStorage.getItem('glitch-mode')||'dark';d.dataset.glitchTheme=t;d.dataset.mode=m;if(t==='custom'){var c=JSON.parse(localStorage.getItem('glitch-custom-theme')||'null');var p=c&&c[m==='light'?'light':'dark'];if(p){for(var k in p){d.style.setProperty('--glitch-'+k,p[k]);}}else{d.dataset.glitchTheme='emerald';}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={``}>
        {children}
      </body>
    </html>
  );
}