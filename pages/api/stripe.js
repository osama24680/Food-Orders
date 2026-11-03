import Stripe from "stripe"
import joi from "joi"
import { priceItems, toLineItem } from "../../lib/pricing"

const schema = joi.object({
    items: joi.array().min(1).max(50).items(
        joi.object({
            _id: joi.string().required(),
            size: joi.number().integer().min(0).max(2).required(),
            quantity: joi.number().integer().min(1).max(50).required(),
        })
    ).required(),
})

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST")
        return res.status(405).json({ message: "Only POST is allowed" })
    }
    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(503).json({ message: "Online payment is not available right now" })
    }

    const { error, value } = schema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const { priced } = await priceItems(value.items)
        const origin = req.headers.origin || `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`
        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            line_items: priced.map(toLineItem),
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`,
        })
        res.status(200).json({ url: session.url })
    } catch (err) {
        console.error("Stripe checkout failed:", err.message)
        res.status(500).json({ message: "We could not start the payment, please try again" })
    }
}
