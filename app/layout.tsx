import type { Metadata } from "next"
import localFont from "next/font/local"
import "/styles/globals.scss"
import { Work_Sans } from "next/font/google"

const avenirNext = localFont({
  src: [
    {
      path: "./fonts/AvenirNextCyr-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/AvenirNextCyr-Demi.woff2",
      weight: "600",
    },
    {
      path: "./fonts/AvenirNextCyr-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-avenirNext",
})
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-workSans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "The number one LaaS brand empowering Africa.",
  openGraph: {
    title: "Lendsqr",
    description: "The number one LaaS brand empowering Africa.",
    images: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${avenirNext.variable} ${workSans.variable}`}>
      <body>
        <link rel="icon" href="/favicon.png" sizes="any" />
        {children}
      </body>
    </html>
  )
}
