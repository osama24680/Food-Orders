import Image from "next/image"
import { motion } from "motion/react"
import styles from "../styles/Auth.module.css"
import photo from "../assets/auth-1.webp"

const ease = [0.22, 1, 0.36, 1]

const AuthShell = ({ eyebrow, title, subtitle, children }) => (
    <div className={styles.shell}>
        <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
        >
            <Image src={photo} alt="" fill priority sizes="(max-width: 900px) 0px, 50vw" placeholder="blur" />
            <p>My food. Your food. <em>Our food.</em></p>
        </motion.div>
        <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
        >
            <span className="eyebrow">{eyebrow}</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.sub}>{subtitle}</p>
            {children}
        </motion.div>
    </div>
)

export default AuthShell
