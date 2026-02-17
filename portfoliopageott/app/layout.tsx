import type { Metadata } from "next";
import { Science_Gothic } from "next/font/google";
import "./globals.css";

const scienceGothic = Science_Gothic({
  variable: "--font-science-gothic",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Ott Allik - Portfolio",
  description: "Portfolio of Ott Allik - Developer, Designer, Innovator, and Film Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${scienceGothic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
