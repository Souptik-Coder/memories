import Header from '../components/Header'
import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Router } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)

  Router.events.on('loadStart', () => setProgress(40))
  Router.events.on('loadEnd', () => setProgress(100))
  Router.events.on('routeChangeStart', () => setProgress(40));
  Router.events.on('routeChangeComplete', () => setProgress(100));
  Router.events.on('routeChangeError', () => setProgress(100));

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2d336b'
      }
    },
  })
  return (
    <>
    <div className='main-wrapper'/>
      <LoadingBar
        color='#42a5f5'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
export default MyApp
