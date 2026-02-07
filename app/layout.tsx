import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Tran Danh Thuc - Frontend Developer Portfolio",
  description: "Portfolio of Tran Danh Thuc, a passionate Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. View my projects and get in touch.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Web Developer", "Portfolio", "Tran Danh Thuc"],
  authors: [{ name: "Tran Danh Thuc" }],
  openGraph: {
    title: "Tran Danh Thuc - Frontend Developer",
    description: "Passionate Frontend Developer building beautiful and responsive websites",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
