import { motion } from "motion/react"

// Fades content up the first time it scrolls into view
const Reveal = ({ children, delay = 0, y = 28, className }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
)

export default Reveal
