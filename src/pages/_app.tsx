import Head from "next/head";
import "../index.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

type Props = AppProps & {
    Component: NextPage;
    pageProps: any;
};

export default function App({ Component, pageProps }: Props) {
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
