import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: (() => {
    const raw =
      (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "").trim();
    const withScheme = raw
      ? raw.startsWith("http://") || raw.startsWith("https://")
        ? raw
        : `https://${raw}`
      : "https://laglivin.com";
    try {
      return new URL(withScheme);
    } catch {
      return new URL("https://laglivin.com");
    }
  })(),
  title: "Laglivin",
  description: "Our curated gallery for you💛",
  openGraph: {
    title: "Laglivin - No Labels.",
    description: "Our curated gallery for you💛",
    siteName: "Laglivin",
    type: "website",
    images: [
      {
        url: "/share-logo.png",
        width: 600,
        height: 600,
        alt: "Laglivin - No Labels.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laglivin - No Labels.",
    description: "Our curated gallery for you💛",
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

