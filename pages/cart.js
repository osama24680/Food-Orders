import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "motion/react"
import toast from "react-hot-toast"
import styles from "../styles/Cart.module.css"
import { IconArrow, IconCard, IconClose, IconMinus, IconPlus, IconSpinner } from "../Components/Icons"
import Modal from "../Components/Modal"
import OrderForm from "../Components/OrderForm"
import Price from "../Components/Price"
import { sanityLoader, urlFor } from "../lib/image"
import { dishName, formatPrice, SIZES } from "../lib/menu"
import { createOrder, startCheckout } from "../lib/orderHandler"
import { getErrorMessage, useAuth } from "../Store/useAuth"
import { cartCount, cartTotal, useCart } from "../Store/useCart"

const ease = [0.22, 1, 0.36, 1]

const Cart = () => {
    const router = useRouter()
    const hydrated = useAuth((state) => state.hydrated)
    const token = useAuth((state) => state.token)
    const items = useCart((state) => state.items)
    const setQuantity = useCart((state) => state.setQuantity)
    const remove = useCart((state) => state.remove)
    const completeOrder = useCart((state) => state.completeOrder)

    const [codOpen, setCodOpen] = useState(false)
    const [paying, setPaying] = useState(false)

    const total = cartTotal(items)

    function requireLogin() {
        if (token) return true
        toast("Sign in to place your order")
        router.push("/login?next=/cart")
        return false
    }

    function handleDelivery() {
        if (requireLogin()) setCodOpen(true)
    }

    async function handleOnline() {
        if (!requireLogin()) return
        setPaying(true)
        try {
            window.location.assign(await startCheckout(items))
        } catch (error) {
            toast.error(getErrorMessage(error))
            setPaying(false)
        }
    }

    async function placeOrder(details) {
        const id = await createOrder({ details, items, method: 0, token })
        await router.push(`/order/${id}`)
        completeOrder(id)
        toast.success("Your order is on its way to the kitchen")
    }

    return (
        <div className="pageTop">
            <Head>
                <title>Your cart | FoodAway</title>
            </Head>

            <motion.header
                className={styles.pageHead}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
            >
                <span className="eyebrow">Your table</span>
                <h1>The <em>cart.</em></h1>
            </motion.header>

            {!hydrated ? (
                <div className={styles.loading} aria-label="Loading your cart"><IconSpinner size={28} /></div>
            ) : items.length === 0 ? (
                <motion.div
                    className={styles.empty}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                >
                    <div className={styles.emptyPlate} aria-hidden="true" />
                    <h2>This plate is still empty.</h2>
                    <p>Pick something delicious and it will wait for you here.</p>
                    <Link href="/#menu" className="btn">Explore the menu <IconArrow size={18} /></Link>
                </motion.div>
            ) : (
                <div className={styles.layout}>
                    <ul className={styles.items}>
                        <AnimatePresence initial={false}>
                            {items.map((item) => {
                                const name = dishName(item.name)
                                return (
                                    <motion.li
                                        key={`${item._id}-${item.size}`}
                                        layout
                                        className={styles.item}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease }}
                                    >
                                        <Link href={`/pizza/${item.slug}`} className={styles.thumb} data-type={item.type} aria-label={name}>
                                            <Image loader={sanityLoader} src={urlFor(item.image).url()} alt="" fill sizes="110px" />
                                        </Link>
                                        <div className={styles.itemInfo}>
                                            <h2>{name}</h2>
                                            <span>{SIZES[item.size]} · ${formatPrice(item.price)} each</span>
                                        </div>
                                        <div className={styles.stepper}>
                                            <button onClick={() => setQuantity(item._id, item.size, item.quantity - 1)} aria-label={`One less ${name}`}><IconMinus size={16} /></button>
                                            <span aria-live="polite">{item.quantity}</span>
                                            <button onClick={() => setQuantity(item._id, item.size, Math.min(50, item.quantity + 1))} aria-label={`One more ${name}`}><IconPlus size={16} /></button>
                                        </div>
                                        <Price className={styles.itemTotal} value={item.price * item.quantity} />
                                        <button className={styles.remove} onClick={() => remove(item._id, item.size)} aria-label={`Remove ${name}`}>
                                            <IconClose size={18} />
                                        </button>
                                    </motion.li>
                                )
                            })}
                        </AnimatePresence>
                    </ul>

                    <motion.aside
                        className={styles.bill}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                    >
                        <h2>The bill</h2>
                        <dl>
                            <div><dt>Items</dt><dd>{cartCount(items)}</dd></div>
                            <div><dt>Delivery</dt><dd>Free</dd></div>
                            <div className={styles.total}><dt>Total</dt><dd><Price value={total} /></dd></div>
                        </dl>
                        <button className="btn" onClick={handleDelivery}>Pay on delivery <IconArrow size={18} /></button>
                        <button className="btn btnGhost" onClick={handleOnline} disabled={paying}>
                            {paying ? <IconSpinner size={18} /> : <><IconCard size={18} /> Pay online</>}
                        </button>
                    </motion.aside>
                </div>
            )}

            <Modal opened={codOpen} onClose={() => setCodOpen(false)} title="Delivery details">
                <OrderForm
                    note={<>You will pay <strong>${formatPrice(total)}</strong> on delivery.</>}
                    submitLabel="Place order"
                    onSubmit={placeOrder}
                />
            </Modal>
        </div>
    )
}

export default Cart
