import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";
import SessionProviderWrapper from "./sessionProviderWrapper";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Jobly — Discover Your Next Opportunity",
    template: "%s | Jobly",
  },
  description:
    "Browse thousands of jobs in tech, design, marketing, and more. Find your next opportunity with Jobly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen flex flex-col">
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex-1 sm:px-8 sm:py-10">{children}</main>
          <footer className="border-t border-hairline py-12 mt-16">
            <div className="container mx-auto px-6 text-center">
              <p className="text-ink-subtle text-xs">
                © {new Date().getFullYear()} Jobly. All rights reserved.
              </p>
            </div>
          </footer>
          <Toaster theme="dark" />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
