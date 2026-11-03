import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import styles from "../styles/Menu.module.css"
import { sanityLoader, urlFor } from "../lib/image"
import { dishName, formatPrice, typeLabel } from "../lib/menu"
import { flyToCart } from "../lib/flyToCart"
import { useCart } from "../Store/useCart"
import { IconPlus } from "./Icons"

const DEFAULT_SIZE = 1

const DishCard = ({ dish, index }) => {
    const add = useCart((state) => state.add)
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const name = dishName(dish.name)
    const src = urlFor(dish.image).url()

    // Follows the mouse through CSS variables, so moving it never re-renders the card
    function handlePointerMove(e) {
        if (e.pointerType !== "mouse") return
        const rect = cardRef.current.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        cardRef.current.style.setProperty("--ry", `${(px - 0.5) * 9}deg`)
        cardRef.current.style.setProperty("--rx", `${(0.5 - py) * 9}deg`)
        cardRef.current.style.setProperty("--mx", `${px * 100}%`)
        cardRef.current.style.setProperty("--my", `${py * 100}%`)
    }

    function handlePointerLeave() {
        cardRef.current.style.setProperty("--ry", "0deg")
        cardRef.current.style.setProperty("--rx", "0deg")
    }

    function handleQuickAdd() {
        flyToCart(imageRef.current)
        add({
            _id: dish._id,
            name: dish.name,
            slug: dish.slug,
            type: dish.type,
            image: dish.image,
            price: dish.price[DEFAULT_SIZE],
            size: DEFAULT_SIZE,
            quantity: 1,
        })
        toast.success(`${name} added to your cart`)
    }

    return (
        <article
            ref={cardRef}
            className={styles.card}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <Link href={`/pizza/${dish.slug}`} className={styles.cardLink}>
                <div className={styles.archImage} data-type={dish.type} ref={imageRef}>
                    <Image
                        loader={sanityLoader}
                        src={src}
                        alt={name}
                        fill
                        sizes="(max-width: 560px) 88vw, (max-width: 1100px) 45vw, 22vw"
                    />
                </div>
                <div className={styles.cardMeta}>
                    <span>N° {String(index + 1).padStart(2, "0")} · {typeLabel(dish.type)}</span>
                    <h3>{name}</h3>
                    <p>from <strong>${formatPrice(dish.price[0])}</strong></p>
                </div>
            </Link>
            <button className={styles.quickAdd} onClick={handleQuickAdd} aria-label={`Add a medium ${name} to your cart`}>
                <IconPlus size={18} />
            </button>
            <div className={styles.sheen} aria-hidden="true" />
        </article>
    )
}

export default DishCard
