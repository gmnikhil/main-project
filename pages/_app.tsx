import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Head from "next/head";
import AuthContextProvider from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Main Project</title>
      </Head>
      <MantineProvider
      // theme={{
      //   // Override any other properties from default theme
      //   fontFamily: "DM Sans, Open Sans, sans serif",
      //   spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      // }}
      >
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
