import "../styles/globals.css";
import Head from "next/head";
// import Script from "next/script";
// import { Provider } from "react-redux";
// import { useStore } from "../store";
import { wrapper } from "../redux/store";
function MyApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);
  return (
    // <Provider store={store}>
    <>
      <Head>
        <title>Bestech SaaS</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="This websit is very good and very for any company"
        />
        <meta
          name="author"
          content="This websit is very good and very for any users"
        />
      </Head>
      {/*  <Script
        src="js/humberger.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      ></Script>
      <Script
        src="js/backtotop.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      ></Script>
        <Script
        src="js/preloader.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      ></Script> */}
      <Component {...pageProps} />
    </>
    // </Provider>
  );
}
export default wrapper.withRedux(MyApp);
