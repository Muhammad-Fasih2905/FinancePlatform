import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
export const metadata = {
  title: "Finance Platform Free finance education for everyone",
  description: "Free courses in microfinance and sustainable finance — microcredit, micro-savings, micro-insurance, micro-leasing, green energy, ESG and more.",
  keywords: "finance education, microfinance, sustainable finance, free courses, ESG, financial inclusion",
  authors: [{ name: "Finance Platform Demo" }],
  openGraph: {
    title: "Finance Platform Demo — Free finance education",
    description: "Learn microfinance and sustainable finance for free. Complete courses, earn certificates.",
    url: "https://your-domain.com",
    siteName: "Finance Platform Demo",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Platform Demo",
    description: "Free finance education for everyone.",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={poppins.className}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}