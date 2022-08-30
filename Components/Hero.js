import React from 'react'
import styles from "../styles/Hero.module.css"
import Image from "next/image"
import cherry from "../assets/Cherry.png"
import { UilPhone } from '@iconscout/react-unicons'
import pizza from "../assets/p1.jpg"
import heroImage from "../assets/HeroImage.png"
import heroImage2 from "../assets/HeroImage2.png"
import { UilPizzaSlice } from '@iconscout/react-unicons'
const Hero = () => {

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.cherryDiv}>
                    <span>Faster than your think</span>
                    {/* <Image width={40} height={25} src={cherry} alt="" /> */}
                    <UilPizzaSlice fill="red" style={{ marginLeft: "10px" }} />
                </div>
                <div className={styles.heroText}>
                    <span><span style={{ color: "var(--themeRed)" }}>My</span> Food</span>
                    <span><span style={{ color: "var(--themeRed)" }}>Your</span> Food</span>
                    <span><span style={{ color: "var(--themeRed)" }}>Our</span> Food </span>

                </div>
                <span className={styles.miniText}>
                    Our mission is to fill your tummy with delicious food and with free and fast delivery
                </span>
                <button className={`btn ${styles.btn}`}>Get Started</button>
            </div>
            <div className={styles.right}>
                <div className={styles.imgContainer}>
                    <Image src={heroImage} alt="" />
                </div>
                <div className={styles.contactUs}>
                    <span>Contact Us</span>
                    <div >
                        <UilPhone color="white" />
                    </div>
                </div>
                <div className={styles.pizza}>
                    <div >
                        <Image src={pizza} alt="" objectFit='cover' layout="intrinsic" />
                    </div>
                    <div className={styles.details}>
                        <span>Italian Pizza</span>
                        <span> <span style={{ color: "var(--themeRed)" }}>$</span> 7.49</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Hero