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

// Only allow redirects inside this site
const safeNext = (next) => (typeof next === "string" && /^\/(?!\/)/.test(next) ? next : "/")

const LogIn = () => {
    const router = useRouter()
    const signin = useAuth((state) => state.signin)
    const token = useAuth((state) => state.token)
    const form = useForm()
    const { next, registered } = router.query
    const nextQuery = next ? `?next=${encodeURIComponent(next)}` : ""

    useEffect(() => {
        if (token) router.replace(safeNext(next))
    }, [router, token, next])

    const onSubmit = form.submit(schemas.signin, signin)

    return (
        <AuthShell eyebrow="Welcome back" title={<>Your table <em>is ready.</em></>} subtitle="Log in to place your order and follow it to your door.">
            <Head>
                <title>Log in | FoodAway</title>
            </Head>
            {registered && <p className="formNotice" style={{ marginBottom: "1rem" }}>Account created, you can log in now.</p>}
            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <Field form={form} name="email" label="Email" type="email" autoComplete="email" />
                <Field form={form} name="password" label="Password" type="password" autoComplete="current-password" />
                {form.apiError && <p className="formError" role="alert">{form.apiError}</p>}
                <button type="submit" className="btn" disabled={form.isLoading}>
                    {form.isLoading ? <IconSpinner size={18} /> : <>Log in <IconArrow size={18} /></>}
                </button>
            </form>
            <p className={styles.switch}>New here? <Link href={`/register${nextQuery}`}>Create an account</Link></p>
        </AuthShell>
    )
}

export default LogIn
