import React, {useContext } from 'react'
import styles from "../styles/SignUp.module.css"
import { Loader } from '@mantine/core';
import s1 from "../assets/s1.png"
import Image from "next/image"
import { UilSignInAlt } from '@iconscout/react-unicons'
import Link from 'next/link'
import { FoodContext } from "../Store/ContextStore"

const LogIn = () => {
  let ctx = useContext(FoodContext)
  return (
    <div className={styles.container}>
      <form className={`${styles.formContainer} formImgLogin`} onSubmit={(e) => ctx.handleSubmitLogin(e)}>
        <input onChange={ctx.handleInputLogin} type="email" name="email" placeholder='Email' />
        <p className={styles.inputError}>{ctx.joiErrors.email && ctx.joiErrors.email}</p>
        <input onChange={ctx.handleInputLogin} type="password" name="password" placeholder='Password' />
        <p className={styles.inputError}>{ctx.joiErrors.password && ctx.joiErrors.password}</p>
        <button className={`btn ${styles.FormBtn}`}>{ctx.isLoading ? <Loader color="green" size="sm" /> : `Log In`}</button>
        {ctx.registered && <h3 className={styles.registeredError} style={{ color: "#ff0808d1" }}>{ctx.registered}</h3>}
        <p>You do not have an account? <Link href="/Register">Register</Link></p>
      </form>
      <div className={styles.formImg}>
        <Image src={s1} alt="" className={styles.formImgLogin}/>
        {/* <div className={styles.contactUs}>
          <span>Log In</span>
          <div >
            <UilSignInAlt color="white" className={styles.svfIcon} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default LogIn
