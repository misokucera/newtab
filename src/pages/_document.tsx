import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" />
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
            </Head>
            <body className="bg-gray-100 p-4 transition-colors dark:bg-slate-800">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
