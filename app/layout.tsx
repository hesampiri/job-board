import Navbar from "@/components/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <Navbar/>
          <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
