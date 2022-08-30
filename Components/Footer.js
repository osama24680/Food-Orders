import React from 'react'
import styles from "../styles/Footer.module.css"
import { UilFacebookF } from '@iconscout/react-unicons'
import { UilInstagram } from '@iconscout/react-unicons'
import { UilTwitterAlt } from '@iconscout/react-unicons'
import Image from "next/image"
import logo from "../assets/Logo.png"
const Footer = () => {
    return (
        <div className={styles.container}>
            <span>ALL RIGHT RESERVED</span>
            <div className={styles.social}>
                <UilFacebookF size={45} />
                <UilInstagram size={45} />
                <UilTwitterAlt size={45} />
            </div>
            <div className={styles.logo}>
                <Image src={logo} alt="" width={50} height={50} />
                <span>Foodoo</span>
            </div>
        </div>
    )
}

export default Footer