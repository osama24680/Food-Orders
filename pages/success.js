import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { motion } from "motion/react"
import toast from "react-hot-toast"
import styles from "../styles/Auth.module.css"
import { IconCheck } from "../Components/Icons"
import OrderForm from "../Components/OrderForm"
import { createOrder } from "../lib/orderHandler"
import { useAuth } from "../Store/useAuth"
import { useCart } from "../Store/useCart"

const Success = () => {
    const router = useRouter()
    const hydrated = useAuth((state) => state.hydrated)
    const token = useAuth((state) => state.token)
    const sessionId = router.query.session_id

    useEffect(() => {
        if (!router.isReady || !hydrated) return
        if (!sessionId) router.replace("/cart")
        else if (!token) router.replace(`/login?next=${encodeURIComponent(router.asPath)}`)
    }, [router, hydrated, sessionId, token])

    async function placeOrder(details) {
        const { items, completeOrder } = useCart.getState()
        const id = await createOrder({ details, items, method: 1, sessionId, token })
        await router.push(`/order/${id}`)
        completeOrder(id)
        toast.success("Payment received. Your order is on its way to the kitchen")
    }

    return (
        <div className={`pageTop ${styles.narrow}`}>
            <Head>
                <title>Payment received | FoodAway</title>
            </Head>
            <motion.div
                className={styles.tick}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
                <IconCheck size={30} />
            </motion.div>
            <h1 className={styles.title}>Payment <em>received.</em></h1>
            <p className={styles.sub}>One last step: tell us where to bring it.</p>
            {hydrated && <OrderForm submitLabel="Send to the kitchen" onSubmit={placeOrder} />}
        </div>
    )
}

export default Success
