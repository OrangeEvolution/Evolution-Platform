import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta name="title" content="Orange Evolution" />
          <meta
            name="description"
            content="Explore conhecimentos que estão transformando indústrias, negócios e vidas através de trilhas gratuitas em Desenvolvimento, UX/UI Design e QA!"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
