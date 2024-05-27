import type { Metadata } from "next";
import "./globals.css"
import { i18n } from "#/utils/i18nConfig";
import { getServerSession } from "next-auth";
import { authOptions } from "#/utils/authOptions";
import QueryProvider from "#/utils/QueryProvider";
import ThemesProvider from "#/theme/ThemesProvider";
import Header from "#/components/navbar/Header";
import ApplicantTracking from "#/components/navbar/ApplicantTracking";
import { NextAuthProvider } from "./providers";
import { Sarabun, Kanit } from "next/font/google";

const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: "--font-sarabun"
});

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ["300"],
  display: 'swap',
  variable: "--font-kanit"
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "CRM APP",
  description: "Sell Management System",
  // icons: {
  //   icon: '/Metadata/favicon.ico', // /public path
  // },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string }
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang={params.lang}>
      {/* <head>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head> */}
      <body
        className={`${sarabun.variable} ${kanit.variable} overflow-y-auto bg-ats-bg`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>
          <QueryProvider>
            <ThemesProvider>
              {session != null ? (
                <>
                  <Header />
                  <ApplicantTracking />
                  {children}
                </>
              ) : (
                children
              )}
            </ThemesProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
