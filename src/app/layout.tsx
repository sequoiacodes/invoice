// app/layout.tsx or app/root-layout.tsx (depending on your file structure)

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Bill Maker",
  description: "Make your bills easily with our web application.",
  keywords: ["Next.js", "SEO","Bill",  "ThemeProvider", "Web App", "Billing", "Invoice", "Finance" , "Accounting", "Business"],
  authors: [{ name: "Aalok", url: "https://bill.sequoiacodes.com.np" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "App Maker",
    description: "A short description of your application.",
    url: "https://bill.sequoiacodes.com.np",
    siteName: "App Maker",
    images: [
      {
        url: "https://bill.sequoiacodes.com.np/favicon.ico",
        width: 1200,
        height: 630,
        alt: "App Maker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Maker",
    description: "A short description of your application.",
    images: ["https://bill.sequoiacodes.com.np/twitter-image.jpg"],
    creator: "@yourhandle",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A short description of your application for SEO." />
        <meta name="keywords" content="Next.js, SEO, ThemeProvider, Web App" />
        <meta name="author" content="Your Name" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="App Maker" />
        <meta property="og:description" content="A short description of your application." />
        <meta property="og:image" content="https://bill.sequoiacodes.com.np/og-image.jpg" />
        <meta property="og:url" content="https://bill.sequoiacodes.com.np" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="App Maker" />
        <meta name="twitter:description" content="A short description of your application." />
        <meta name="twitter:image" content="https://bill.sequoiacodes.com.np/twitter-image.jpg" />
        <meta name="twitter:creator" content="@yourhandle" />
        <title>App Maker</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
