import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Cashflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <body>
        <div className="mx-auto max-w-lg py-8">
          <h1 className="mb-8 text-center text-2xl font-bold">Mon Petit Cochon</h1>

          {children}
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  );
}
