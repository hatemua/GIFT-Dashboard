import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "GIFT Platform - Gold International Fast Transfer",
  description:
    "Enterprise blockchain-based gold transaction and traceability system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
