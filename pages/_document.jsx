import Document, { Html, Head, Main, NextScript } from "next/document";
import Background from "../components/elements/Darkmode/Background";
import { getLangFromReq } from "../util/fromReq";
import { getCsp } from "../util/csp";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
    // return initialProps;
  }

  render() {
    return (
      <Html
        lang={this.props.lang}
        className="scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <Head>
          <meta
            name="Description"
            content="Build a PWA with Next.js to achieve 100 lighthouse score."
          ></meta>
          <meta name="theme-color" content="#317EFB" />
          <meta name="referrer" content={"strict-origin"} />
          <meta
          // httpEquiv="refresh"
            // httpEquiv="Content-Security-Policy"
            httpEquiv=""
            content={getCsp(NextScript.getInlineScriptSource(this.props))}
          />
          {/* <link rel="icon" type="image/x-icon" href="flex-ui-assets/logos/bamboobi.png" />
          <link rel="shortcut icon" type="image/x-icon" href="flex-ui-assets/logos/bamboobi.png" /> */}
          <link rel="manifest" href="/manifest.json" />
          {/* <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' /> */}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="flex-ui-assets/logos/Logo_bestech.png"
          />
          {/* <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
            crossOrigin="anonymous"
          ></link> */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        </Head>
        <Background>
          <Main />
          <NextScript />
        </Background>
      </Html>
    );
  }
}

export default MyDocument;
