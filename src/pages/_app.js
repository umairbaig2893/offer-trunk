// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const baseUrl = "https://offertrunk.com";  // ← update to your production domain

  // Build canonical: strip any query string
  const canonicalUrl =
    router.asPath === "/"
      ? `${baseUrl}/`
      : `${baseUrl}${router.asPath.split("?")[0]}`;

  return (
    <>
      <Head>
        {/* Global robots policy */}
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />

        {/* Dynamic canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
