import { useRef, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { LayoutGroup, motion } from "motion/react"
import toast from "react-hot-toast"
import styles from "../../styles/singleItem.module.css"
import { IconArrow, IconMinus, IconPlus } from "../../Components/Icons"
import DishCard from "../../Components/DishCard"
import Price from "../../Components/Price"
import Reveal from "../../Components/Reveal"
import { client } from "../../lib/client"
import { flyToCart } from "../../lib/flyToCart"
import { sanityLoader, urlFor } from "../../lib/image"
import { dishDetails, dishName, SIZES, typeLabel } from "../../lib/menu"
import { useCart } from "../../Store/useCart"

const ease = [0.22, 1, 0.36, 1]
const FIELDS = `_id, name, type, price, details, image, "slug": slug.current`

export const getStaticPaths = async () => {
    const paths = await client.fetch(`*[_type=="pizza" && defined(slug.current)][].slug.current`)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: "blocking",
    }
}

export const getStaticProps = async ({ params }) => {
    const dish = await client.fetch(`*[_type=="pizza" && slug.current == $slug][0]{${FIELDS}}`, { slug: params.slug })
    if (!dish) return { notFound: true, revalidate: 60 }

    const pairings = await client.fetch(
        `*[_type=="pizza" && type != $type && defined(slug.current)] | order(_id desc)[0...3]{${FIELDS}}`,
        { type: dish.type }
    )
    return { props: { dish, pairings }, revalidate: 60 }
}

const PizzaItem = ({ dish, pairings }) => {
    const add = useCart((state) => state.add)
    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1)
    const imageRef = useRef(null)
    const name = dishName(dish.name)
    const src = urlFor(dish.image).url()

    function addToCart() {
        flyToCart(imageRef.current)
        add({
            _id: dish._id,
            name: dish.name,
            slug: dish.slug,
            type: dish.type,
            image: dish.image,
            price: dish.price[size],
            size,
            quantity,
        })
        toast.success(`${name} added to your cart`)
    }

    return (
        <div className="pageTop">
            <Head>
                <title>{`${name} | FoodAway`}</title>
                <meta name="description" content={dishDetails(dish)} />
            </Head>

            <div className={styles.layout}>
                <motion.div
                    className={styles.stage}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease }}
                >
                    <div className={styles.halo} aria-hidden="true" />
                    <div className={styles.arch} data-type={dish.type} ref={imageRef}>
                        <Image loader={sanityLoader} src={src} alt={name} fill priority sizes="(max-width: 900px) 90vw, 45vw" />
                    </div>
                </motion.div>

                <motion.div
                    className={styles.info}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease }}
                >
                    <Link href="/#menu" className={styles.back}><IconArrow size={16} /> Back to the menu</Link>
                    <span className="eyebrow">{typeLabel(dish.type)}</span>
                    <h1>{name}</h1>
                    <p className={styles.details}>{dishDetails(dish)}</p>

                    <Price className={styles.price} value={dish.price[size] * quantity} />

                    <div className={styles.option}>
                        <span>Size</span>
                        <LayoutGroup id="dish-size">
                            <div className={styles.sizes} role="group" aria-label="Choose a size">
                                {SIZES.map((label, index) => (
                                    <button
                                        key={label}
                                        className={styles.size}
                                        data-active={size === index}
                                        aria-pressed={size === index}
                                        onClick={() => setSize(index)}
                                    >
                                        {size === index && (
                                            <motion.span
                                                layoutId="sizeThumb"
                                                className={styles.sizeThumb}
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            />
                                        )}
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </LayoutGroup>
                    </div>

                    <div className={styles.option}>
                        <span>Quantity</span>
                        <div className={styles.counter}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="One less"><IconMinus size={18} /></button>
                            <motion.span
                                key={quantity}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease }}
                                aria-live="polite"
                            >
                                {quantity}
                            </motion.span>
                            <button onClick={() => setQuantity(Math.min(50, quantity + 1))} aria-label="One more"><IconPlus size={18} /></button>
                        </div>
                    </div>

                    <button className={`btn ${styles.add}`} onClick={addToCart}>
                        Add to cart <IconArrow size={18} />
                    </button>
                </motion.div>
            </div>

            {pairings.length > 0 && (
                <section className={styles.pairings}>
                    <Reveal>
                        <span className="eyebrow">Pairs well with</span>
                    </Reveal>
                    <div className={styles.pairingGrid}>
                        {pairings.map((pairing, index) => (
                            <Reveal key={pairing._id} delay={index * 0.08}>
                                <DishCard dish={pairing} index={index} />
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default PizzaItem
