import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <body className="transition-colors dark:bg-slate-800">
                <Script
                    id="theme"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: "if (localStorage?.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {document.documentElement.classList.add('dark');} else {document.documentElement.classList.remove('dark');}",
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
