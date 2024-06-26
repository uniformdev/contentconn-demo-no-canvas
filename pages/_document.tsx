import Document, { Head, Html, Main, NextScript } from "next/document";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { gtmId },
} = getConfig();

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon/favicon.png" rel="icon" />
          <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" />
          <link
            href="/favicon/apple-touch-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
          />
          <link
            href="/favicon/apple-touch-icon-114x114.png"
            rel="apple-touch-icon"
            sizes="114x114"
          />
          <link href="/favicon/icon-192x192.png" rel="icon" sizes="192x192" />
          <meta
            name="description"
            content="UniformConf, a Uniform content demo site"
          />

          <script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
          />
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${gtmId}');
          `,
            }}
          ></script>
        </Head>
        <body className="leading-normal tracking-normal text-white gradient">
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
