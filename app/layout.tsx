import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pearl Heights - AGK Infrastructures | Premium 3BHK Flats & Commercial Spaces",
  description: "Experience modern luxury at Pearl Heights by AGK Infrastructures. Offering premium 3BHK residential flats and strategic commercial spaces in Mitmita, Chhatrapati Sambhajinagar. Your dream home awaits in Aurangabad's finest mixed-use development.",
  keywords: "Pearl Heights, AGK Infrastructures, real estate Aurangabad, premium 3BHK flats, commercial property Chhatrapati Sambhajinagar, Mitmita apartments, luxury homes Aurangabad, real estate investment India",
  authors: [{ name: "AGK Infrastructures" }, { name: "Shaikh Faiz", url: "https://shaikhfaiz.top" }],
  creator: "Shaikh Faiz",
  publisher: "AGK Infrastructures",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Pearl Heights - Premium Living & Commercial Excellence",
    description: "Discover the perfect blend of luxury and convenience at Pearl Heights, Mitmita.",
    type: "website",
    url: "https://www.agkinfrastructures.com",
    locale: "en_IN",
    siteName: "Pearl Heights by AGK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pearl Heights - Premium 3BHK Flats",
    description: "Modern living at its best in Chhatrapati Sambhajinagar.",
  },
  verification: {
    google: "awDDThbrI-ZN_wjgldZVXgRyf6mA_FMajICtPICqTTM",
  },
  alternates: {
    canonical: "https://www.agkinfrastructures.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.agkinfrastructures.com/#organization",
      "name": "AGK Infrastructures",
      "url": "https://www.agkinfrastructures.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.agkinfrastructures.com/logo/agk-final-new.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 70205 15701",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.agkinfrastructures.com/#website",
      "url": "https://www.agkinfrastructures.com",
      "name": "AGK Infrastructures",
      "publisher": { "@id": "https://www.agkinfrastructures.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.agkinfrastructures.com/projects?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "RealEstateListing",
      "name": "Pearl Heights Premium Mixed-Use Development",
      "description": "Premium 3BHK flats and commercial spaces in Mitmita, Chhatrapati Sambhajinagar.",
      "url": "https://www.agkinfrastructures.com/projects",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mitmita",
        "addressLocality": "Chhatrapati Sambhajinagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431002",
        "addressCountry": "IN"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.agkinfrastructures.com" />
        <link rel="dns-prefetch" href="https://api.agkinfrastructures.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <ReduxProvider>
          <Toaster
            position="top-center"
            containerStyle={{
              zIndex: 99999,
              top: 80, // Offset to be below navbar but visible
            }}
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
                zIndex: 99999,
              },
              duration: 5000, // Show for 5 seconds by default
              success: {
                duration: 5000,
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 6000,
              },
            }}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
