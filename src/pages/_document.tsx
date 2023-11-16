import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="preload"
                    as="script"
                    href="theme.js"
                    crossOrigin=""
                />
                <script
                    type="text/javascript"
                    src="theme.js"
                    crossOrigin=""
                ></script>
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
