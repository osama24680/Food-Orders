import { useEffect, useState } from "react"
import Link from "next/link"
import Router from "next/router"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import styles from "../styles/Header.module.css"
import { useAuth } from "../Store/useAuth"
import { cartCount, useCart } from "../Store/useCart"
import { IconBag, IconLogout, IconReceipt } from "./Icons"

const ease = [0.22, 1, 0.36, 1]

const initialsOf = (name = "") =>
    name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("")

const Header = () => {
    const user = useAuth((state) => state.user)
    const logout = useAuth((state) => state.logout)
    const count = useCart((state) => cartCount(state.items))
    const lastOrderId = useCart((state) => state.lastOrderId)

    const [compact, setCompact] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)

    const { scrollY, scrollYProgress } = useScroll()

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        setCompact(current > 40)
        setHidden(current > 500 && current > previous)
    })

    useEffect(() => {
        const close = () => {
            setMenuOpen(false)
            setUserOpen(false)
        }
        Router.events.on("routeChangeStart", close)
        return () => Router.events.off("routeChangeStart", close)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    function handleLogout() {
        logout()
        Router.push("/")
    }

    const links = [
        { href: "/#menu", label: "Menu" },
        { href: "/#ritual", label: "The Ritual" },
        ...(lastOrderId ? [{ href: `/order/${lastOrderId}`, label: "My Order" }] : []),
    ]

    return (
        <>
            <motion.header
                className={styles.header}
                data-compact={compact}
                animate={{ y: hidden && !menuOpen ? "-130%" : "0%" }}
                transition={{ duration: 0.5, ease }}
            >
                <div className={styles.bar}>
                    <Link href="/" className={styles.logo} aria-label="FoodAway home">
                        <span className={styles.mark} aria-hidden="true">F</span>
                        <span>FoodAway</span>
                    </Link>

                    <nav className={styles.links} aria-label="Main">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                    </nav>

                    <div className={styles.actions}>
                        {lastOrderId && (
                            <Link href={`/order/${lastOrderId}`} className={`${styles.iconBtn} ${styles.orderBtn}`} aria-label="Track my order">
                                <IconReceipt />
                            </Link>
                        )}

                        <Link href="/cart" className={styles.iconBtn} data-cart-target aria-label={`Cart, ${count} items`}>
                            <IconBag />
                            <AnimatePresence>
                                {count > 0 && (
                                    <motion.span
                                        key={count}
                                        className={styles.badge}
                                        initial={{ scale: 0.3 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 16 }}
                                    >
                                        {count}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {user ? (
                            <div className={styles.user}>
                                <button
                                    className={styles.avatar}
                                    onClick={() => setUserOpen((open) => !open)}
                                    aria-expanded={userOpen}
                                    aria-label={`Account menu for ${user.name}`}
                                >
                                    {initialsOf(user.name)}
                                </button>
                                <AnimatePresence>
                                    {userOpen && (
                                        <motion.div
                                            className={styles.userMenu}
                                            initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                            transition={{ duration: 0.25, ease }}
                                        >
                                            <strong>{user.name}</strong>
                                            <span>{user.email}</span>
                                            <button onClick={handleLogout}><IconLogout size={18} /> Log out</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.signIn}>Sign in</Link>
                        )}

                        <button
                            className={styles.burger}
                            data-open={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            <span />
                            <span />
                        </button>
                    </div>

                    <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} aria-hidden="true" />
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className={styles.overlay}
                        aria-label="Mobile"
                        initial={{ clipPath: "circle(0% at 92% 4%)" }}
                        animate={{ clipPath: "circle(150% at 92% 4%)" }}
                        exit={{ clipPath: "circle(0% at 92% 4%)" }}
                        transition={{ duration: 0.7, ease }}
                    >
                        {[...links, ...(user ? [] : [{ href: "/login", label: "Sign in" }]), { href: "/cart", label: "Cart" }].map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 34 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.07, duration: 0.7, ease }}
                            >
                                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                                    <small>0{index + 1}</small> {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
