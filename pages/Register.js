import React, { useContext } from 'react'
import styles from "../styles/SignUp.module.css"
import { Loader } from '@mantine/core';
import s2 from "../assets/s2.png"
import Image from "next/image"
import { UilRegistered } from '@iconscout/react-unicons'
import Link from 'next/link'
import { FoodContext } from "../Store/ContextStore"
const Register = () => {
    let ctx = useContext(FoodContext)
    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={(e) => ctx.handleSubmit(e,"register")}>
                <input onChange={ctx.handleInput} type="text" name="first_name" placeholder='First Name' />
                <p className={styles.inputError}>{ctx.joiErrors.first_name && ctx.joiErrors.first_name}</p>
                <input onChange={ctx.handleInput} type="text" name="last_name" placeholder='Last Name' />
                <p className={styles.inputError}>{ctx.joiErrors.last_name && ctx.joiErrors.last_name}</p>
                <input onChange={ctx.handleInput} type="number" name="age" placeholder='Age' />
                <p className={styles.inputError}>{ctx.joiErrors.age && ctx.joiErrors.age}</p>
                <input onChange={ctx.handleInput} type="email" name="email" placeholder='Email' />
                <p className={styles.inputError}>{ctx.joiErrors.email && ctx.joiErrors.email}</p>
                <input onChange={ctx.handleInput} type="password" name="password" placeholder='Password' />
                <p className={styles.inputError}>{ctx.joiErrors.password && ctx.joiErrors.password}</p>
                <button className={`btn ${styles.FormBtn}`}>{ctx.isLoading ? <Loader color="green" size="sm" /> : `Confirm`}</button>
                {ctx.registered && <h3 className={styles.registeredError} style={{ color: "#ff0808d1" }}>{ctx.registered}</h3>}
                <p>You have an account? <Link href="/LogIn">Log In</Link></p>
            </form>
            <div className={styles.formImg}>
                <Image src={s2} alt="" />
                <div className={styles.contactUs}>
                    <span>Register</span>
                    <div >
                        <UilRegistered color="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
