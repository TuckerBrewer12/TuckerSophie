import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "for Sophie",
  description: "a little record of everything we've said",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
