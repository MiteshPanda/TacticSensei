import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TacticSensei — Learn Football Tactics From Zero",
    template: "%s | TacticSensei",
  },
  description:
    "The easiest way for complete beginners to become knowledgeable football fans. Learn rules, positions, tactics, player stories, and more.",
  keywords: [
    "learn football",
    "football for beginners",
    "football rules",
    "football tactics",
    "football positions",
    "football academy",
    "what is offside",
    "football glossary",
  ],
  authors: [{ name: "TacticSensei" }],
  openGraph: {
    title: "TacticSensei — Learn Football Tactics From Zero",
    description:
      "The easiest way for complete beginners to become knowledgeable football fans.",
    siteName: "TacticSensei",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TacticSensei — Learn Football Tactics From Zero",
    description:
      "The easiest way for complete beginners to become knowledgeable football fans.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
