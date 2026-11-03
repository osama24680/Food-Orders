import styles from "../styles/Cart.module.css"
import { schemas, useForm } from "../lib/authForm"
import { useAuth } from "../Store/useAuth"
import Field from "./Field"
import { IconArrow, IconSpinner } from "./Icons"

// Delivery details, shared by the cash-on-delivery modal and the page after an online payment
const OrderForm = ({ note, submitLabel, onSubmit }) => {
    const user = useAuth((state) => state.user)
    const form = useForm({ name: user?.name || "" })

    return (
        <form className={styles.form} onSubmit={form.submit(schemas.delivery, onSubmit)} noValidate>
            <Field form={form} name="name" label="Full name" autoComplete="name" />
            <Field form={form} name="phone" label="Phone (01xxxxxxxxx)" type="tel" autoComplete="tel" />
            <Field form={form} name="address" label="Delivery address" as="textarea" rows={3} autoComplete="street-address" />
            {note && <p className={styles.formNote}>{note}</p>}
            {form.apiError && <p className="formError" role="alert">{form.apiError}</p>}
            <button type="submit" className="btn" disabled={form.isLoading}>
                {form.isLoading ? <IconSpinner size={18} /> : <>{submitLabel} <IconArrow size={18} /></>}
            </button>
        </form>
    )
}

export default OrderForm
