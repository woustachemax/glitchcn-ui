import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";



export const metadata: Metadata = {
  title: "Glitchcn/ui",
  description: "I don't have a desc, yet!",
  icons: {
    icon: '/favicon.svg'
  }
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
      <body
        className={``}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}