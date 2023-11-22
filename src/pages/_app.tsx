import Head from "next/head";
import "../index.css";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { mockChromeAPI } from "../mocks/chrome";
import { isDevelopment } from "../services/environment";

if (isDevelopment()) {
    mockChromeAPI();
}

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />

                <title>New tab</title>
            </Head>
            <main className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </>
    );
}
