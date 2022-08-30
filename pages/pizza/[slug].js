import React, { useState ,useContext} from 'react'
import { client, urlFor } from '../../lib/client'
import styles from "../../styles/singleItem.module.css"
import leftArroe from "../../assets/arrowLeft.png"
import rightArroe from "../../assets/arrowRight.png"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"
import { FoodContext } from '../../Store/ContextStore'

// ******************** handling the data ****************************
export const getStaticPaths = async () => {
    const paths = await client.fetch(`*[_type=='pizza' && defined(slug.current)][].slug.current`)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: "blocking",
    }

}

export const getStaticProps = async (context) => {
    const { slug = "" } = context.params
    const pizza = await client.fetch(`*[_type=='pizza' && slug.current == '${slug}'][0]`)

    return {
        props: { pizza }
    }
}

// ******************** handling the data ****************************

const PizzaItem = ({ pizza }) => {

    let ctx= useContext(FoodContext)
    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1)

    function handleQuantity(type, product) {
        if (type === "inc") {
            quantity++;
            setQuantity(quantity)
        } else {
            quantity--
            if (quantity <= 0) {
                setQuantity(1)
            } else {
                setQuantity(quantity)
            }

        }
    }

    const addToCart = () => {
        ctx.addPizza({ ...pizza, price: pizza.price[size], quantity: quantity, size: size })
        toast.success("Added to Cart")
    }


    const src = urlFor(pizza.image).url()
    return (
        <div className={styles.container}>
            <div className={styles.imgWrapper}>
                <Image src={src} loader={() => src} alt="" layout="fill" unoptimized objectFit="cover" />
            </div>
            <div className={styles.right}>
                <span>{pizza.name}</span>
                <span>{pizza.details}</span>
                <span><span style={{ color: "var(--themeRed)" }}>$</span> {pizza.price[size]}</span>
                <div className={styles.size}>
                    <span>Size</span>
                    <div className={styles.sizeVariants}>
                        <div className={size === 0 ? styles.selected : ""} onClick={() => setSize(0)}>Small</div>
                        <div className={size === 1 ? styles.selected : ""} onClick={() => setSize(1)}>Medium</div>
                        <div className={size === 2 ? styles.selected : ""} onClick={() => setSize(2)}>Large</div>
                    </div>
                </div>
                <div className={styles.quantity}>
                    <span>Quanitiy</span>
                    <div className={styles.counter}>
                        <Image onClick={() => handleQuantity("dec", pizza)} src={leftArroe} alt="" height={20} width={20} objectFit="contain" />
                        <span>{quantity}</span>
                        <Image onClick={() => handleQuantity("inc", pizza)} src={rightArroe} alt="" height={20} width={20} objectFit="contain" />

                    </div>
                </div>
                <div className={`btn ${styles.btn}`} onClick={addToCart}>
                    Add to Cart
                </div>
            </div>
            <Toaster />
        </div >
    )
}

export default PizzaItem