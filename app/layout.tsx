import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIFT Platform - Gold International Fast Transfer",
  description: "Enterprise blockchain-based gold transaction and traceability system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
