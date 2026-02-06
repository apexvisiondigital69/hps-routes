import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Door-to-Door Route Manager",
  description: "Route management for door-to-door sales teams",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: '/android-chrome-512x512.png',
    apple: '/android-chrome-512x512.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Route Manager",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
