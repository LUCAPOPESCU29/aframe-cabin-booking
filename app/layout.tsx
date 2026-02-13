import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import { NavHeader } from "@/components/navigation/nav-header";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The A-Frame | Luxury Cabin Retreat",
  description: "Two handcrafted A-frame cabins nestled deep in nature. Disconnect to reconnect. Experience premium forest retreats with modern amenities.",
  keywords: ["cabin rental", "a-frame cabin", "luxury retreat", "forest getaway", "nature escape"],
  openGraph: {
    title: "The A-Frame | Luxury Cabin Retreat",
    description: "Two handcrafted A-frame cabins nestled deep in nature. Disconnect to reconnect.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              <NavHeader />
              {children}
            </SmoothScrollProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
