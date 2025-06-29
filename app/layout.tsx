import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-2 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-2">
              <Link
                isExternal
                className="flex items-center gap-1 text-current text-xs"
                href="https://fior.in"
                title="Fior.in"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-orange-500">Fior.in</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-TKJZPW775T" />
    </html>
  );
}
