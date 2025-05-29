import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

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
    <html lang="fr-FR">
      <body>
        <div className="mx-auto max-w-lg p-8 md:px-0">
          <h1 className="mb-8 text-center text-2xl font-bold">Mon Petit Banquier</h1>

          {children}
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  );
}
