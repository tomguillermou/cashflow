import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon Petit Banquier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="h-screen bg-neutral-100">
        <div className="bg-base-100 flex h-screen max-w-xl flex-col gap-8 p-4">
          <Link href="/">
            <h1 className="text-center text-2xl font-bold">Mon Petit Banquier</h1>
          </Link>

          {children}
        </div>

        <Analytics />
      </body>
    </html>
  );
}
