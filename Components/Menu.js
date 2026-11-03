import { useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import styles from "../styles/Menu.module.css"
import { CATEGORIES } from "../lib/menu"
import DishCard from "./DishCard"
import Reveal from "./Reveal"

const ease = [0.22, 1, 0.36, 1]

const Menu = ({ dishes }) => {
    const [chosen, setChosen] = useState("all")
    const visible = chosen === "all" ? dishes : dishes.filter((dish) => dish.type === chosen)

    return (
        <section id="menu" className={styles.section}>
            <div className={styles.heading}>
                <Reveal>
                    <span className="eyebrow">The menu</span>
                    <h2>A menu that always makes you <em>fall in love.</em></h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <LayoutGroup id="menu-filters">
                        <div className={styles.filters} role="group" aria-label="Filter the menu">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.value}
                                    className={styles.filter}
                                    data-active={chosen === category.value}
                                    aria-pressed={chosen === category.value}
                                    onClick={() => setChosen(category.value)}
                                >
                                    {chosen === category.value && (
                                        <motion.span
                                            layoutId="activeFilter"
                                            className={styles.filterThumb}
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className={styles.filterLabel}>{category.label}</span>
                                </button>
                            ))}
                        </div>
                    </LayoutGroup>
                </Reveal>
            </div>

            {dishes.length === 0 ? (
                <p className={styles.empty}>The menu is resting for a moment. Please refresh in a little while.</p>
            ) : (
                <motion.div layout className={styles.grid}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((dish, index) => (
                            <motion.div
                                key={dish._id}
                                layout
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.55, ease }}
                            >
                                <Reveal y={36} delay={(index % 4) * 0.07}>
                                    <DishCard dish={dish} index={dishes.indexOf(dish)} />
                                </Reveal>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    )
}

export default Menu
