import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dostoevsky Mirror",
  description: "A literary mirror for people tired of shallow personality tests."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

