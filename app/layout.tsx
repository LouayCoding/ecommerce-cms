import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benny's Fashion - E-Commerce",
  description: "Luxury fashion e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
