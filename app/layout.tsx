import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { NavbarDemo } from "@/components/NavbarDemo";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Landing/Footer";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
  // ✅ Add Open Sans in metadata
  icons: {
    icon: "/favicon.ico",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />

        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>


      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <NavbarDemo />

          {children}

          <div className="relative flex size-full items-center justify-center overflow-hidden  rounded-lg border-none bg-background py-20 md:mt-12 mt-8 ">

            <GridPattern
              width={60}
              height={60}
              x={-1}
              y={-1}
              strokeDasharray={"4 2"}

              className={cn(
                "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]",
              )}
            />

            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />


      </body>
    </html>
  );
}
