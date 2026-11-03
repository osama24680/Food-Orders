import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en" data-scroll-behavior="smooth">
            <Head>
                <meta name="theme-color" content="#0e0a07" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
