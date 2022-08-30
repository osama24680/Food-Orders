import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
const Layout = ({ children }) => {
    return (
        <div>
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout
