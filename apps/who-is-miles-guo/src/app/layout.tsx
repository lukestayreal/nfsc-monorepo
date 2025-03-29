import { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin | My Blog",
  description:
    "Stay informed with product updates, company news, and insights on how to sell smarter at your company.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
