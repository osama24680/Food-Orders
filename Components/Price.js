import { useEffect } from "react"
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react"
import { formatPrice } from "../lib/menu"

// A price that rolls to its new value instead of jumping
const Price = ({ value, className }) => {
    const reduce = useReducedMotion()
    const spring = useSpring(value, reduce ? { stiffness: 2000, damping: 200 } : { stiffness: 130, damping: 24 })
    const text = useTransform(spring, (current) => `$${formatPrice(current)}`)

    useEffect(() => {
        spring.set(value)
    }, [spring, value])

    return <motion.span className={className}>{text}</motion.span>
}

export default Price
