import axios from "axios"

export const toCartPayload = (items) =>
    items.map(({ _id, size, quantity }) => ({ _id, size, quantity }))

export async function createOrder({ details, items, method, sessionId, token }) {
    const { data } = await axios.post(
        "/api/order",
        { ...details, items: toCartPayload(items), method, sessionId },
        { headers: { token } }
    )
    return data.id
}

export async function startCheckout(items) {
    const { data } = await axios.post("/api/stripe", { items: toCartPayload(items) })
    return data.url
}
