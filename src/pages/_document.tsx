import { Html, Head, Main, NextScript } from "next/document";

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
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
