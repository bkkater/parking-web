import { Suspense } from "react";
import { Viewport, Metadata } from "next";
import { Open_Sans } from "next/font/google";

// Components
import Header from "@/components/Header";
import Notification from "@/components/Notification";

// Styles
import "@/styles/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Parking App",
};

export const viewport: Viewport = {
  themeColor: "#F2F2F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={openSans.variable}>
      <body className="flex min-h-screen flex-col bg-gray100 antialiased">
        <Header />

        <main className="container flex flex-1 flex-col px-2 py-10">
          <Suspense
            fallback={<Notification text="Carregando" type="loading" />}
          >
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
