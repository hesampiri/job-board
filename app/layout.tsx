import Navbar from "@/components/navbar";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="flex-1 p-8">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
