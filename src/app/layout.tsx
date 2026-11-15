import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katalog Store - Template Belajar CRUD + PATCH Next.js",
  description:
    "Template pembelajaran interaktif Next.js App Router dengan implementasi lengkap CRUD dan PATCH.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
