import React, { useState, useEffect, useContext } from 'react'
import { UilShoppingBag, UilReceipt, UilUtensilsAlt, UilSignInAlt } from '@iconscout/react-unicons'
import Link from "next/link"
import styles from "../styles/Header.module.css"
import { FoodContext } from "../Store/ContextStore"
import { Collapse } from '@mantine/core';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/router'
const Header = () => {
    let router= useRouter()
    let ctx = useContext(FoodContext)
    const [order, setOrder] = useState(null)
    const [userName, setUserName] = useState(null)

    function getTokenData() {
        let checked = hasCookie('userFood')
        if (checked) {
            let userData = JSON.parse(getCookie("userFood"))
            let last_name = userData.first_name + " " + userData.last_name
            setUserName(last_name)
        }

    }

    useEffect(() => {
        setOrder(localStorage.getItem("orderID"))
        getTokenData()
    }, [order, hasCookie('userFood')])
    return (
        <div>
            {userName !== null ?
                (
                    <div className={styles.header}>
                        <ul className={styles.menu}>
                            <li onClick={() => ctx.setOpened((o) => !o)}>
                                <p>{userName}</p>
                            </li>
                            <Collapse in={ctx.opened}>
                                <p onClick={ctx.logOut} style={{ color: "var(--themeRed)", cursor: "pointer" }}>Log Out</p>
                            </Collapse>
                        </ul>

                        <Link href="/">
                            <div className={styles.logo}>
                                <span>FoodAway</span>
                                <UilUtensilsAlt fill="red" />
                            </div>
                        </Link>
                        <div className={styles.rightSide}>
                            <Link href="/cart">
                                <div className={styles.cart}>
                                    <UilShoppingBag size={35} color="#2e2e2e" />
                                    <div className={styles.badge}>{ctx.pizzas.length}</div>

                                </div>
                            </Link>

                            <Link href={`/order/${order}`}>
                                <div className={styles.cart}>
                                    <UilReceipt size={35} fill="#2e2e2e" />
                                </div>
                            </Link>
                        </div>
                    </div>

                ) :
                <div className={styles.contactUsHeader}>
                    <div className={styles.contactUs} onClick={()=>{router.push("/LogIn")}}>
                        <span>Log In</span>
                        <div >
                            <UilSignInAlt color="white" className={styles.svfIcon} />
                        </div>
                    </div>
                    <h1 style={{ color: "var(--themeRed)", textAlign: "center" }}>Welcome to Food Away</h1>
                </div>


            }

        </div>
    )
}

export default Header
