import React, { useContext, useState } from 'react'
import styles from "../styles/Menu.module.css"
import Image from "next/image"
import { urlFor } from '../lib/client'
import Link from "next/link"
import pizza from "../assets/pizza.svg"
import can from "../assets/can.png"
import burger from "../assets/cheese-burger.png"
import food from "../assets/junk-food.png"
import { FoodContext } from "../Store/ContextStore"
const Menu = ({ pizass }) => {
    let ctx = useContext(FoodContext)
    const [products, setProducts] = useState(pizass)
    const [choosen, setChoosen] = useState("all")

    const handleMenu = (type) => {
        if (type === "all") {
            setProducts(pizass)
            setChoosen("all")
        }
        else if (type === "pizza") {
            let newItems = pizass.filter(item => item.type === type)
            setProducts(newItems)
            setChoosen("pizza")
        }
        else if (type === "burger") {
            let newItems = pizass.filter(item => item.type === type)
            setProducts(newItems)
            setChoosen("burger")
        }
        else if (type === "juice") {
            let newItems = pizass.filter(item => item.type === type)
            setProducts(newItems)
            setChoosen("juice")
        }
    }
    console.log(pizass)
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.spans}>
                    <span>OUR MENU</span>
                    <span>Menu that always</span>
                    <span>Make you fall in love</span>
                </div>
                <div className={styles.categories}>
                    <div className={choosen === "pizza" && styles.activeFilteration} onClick={(e) => handleMenu("pizza")}><Image src={pizza} alt="" /></div>
                    <div className={choosen === "burger" && styles.activeFilteration} onClick={(e) => handleMenu("burger")}><Image src={burger} alt="" /></div>
                    <div className={choosen === "juice" && styles.activeFilteration} onClick={(e) => handleMenu("juice")}><Image src={can} alt="" /></div>
                    <div className={choosen === "all" && styles.activeFilteration} onClick={(e) => handleMenu("all")}><Image src={food} alt="" /></div>
                </div>
            </div>
            <div className={styles.menu}>
                {products.map((pizza, index) => {
                    const src = urlFor(pizza.image).url()
                    return (
                        <Link href={`./pizza/${pizza.slug.current}`} key={index} >
                            < div className={styles.pizza} >
                                <div className={styles.imgWrapper}>
                                    <Image src={src} alt="" objectFit='cover' layout="fill" loader={() => src} />
                                </div>
                                <span>{pizza.name}</span>
                                <span><span style={{ color: "var(--themeRed" }}>$</span> {pizza.price[1]}</span>
                            </div>

                        </Link>

                    )

                })}
            </div>
        </div >
    )
}

export default Menu
