import Head from "next/head"
import Link from "next/link"
import { motion } from "motion/react"
import styles from "../../styles/OrderDetails.module.css"
import { IconBox, IconCard, IconCheck, IconFlame, IconScooter } from "../../Components/Icons"
import Reveal from "../../Components/Reveal"
import { writeClient } from "../../lib/client"
import { formatPrice } from "../../lib/menu"

const ease = [0.22, 1, 0.36, 1]

export const getServerSideProps = async ({ params }) => {
    const order = await writeClient.fetch(`*[_type=="order" && _id == $id][0]`, { id: params.id })
    if (!order) return { notFound: true }
    return { props: { order } }
}

const stepsFor = (order) => [
    { icon: IconCard, label: "Payment", note: order.method === 0 ? "On delivery" : "Completed", done: order.method !== 0, active: false },
    { icon: IconFlame, label: "In the kitchen", note: order.status === 1 ? "Being prepared" : "Ready", done: order.status > 1, active: order.status === 1 },
    { icon: IconScooter, label: "On the way", note: order.status === 2 ? "Heading to you" : order.status > 2 ? "Arrived" : "Coming up", done: order.status > 2, active: order.status === 2 },
    { icon: IconBox, label: "Delivered", note: order.status >= 3 ? "Enjoy your meal" : "Coming up", done: order.status >= 3, active: false },
]

const OrderDetails = ({ order }) => {
    const steps = stepsFor(order)
    // The line reaches the step that is in progress
    const progress = Math.min(order.status, steps.length - 1) / (steps.length - 1)

    return (
        <div className="pageTop">
            <Head>
                <title>Your order | FoodAway</title>
            </Head>

            <motion.header
                className={styles.head}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
            >
                <span className="eyebrow">Order in progress</span>
                <h1>Thank you, <em>{order.name}.</em></h1>
                <p>Order ref. <code>{order._id.slice(-12)}</code></p>
            </motion.header>

            <div className={styles.timeline} style={{ "--progress": progress }}>
                <motion.div
                    className={styles.line}
                    initial={{ scaleX: 0, scaleY: 0 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.4, ease }}
                    aria-hidden="true"
                />
                {steps.map((step, index) => (
                    <motion.div
                        key={step.label}
                        className={styles.step}
                        data-done={step.done}
                        data-active={step.active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 + index * 0.13, ease }}
                    >
                        <div className={styles.dot}>{step.done ? <IconCheck size={22} /> : <step.icon size={22} />}</div>
                        <strong>{step.label}</strong>
                        <span>{step.note}</span>
                    </motion.div>
                ))}
            </div>

            <Reveal className={styles.card}>
                <dl className={styles.details}>
                    <div><dt>Customer</dt><dd>{order.name}</dd></div>
                    <div><dt>Phone</dt><dd>0{order.phone}</dd></div>
                    {order.address && <div><dt>Address</dt><dd>{order.address}</dd></div>}
                    <div><dt>Method</dt><dd>{order.method === 0 ? "Cash on delivery" : "Paid online"}</dd></div>
                    {order.total !== undefined && <div><dt>Total</dt><dd className={styles.total}>${formatPrice(order.total)}</dd></div>}
                </dl>

                {order.items?.length > 0 && (
                    <ul className={styles.items}>
                        {order.items.map((item) => (
                            <li key={item._key}>
                                <span>{item.quantity} × {item.name} <small>{item.size}</small></span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </Reveal>

            <div className={styles.back}>
                <Link href="/#menu" className="btn btnGhost">Back to the menu</Link>
            </div>
        </div>
    )
}

export default OrderDetails
