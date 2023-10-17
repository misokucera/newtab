import Head from "next/head";
import "../index.css";
import "tailwindcss/tailwind.css";

// TODO: add correct types
type Props = {
    Component: any;
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
            <Component {...pageProps} />
        </>
    );
}
