import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ToastProvider } from "@/providers/toast-provider";

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
          <ToastProvider>{children}</ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
