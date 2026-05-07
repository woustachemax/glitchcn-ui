import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glitchcn/ui",
  description: "A cyberpunk React component library. Glitch effects, terminal UIs, and neon-accented components built on shadcn/ui primitives.",
  metadataBase: new URL("https://glitchcn-ui.vercel.app"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Glitchcn/ui",
    description: "Cyberpunk React components with glitch effects, terminal aesthetics, and neon accents.",
    url: "https://glitchcn-ui.vercel.app",
    siteName: "Glitchcn/ui",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glitchcn/ui",
    description: "Cyberpunk React components with glitch effects, terminal aesthetics, and neon accents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={``}>
        {children}
      </body>
    </html>
  );
}