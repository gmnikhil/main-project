import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet"/>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Gloock&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Josefin+Sans:ital,wght@0,100;0,400;1,100&display=swap" rel="stylesheet" />
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
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
