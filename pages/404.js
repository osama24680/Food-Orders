import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Auth.module.css"
import { IconArrow } from "../Components/Icons"

export default function NotFound() {
    return (
        <div className={`pageTop ${styles.narrow}`}>
            <Head>
                <title>Page not found | FoodAway</title>
            </Head>
            <span className="eyebrow">404</span>
            <h1 className={styles.title}>This table <em>doesn&apos;t exist.</em></h1>
            <p className={styles.sub}>The page you are looking for has left the kitchen.</p>
            <Link href="/" className="btn">Back to FoodAway <IconArrow size={18} /></Link>
        </div>
    )
}
