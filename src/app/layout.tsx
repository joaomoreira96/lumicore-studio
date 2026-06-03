import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumicore Studio",
  description:
    "Premium digital product studio building software, websites and interactive experiences.",
  icons: {
    icon: "/LumicoreStudioSuperMinimalistLogo.png",
    apple: "/LumicoreStudioSuperMinimalistLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-lumi-bg text-lumi-text">
        {children}
      </body>
    </html>
  );
}
