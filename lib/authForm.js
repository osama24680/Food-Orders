import { useState } from "react"
import joi from "joi"
import { getErrorMessage } from "../Store/useAuth"

// The browser build of joi has no TLD list, so TLD checks must be off
const email = joi.string().email({ tlds: { allow: false } }).required().label("Email")
const password = joi.string().min(6).required().label("Password")
const name = joi.string().trim().min(3).max(30).required().label("Name")
const phone = joi.string().pattern(/^01[0125][0-9]{8}$/).required().label("Phone")
    .messages({ "string.pattern.base": "Phone must be a valid Egyptian mobile number" })
const matching = (ref, label) => joi.any().valid(joi.ref(ref)).required().label(label)
    .messages({ "any.only": "Passwords do not match" })

export const schemas = {
    signin: joi.object({ email, password }),
    signup: joi.object({ name, email, phone, password, rePassword: matching("password", "Confirm password") }),
    delivery: joi.object({ name, phone, address: joi.string().trim().min(5).required().label("Address") }),
}

// Small form helper: field values, per-field joi errors, API error and loading state
export function useForm(initialValues = {}) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

    const submit = (schema, action) => async (e) => {
        e.preventDefault()
        setApiError("")
        const { error, value } = schema.validate(values, { abortEarly: false, stripUnknown: true })
        if (error) {
            const fieldErrors = {}
            for (const item of error.details) fieldErrors[item.path[0]] ??= item.message.replace(/"/g, "")
            setErrors(fieldErrors)
            return
        }
        setErrors({})
        setIsLoading(true)
        try {
            await action(value)
        } catch (err) {
            setApiError(getErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    return { values, setValues, errors, apiError, isLoading, handleChange, submit }
}
