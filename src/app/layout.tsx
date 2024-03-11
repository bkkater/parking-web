import { Open_Sans } from "next/font/google";

// Components
import Header from "@/components/Header";

// Styles
import "@/styles/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata = {
  title: "Parking App",
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
          {children}
        </main>
      </body>
    </html>
  );
}
