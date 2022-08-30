import { useContext } from 'react'
import '../styles/globals.css'
import Layout from "../Components/Layout"
import { FoodContextProvider } from "../Store/ContextStore"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <FoodContextProvider>
      <SessionProvider  >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>

    </FoodContextProvider>


  )
}

export default MyApp
