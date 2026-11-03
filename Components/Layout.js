import { useRouter } from "next/router"
import { motion } from "motion/react"
import Header from "./Header"
import Footer from "./Footer"
import PageCurtain from "./PageCurtain"

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <>
            <a href="#content" className="skipLink">Skip to content</a>
            <Header />
            <motion.main
                id="content"
                key={router.pathname === "/order/[id]" || router.pathname === "/pizza/[slug]" ? router.asPath : router.pathname}
                className="pageMain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>
            <Footer />
            <PageCurtain />
        </>
    )
}

export default Layout
