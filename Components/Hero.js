import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import styles from "../styles/Hero.module.css"
import plate from "../assets/hero-plate.webp"
import { dishName, formatPrice } from "../lib/menu"
import { IconArrow, IconScooter } from "./Icons"

const ease = [0.22, 1, 0.36, 1]
const LINES = [["My", "food."], ["Your", "food."], ["Our", "food."]]
const RING_TEXT = "FOODAWAY  ✦  FIRED WITH CARE  ✦  DELIVERED WITH SPEED  ✦  "

const Hero = ({ featured }) => {
    const pointerX = useMotionValue(0)
    const pointerY = useMotionValue(0)
    const x = useSpring(pointerX, { stiffness: 60, damping: 18 })
    const y = useSpring(pointerY, { stiffness: 60, damping: 18 })
    const plateX = useTransform(x, (v) => v * 22)
    const plateY = useTransform(y, (v) => v * 22)
    const cardX = useTransform(x, (v) => v * -38)
    const cardY = useTransform(y, (v) => v * -38)

    function handlePointerMove(e) {
        if (e.pointerType !== "mouse") return
        const rect = e.currentTarget.getBoundingClientRect()
        pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
        pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    return (
        <section className={styles.hero} onPointerMove={handlePointerMove}>
            <div className={styles.glow} aria-hidden="true" />

            <div className={styles.copy}>
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                >
                    Faster than you think
                </motion.span>

                <h1 className={styles.title} aria-label="My food. Your food. Our food.">
                    {LINES.map(([first, second], index) => (
                        <span key={first} className={styles.lineMask} aria-hidden="true">
                            <motion.span
                                className={styles.line}
                                initial={{ y: "110%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 1.1, delay: 0.2 + index * 0.13, ease }}
                            >
                                <em>{first}</em> {second}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    className={styles.lead}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.75, ease }}
                >
                    Wood-fired pizzas, towering burgers and ice-cold drinks. Our mission is simple:
                    fill your table with something delicious, with free and fast delivery.
                </motion.p>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease }}
                >
                    <Link href="/#menu" className="btn">Explore the menu <IconArrow size={18} /></Link>
                    <Link href="/#ritual" className="btn btnGhost">How it works</Link>
                </motion.div>
            </div>

            <div className={styles.stage}>
                <motion.div
                    className={styles.plateWrap}
                    style={{ x: plateX, y: plateY }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.6, delay: 0.1, ease }}
                >
                    <svg className={styles.ring} viewBox="0 0 400 400" aria-hidden="true">
                        <defs>
                            <path id="heroRing" d="M200,200 m-182,0 a182,182 0 1,1 364,0 a182,182 0 1,1 -364,0" />
                        </defs>
                        <text>
                            <textPath href="#heroRing" textLength="1130">{RING_TEXT}</textPath>
                        </text>
                    </svg>
                    <div className={styles.plate}>
                        <Image src={plate} alt="A top-down pizza with sausage, olives and mushrooms" fill priority sizes="(max-width: 900px) 70vw, 34vw" />
                    </div>
                </motion.div>

                {featured && (
                    <motion.div
                        className={styles.floatCard}
                        style={{ x: cardX, y: cardY }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1, ease }}
                    >
                        <Link href={`/pizza/${featured.slug}`}>
                            <span>Tonight&apos;s pick</span>
                            <strong>{dishName(featured.name)}</strong>
                            <em>${formatPrice(featured.price[1])}</em>
                        </Link>
                    </motion.div>
                )}

                <motion.div
                    className={styles.floatChip}
                    style={{ x: plateX, y: cardY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.15, ease }}
                >
                    <IconScooter size={22} />
                    <span>Free delivery<small>on every order</small></span>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
