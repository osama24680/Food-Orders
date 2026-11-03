import { randomUUID } from "crypto"
import axios from "axios"
import joi from "joi"
import Stripe from "stripe"
import { writeClient } from "../../lib/client"
import { priceItems } from "../../lib/pricing"
import { ROUTE_API } from "../../lib/route"

const schema = joi.object({
    name: joi.string().trim().min(3).max(60).required(),
    phone: joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    address: joi.string().trim().min(5).max(300).required(),
    method: joi.number().valid(0, 1).required(),
    sessionId: joi.string().when("method", { is: 1, then: joi.required(), otherwise: joi.forbidden() }),
    items: joi.array().max(50).items(
        joi.object({
            _id: joi.string().required(),
            size: joi.number().integer().min(0).max(2).required(),
            quantity: joi.number().integer().min(1).max(50).required(),
        })
    ).required(),
})

async function getCustomerId(token) {
    const { data } = await axios.get(`${ROUTE_API}/auth/verifyToken`, { headers: { token } })
    return data.decoded?.id
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST")
        return res.status(405).json({ message: "Only POST is allowed" })
    }
    if (!process.env.SANITY_API_TOKEN) {
        return res.status(503).json({ message: "Ordering is not available right now" })
    }

    const { error, value } = schema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    if (value.method === 0 && value.items.length === 0) {
        return res.status(400).json({ message: "Your cart is empty" })
    }

    let customerId
    try {
        customerId = await getCustomerId(req.headers.token)
    } catch {
        return res.status(401).json({ message: "Please log in again to place your order" })
    }

    try {
        const { priced, total: cartTotal } = await priceItems(value.items)
        let total = cartTotal
        // A dot in the id keeps the document out of the public dataset API
        let _id = `orders.${randomUUID()}`

        if (value.method === 1) {
            if (!process.env.STRIPE_SECRET_KEY) {
                return res.status(503).json({ message: "Online payment is not available right now" })
            }
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
            const session = await stripe.checkout.sessions.retrieve(value.sessionId)
            if (session.payment_status !== "paid") {
                return res.status(402).json({ message: "This payment has not been completed" })
            }
            total = session.amount_total / 100
            // Same id per payment, so refreshing /success cannot create a second order
            _id = `orders.${session.id}`
        }

        const order = await writeClient.createIfNotExists({
            _id,
            _type: "order",
            name: value.name,
            address: value.address,
            phone: parseInt(value.phone),
            total,
            method: value.method,
            status: 1,
            customerId,
            items: priced.map(({ _key, name, size, quantity, price }) => ({ _key, name, size, quantity, price })),
        })
        res.status(200).json({ id: order._id })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "We could not place your order, please try again" })
    }
}
