import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import styles from "../styles/Services.module.css"
import ritual1 from "../assets/ritual-1.webp"
import ritual2 from "../assets/ritual-2.webp"
import ritual3 from "../assets/ritual-3.webp"
import Reveal from "./Reveal"

const STEPS = [
    { image: ritual1, title: "Choose", text: "A few steps are all it takes. Pick a dish, pick a size, and we take it from there." },
    { image: ritual2, title: "We fire it", text: "Made fresh the moment you order. Nothing waits under a lamp, nothing leaves lukewarm." },
    { image: ritual3, title: "At your door", text: "Delivery that always arrives on time, often sooner, and never costs you a thing." },
]

const Step = ({ step, index }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

    return (
        <Reveal delay={index * 0.12} className={styles.step}>
            <div className={styles.arch} ref={ref}>
                <motion.div className={styles.photo} style={{ y }}>
                    <Image src={step.image} alt="" fill sizes="(max-width: 820px) 90vw, 30vw" placeholder="blur" />
                </motion.div>
                <span className={styles.number}>{index + 1}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
        </Reveal>
    )
}

const Services = () => (
    <section id="ritual" className={styles.section}>
        <Reveal className={styles.heading}>
            <span className="eyebrow">The ritual</span>
            <h2>Your favourite food, <em>delivered like an occasion.</em></h2>
        </Reveal>
        <div className={styles.steps}>
            {STEPS.map((step, index) => (
                <Step key={step.title} step={step} index={index} />
            ))}
        </div>
    </section>
)

export default Services
