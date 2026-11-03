import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import styles from "../styles/Modal.module.css"
import { IconClose } from "./Icons"

const ease = [0.22, 1, 0.36, 1]
const FOCUSABLE = "a[href], button:not([disabled]), input, textarea"

const Modal = ({ opened, onClose, title, children }) => {
    const dialogRef = useRef(null)

    useEffect(() => {
        if (!opened) return
        const previous = document.activeElement
        document.body.style.overflow = "hidden"
        dialogRef.current?.querySelector("input, textarea")?.focus()

        function handleKeyDown(e) {
            if (e.key === "Escape") onClose()
            if (e.key !== "Tab" || !dialogRef.current) return
            const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
            previous?.focus?.()
        }
    }, [opened, onClose])

    return (
        <AnimatePresence>
            {opened && (
                <motion.div
                    className={styles.backdrop}
                    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        ref={dialogRef}
                        className={styles.dialog}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        initial={{ y: 60, opacity: 0, scale: 0.97 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                    >
                        <div className={styles.head}>
                            <h2>{title}</h2>
                            <button onClick={onClose} className={styles.close} aria-label="Close"><IconClose /></button>
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
