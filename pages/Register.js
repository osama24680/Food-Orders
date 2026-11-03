import { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/Auth.module.css"
import AuthShell from "../Components/AuthShell"
import Field from "../Components/Field"
import { IconArrow, IconSpinner } from "../Components/Icons"
import { schemas, useForm } from "../lib/authForm"
import { useAuth } from "../Store/useAuth"

const Register = () => {
    const router = useRouter()
    const signup = useAuth((state) => state.signup)
    const token = useAuth((state) => state.token)
    const form = useForm()
    const { next } = router.query
    const nextQuery = next ? `next=${encodeURIComponent(next)}` : ""

    useEffect(() => {
        if (token) router.replace("/")
    }, [router, token])

    const onSubmit = form.submit(schemas.signup, async (values) => {
        await signup(values)
        router.push(`/login?registered=1${nextQuery && `&${nextQuery}`}`)
    })

    return (
        <AuthShell eyebrow="Join us" title={<>Pull up <em>a chair.</em></>} subtitle="One account for your orders, your address and your favourites.">
            <Head>
                <title>Create an account | FoodAway</title>
            </Head>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <Field form={form} name="name" label="Name" autoComplete="name" />
                <Field form={form} name="email" label="Email" type="email" autoComplete="email" />
                <Field form={form} name="phone" label="Phone (01xxxxxxxxx)" type="tel" autoComplete="tel" />
                <Field form={form} name="password" label="Password" type="password" autoComplete="new-password" />
                <Field form={form} name="rePassword" label="Confirm password" type="password" autoComplete="new-password" />
                {form.apiError && <p className="formError" role="alert">{form.apiError}</p>}
                <button type="submit" className="btn" disabled={form.isLoading}>
                    {form.isLoading ? <IconSpinner size={18} /> : <>Create account <IconArrow size={18} /></>}
                </button>
            </form>
            <p className={styles.switch}>Already have an account? <Link href={`/login${nextQuery && `?${nextQuery}`}`}>Log in</Link></p>
        </AuthShell>
    )
}

export default Register
