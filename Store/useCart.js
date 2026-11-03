import { create } from "zustand"
import { persist } from "zustand/middleware"

const sameLine = (item, _id, size) => item._id === _id && item.size === size

export const useCart = create(
    persist(
        (set) => ({
            items: [],
            lastOrderId: null,

            add(dish) {
                set(({ items }) => {
                    const exists = items.some((item) => sameLine(item, dish._id, dish.size))
                    return {
                        items: exists
                            ? items.map((item) =>
                                sameLine(item, dish._id, dish.size)
                                    ? { ...item, quantity: item.quantity + dish.quantity }
                                    : item
                            )
                            : [...items, dish],
                    }
                })
            },

            setQuantity(_id, size, quantity) {
                set(({ items }) => ({
                    items: items.map((item) =>
                        sameLine(item, _id, size) ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }))
            },

            remove(_id, size) {
                set(({ items }) => ({ items: items.filter((item) => !sameLine(item, _id, size)) }))
            },

            completeOrder(id) {
                set({ items: [], lastOrderId: id })
            },
        }),
        { name: "foodaway-cart", skipHydration: true }
    )
)

export const cartCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0)
export const cartTotal = (items) => items.reduce((sum, item) => sum + item.quantity * item.price, 0)
