import type { Metadata } from "next";
import { Geist, Geist_Mono, Poetsen_One,} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";

import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poetsenOne = Poetsen_One({
    variable: "--font-poetsen-one",
    subsets: ["latin"],
    weight: ["400"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://godux.vercel.app/"), 
    title: "godux",
    description:
        "Git-like experience for research paper writing, powered by Chrome's built-in AI. Official entry to Google Chrome Built-in AI Challenge 2025.",
    openGraph: {
        title: "godux",
        description:
            "Git-like experience for research paper writing, powered by Chrome's built-in AI. Official entry to Google Chrome Built-in AI Challenge 2025.",
        siteName: "godux",
        images: [
            {
                url: "/godux-logo.png",
                width: 1200,
                height: 630,
                alt: "godux Open Graph Image",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    icons: {
        icon: "/godux-logo.png",
        shortcut: "/godux-logo.png",
        apple: "/godux-logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${poetsenOne.variable}  antialiased text-sm`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextTopLoader />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
