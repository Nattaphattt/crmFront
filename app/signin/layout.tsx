import { NextAuthProvider } from "../providers";
import Header from "#/components/navbar/Header";

import "../globals.css";
import QueryProvider from "#/utils/QueryProvider";

export const metadata = {
  title: "ATS APP",
  description: "Outsouce Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll bg-ats-bg">
        <NextAuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
