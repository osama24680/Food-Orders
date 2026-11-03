import { useEffect } from "react"
import { Fraunces, Manrope } from "next/font/google"
import { MotionConfig } from "motion/react"
import { Toaster } from "react-hot-toast"
import "../styles/globals.css"
import Layout from "../Components/Layout"
import { useAuth } from "../Store/useAuth"
import { useCart } from "../Store/useCart"

const display = Fraunces({
    subsets: ["latin"],
    style: ["normal", "italic"],
    axes: ["SOFT", "WONK", "opsz"],
    variable: "--font-display",
})
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const toastStyle = {
    background: "#1c1510",
    color: "#f5ecdd",
    border: "1px solid rgba(231, 197, 134, 0.42)",
    borderRadius: "999px",
    padding: "0.6rem 1.1rem",
    fontSize: "0.9rem",
}

function MyApp({ Component, pageProps }) {
    // Stores start empty so the first client render matches the server
    useEffect(() => {
        Promise.all([useAuth.persist.rehydrate(), useCart.persist.rehydrate()]).then(() => {
            useAuth.setState({ hydrated: true })
            useAuth.getState().verify()
        })
    }, [])

    return (
        <MotionConfig reducedMotion="user">
            <div className={`app ${display.variable} ${sans.variable}`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Toaster
                    position="bottom-center"
                    toastOptions={{ style: toastStyle, iconTheme: { primary: "#dcae5a", secondary: "#1c1510" } }}
                />
            </div>
        </MotionConfig>
    )
}

export default MyApp
