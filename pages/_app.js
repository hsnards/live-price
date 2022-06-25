import '../styles/globals.css'
import {ThemeProvider} from "@mui/material";
import theme from "../components/theme"
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from "../components/cacheEmotionConfig/emotion-cache"

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
      <CacheProvider value={emotionCache}>
          <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
                 <Component {...pageProps} />
          </ThemeProvider>
      </CacheProvider>
    )

}

export default MyApp
