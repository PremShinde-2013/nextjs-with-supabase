/* eslint-disable @next/next/no-page-custom-font */
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

  // 🔹 Title (Main headline in Google Search & browser tab)
  title: {
    default: "Skillveta - Top Courses & Internships for Students",
    template: "%s | Skillveta", // makes dynamic titles like "C Programming Course | Skillveta"
  },

  // 🔹 Meta description (very important for Google CTR)
  description:
    "Skillveta is the #1 platform for students to learn and grow with top-rated online courses and internships. Master programming, web development, AI/ML, data science, and more. Get hands-on experience and boost your career with Skillveta.",

  // 🔹 Keywords (helpful for secondary SEO signals)
  keywords: [
    "Skillveta",
    "online courses",
    "internships",
    "programming courses",
    "web development courses",
    "AI ML courses",
    "data science courses",
    "full stack development",
    "engineering internships",
    "coding bootcamp",
    "student career growth",
    "learn programming online",
    "software engineering courses",
  ],

  authors: [{ name: "Skillveta Team", url: defaultUrl }],

  creator: "Skillveta",
  publisher: "Skillveta",

  // 🔹 Robots (tell search engines what to do)
  robots: {
    index: true, // allow indexing
    follow: true, // allow following links
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // 🔹 Canonical URL (avoid duplicate SEO penalties)
  alternates: {
    canonical: defaultUrl,
  },

  // 🔹 Favicons
  icons: {
    icon: "/images/favicon-96x96.png",
    shortcut: "/images/favicon-96x96.png",
    apple: "/images/favicon-96x96.png",
  },

  // 🔹 Open Graph (Facebook, LinkedIn, WhatsApp, Slack)
  openGraph: {
    title: "Skillveta - Learn Programming, Web Dev & AI with Internships",
    description:
      "Skillveta helps students master coding, web development, AI/ML, and secure internships. Learn by doing with hands-on projects and boost your career opportunities.",
    url: defaultUrl,
    siteName: "Skillveta",
    images: [
      {
        url: "/images/OG_card.png", // in public/images/
        width: 1200,
        height: 630,
        alt: "Skillveta - Best Courses & Internships for Students",
      },

    ],
    locale: "en_US",
    type: "website",
  },

  // 🔹 Twitter Cards (Twitter/X previews)
  twitter: {
    card: "summary_large_image",
    title: "Skillveta - Courses & Internships for Students",
    description:
      "Learn programming, web development, AI/ML, and secure internships with Skillveta. Join today and level up your career.",
    images: ["/images/twitter_card.png"], // optimized 1200x675px
  },


  // 🔹 Category (useful for certain crawlers)
  category: "education",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Skillveta",
              "url": defaultUrl,
              "logo": `${defaultUrl}/logo.svg`,
              "sameAs": ["https://www.facebook.com/skillveta", "https://twitter.com/skillveta"],
              "course": [
                {
                  "@type": "Course",
                  "name": "C Programming Course",
                  "description": "Learn C programming from beginner to advanced with practical projects.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Skillveta",
                    "sameAs": defaultUrl
                  }
                },
                {
                  "@type": "Course",
                  "name": "Python for Beginners",
                  "description": "Learn Python with hands-on examples and projects.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Skillveta",
                    "sameAs": defaultUrl
                  }
                }
              ]
            }),
          }}
        />
        <meta name="theme-color" content="#ff6a00" />


      </head>


      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
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
