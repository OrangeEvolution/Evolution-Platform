import type { AppProps } from 'next/app'
import '../styles/globals.scss'

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<>
    <SessionProvider session={session}>
      <Head>
        <title>Orange Evolution</title>
      </Head>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </SessionProvider>
  </>)
}
