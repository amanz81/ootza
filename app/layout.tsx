import { AppProps } from 'next/app';
import Head from 'next/head';
import "./globals.css";

export const metadata = {
  title: "Ootza",
  description: "Share and discover life advice",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Varela+Round&family=Pacifico&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Component {...pageProps} />
      </body>
    </html>
  );
}
