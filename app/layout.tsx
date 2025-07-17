import "./globals.css";

import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";

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
        <div className="bg-base-100 flex h-screen max-w-xl flex-col gap-4 p-8">
          <h1 className="text-center text-2xl font-bold">Mon Petit Banquier</h1>

          {children}
        </div>

        <Analytics />
      </body>
    </html>
  );
}
