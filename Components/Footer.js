import Link from "next/link"
import styles from "../styles/Footer.module.css"
import Reveal from "./Reveal"

const Footer = () => (
    <footer className={styles.footer}>
        <Reveal className={styles.top}>
            <p className={styles.tagline}>Faster than you think. <em>Better than you expect.</em></p>
            <nav className={styles.links} aria-label="Footer">
                <Link href="/#menu">Menu</Link>
                <Link href="/#ritual">The Ritual</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/login">Account</Link>
            </nav>
        </Reveal>
        <div className={styles.wordmark} aria-hidden="true">FoodAway</div>
        <div className={styles.bottom}>
            <span>© {new Date().getFullYear()} FoodAway. All rights reserved.</span>
            <span>My food. Your food. Our food.</span>
        </div>
    </footer>
)

export default Footer
