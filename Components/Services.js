import React from 'react'
import styles from "../styles/Services.module.css"
import s1 from "../assets/s1.png"
import s2 from "../assets/s2.png"
import s3 from "../assets/s3.png"
import Image from "next/image"
const Services = () => {
    return (
        <>
            <div className={styles.heading}>
                <span>WHAT WE SERVE</span>
                <span>YOUR FAVOURIT FOOD</span>
                <span>DELIVERY PARTNERFOOD</span>

            </div>
            <div className={styles.services}>
                <div className={styles.feature}>
                    <div className={styles.imgWrapper}>
                        <Image src={s1} alt="" objectFit="cover" layout="intrinsic" />
                    </div>
                    <span>Easy to order</span>
                    <span>You only need a few steps in food ordering</span>
                </div>
                <div className={styles.feature}>
                    <div className={styles.imgWrapper}>
                        <Image src={s2} alt="" objectFit="cover" layout="intrinsic" />
                    </div>
                    <span>Easy to order</span>
                    <span>Delivery that is always on time even fatser</span>
                </div>
                <div className={styles.feature}>
                    <div className={styles.imgWrapper}>
                        <Image src={s3} alt="" objectFit="cover" layout="intrinsic" />
                    </div>
                    <span>Easy to order</span>
                    <span>Not only fast for us, it is also number one</span>
                </div>           
                 </div>
        </>
    )
}

export default Services