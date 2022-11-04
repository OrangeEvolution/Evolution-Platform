import type { AppProps } from 'next/app'
import '../styles/globals.scss'

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<>
    <SessionProvider session={session}>
      <Head>
        <title>Orange Evolution</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  </>)
}
