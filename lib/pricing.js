import { writeClient } from "./client"
import { urlFor } from "./image"
import { dishName, SIZES } from "./menu"

// Prices always come from the CMS, never from the browser
export async function priceItems(items) {
    const ids = [...new Set(items.map((item) => item._id))]
    const dishes = await writeClient.fetch(`*[_type=="pizza" && _id in $ids]{_id,name,price,image}`, { ids })

    const priced = items.map((item, index) => {
        const dish = dishes.find((candidate) => candidate._id === item._id)
        const price = dish?.price?.[item.size]
        if (price === undefined) throw new Error("A dish in your cart is no longer available")
        return {
            _key: `${item._id}-${item.size}-${index}`,
            name: dishName(dish.name),
            size: SIZES[item.size],
            quantity: item.quantity,
            price,
            image: dish.image,
        }
    })

    const total = priced.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { priced, total: Math.round(total * 100) / 100 }
}

export const toLineItem = (item) => ({
    price_data: {
        currency: "usd",
        product_data: {
            name: `${item.name} (${item.size})`,
            images: item.image ? [urlFor(item.image).width(600).url()] : [],
        },
        unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
})
