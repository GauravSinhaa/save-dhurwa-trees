import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savedhurwatrees.org"),
  title: "Save Dhurwa Trees | A Digital Platform to Protect Ranchi's Urban Green Cover",
  description:
    "Fact-based civic platform documenting mature trees along the proposed Dhurwa to Naya Sarai road corridor in Ranchi, Jharkhand. Interactive tree map, environmental impact analysis, citizen reporting, and alternative road design advocacy.",
  keywords: [
    "Save Dhurwa Trees",
    "Ranchi tree conservation",
    "Dhurwa 10-lane road project",
    "Trees affected by road development in Ranchi",
    "Ranchi urban greenery",
    "Jharkhand tree conservation",
    "Tree-felling permissions in Ranchi",
  ],
  openGraph: {
    title: "Save Dhurwa Trees — Development Without Destruction",
    description:
      "Documenting and mapping trees potentially affected by the Dhurwa road corridor in Ranchi, Jharkhand. Explore alternatives and support tree preservation.",
    images: ["/images/hero_trees.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#fbfaf5] text-[#1c2826] font-sans selection:bg-[#2d6a4f] selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
