import { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { AnimateSharedLayout } from 'framer-motion'
import { ThemeProvider } from 'styled-components'

import ContextProvider from '../hooks'
import store from '../store'
import GlobalStyles from '../styles/GlobalStyles'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dark, light } from '../styles/themes'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <ContextProvider>
          <ThemeProvider theme={dark}>
            <GlobalStyles />

            <AnimateSharedLayout>
              <Component {...pageProps} />
            </AnimateSharedLayout>
          </ThemeProvider>
        </ContextProvider>
      </ReduxProvider>
    </>
  )
}

export default MyApp
