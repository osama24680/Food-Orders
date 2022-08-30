import React, { useState, useEffect, useCallback,useContext } from 'react'
import styles from "../styles/Cart.module.css"
import Image from "next/image"
import { urlFor } from "../lib/client"
import OrderModal from "../Components/OrderModal"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"
import { FoodContext } from '../Store/ContextStore'

const Cart = () => {
    let router = useRouter()
    let ctx=useContext(FoodContext)
    let cartData = ctx.pizzas

    const [method, setMethod] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [totalValue, setTotalValue] = useState(0);

    function handleRemove(i) {
        ctx.removePizza(i)
        toast.error("item removed")
    }

    const total = useCallback(() => {
        let newValueTotal = cartData.reduce((a, b) => a + b.quantity * b.price, 0)
        setTotalValue(newValueTotal)
        return newValueTotal
    })

    function handleOnDelivery() {
        if (totalValue === 0) {
            setPaymentMethod(false)
        } else {
            setPaymentMethod(true)
        }
        setMethod(0)
        typeof window !== 'undefined' && localStorage.setItem("total", total())
        console.log(ctx.pizzas)
    }
    const handleCheckout = async () => {
        typeof window !== 'undefined' && localStorage.setItem("total", total())
        setMethod(1)
        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartData)
        })
        if (response.status === 500) return;
        const data = await response.json()
        toast.loading("Redirecting....")
        setTimeout(() => {
            router.push(data.url) 
        }, 2000)


    }

    useEffect(() => {
        total()
    }, [total])
    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {cartData?.length > 0 && cartData?.map((pizza, index) => {
                            const src = urlFor(pizza.image).url()
                            return (
                                <tr key={index}>
                                    <td className={styles.imgTD}>
                                        <Image loader={() => src} src={src} alt="" objectFit="cover" width={85} height={85} />
                                    </td>
                                    <td>
                                        {pizza.name}
                                    </td>
                                    <td>
                                        {pizza.size === 0 ? "Small" : pizza.size === 1 ? "Medium" : "Large"}
                                    </td>
                                    <td>
                                        {pizza.price}
                                    </td>
                                    <td>
                                        {pizza.quantity}
                                    </td>
                                    <td>
                                        {pizza.price * pizza.quantity}
                                    </td>
                                    <td onClick={() => handleRemove(index)} style={{ color: "var(--themeRed)", cursor: "pointer" }}>x</td>
                                </tr>
                            )
                        })}
                        <Toaster />
                        <OrderModal
                            setPaymentMethod={setPaymentMethod}
                            method={method}
                            paymentMethod={paymentMethod}
                            totalValue={totalValue}
                        />
                    </tbody>

                </table>
            </div>

            <div className={styles.cart}>
                <span>Cart</span>
                <div className={styles.cartDetails}>
                    <div >
                        <span>Items</span>
                        <span>{cartData.length}</span>
                    </div>
                    <div>
                        <span onClick={total}>Total</span>
                        <span >{totalValue}</span>
                    </div>
                </div>

                <div className={styles.buttonsDiv}>
                    <button className={styles.cartButton} onClick={handleOnDelivery}>Pay on Delivery</button>
                    <button className={styles.cartButtonGround} onClick={handleCheckout}>Pay Online</button>
                </div>
            </div>

        </div>
    )
}

export default Cart


