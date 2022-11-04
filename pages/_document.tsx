import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="title" content="Orange Evolution" />
                    <meta name="description" content="Explore conhecimentos que estão transformando indústrias, negócios e vidas através de trilhas gratuitas em Desenvolvimento, UX/UI Design e QA!" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}