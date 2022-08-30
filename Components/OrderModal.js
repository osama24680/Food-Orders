
import {useContext} from "react"
import { Modal, useMantineTheme } from '@mantine/core'
import styles from "../styles/Cart.module.css"
import { createOrder } from "../lib/orderHandler"
import Router from "next/router";
import toast from "react-hot-toast"
import { useState } from "react"
import { FoodContext } from "../Store/ContextStore"

const OrderModal = ({ setPaymentMethod, paymentMethod, totalValue, method }) => {
    let ctx = useContext(FoodContext)
    const theme = useMantineTheme()
    const [formData, setFormData] = useState({});

    function handleInput(e) {
        setFormData({
            ...formData, [e.target.name]: e.target.value, totalValue
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const id = await createOrder({ ...formData, totalValue, method })
        toast.loading("Ordere is sending to kitchen.....",{
            duration:3000
        })
        setTimeout(() => {
            toast.success("Ordere Placed successfully!")
            setPaymentMethod(false)
            ctx.resetCar()
            Router.push(`/order/${id}`)
            { typeof window !== 'undefined' && localStorage.setItem("orderID", id) }
        }, 4000)

    }

    return (
        <>
            <Modal
                title="Payment Form"
                opened={paymentMethod}
                onClose={() => setPaymentMethod(false)}
                overlayBlur={3}
                overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={.55}

            >
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <input onChange={handleInput} type="text" name="name" placeholder='name' required />
                    <input onChange={handleInput} type="text" name="phone" placeholder='phone' required />
                    <textarea onChange={handleInput} placeholder="adddress" name="address" cols={8} rows={3} />
                    {totalValue && <span>You will pay <span>$ {totalValue }</span> on delivery</span>}
                    <button type="submit" className={`btn`}>place order</button>
                </form>
            </Modal>
        </>
    )
}

export default OrderModal
