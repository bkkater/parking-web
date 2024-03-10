// Components
import Header from "@/components/Header";

// Styles
import "@/styles/globals.css";

export const metadata = {
  title: "Parking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />

        {children}
      </body>
    </html>
  );
}
