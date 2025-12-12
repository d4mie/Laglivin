import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Laglivin Store",
  description: "Laglivin — Volume 2: In the Making. A curated magazine experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}

