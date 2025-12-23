import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://laglivin.com"),
  title: "Laglivin",
  description: "No Labels",
  openGraph: {
    title: "No Labels",
    description: "Our curated gallery for you 💛",
    siteName: "No Labels",
    type: "website",
    images: [
      {
        url: "/share-logo.png",
        width: 1200,
        height: 630,
        alt: "No Labels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No Labels",
    description: "Our curated gallery for you 💛",
    images: ["/share-logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

