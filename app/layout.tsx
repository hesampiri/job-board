import Navbar from "@/components/navbar";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import SessionProviderWraper from "./sessionProviderWraper";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <Head>
          <title>Jobly</title>
        </Head>
          <body>
        <SessionProviderWraper>
            <Navbar />
            <main className="flex-1 sm:p-8">{children}</main>
            <Toaster />
        </SessionProviderWraper>
          </body>
      </html>
    </StoreProvider>
  );
}
