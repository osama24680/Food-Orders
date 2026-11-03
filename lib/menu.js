export const SIZES = ["Small", "Medium", "Large"]

export const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "pizza", label: "Pizza" },
    { value: "burger", label: "Burgers" },
    { value: "juice", label: "Drinks" },
]

const FALLBACK_DETAILS = {
    pizza: "Stretched by hand and fired until the crust blisters and the cheese turns gold.",
    burger: "Stacked high, seared hard and pressed into a soft toasted bun.",
    juice: "Ice cold and bright, poured to cut through every rich bite.",
}

const TYPE_LABELS = { pizza: "Pizza", burger: "Burger", juice: "Drink" }

export const typeLabel = (type) => TYPE_LABELS[type] || "Signature"

export const dishDetails = (dish) => dish.details || FALLBACK_DETAILS[dish.type] || ""

// Names in the CMS come as "Italian-pizza" or "double meat"
export const dishName = (name = "") =>
    name.replace(/-/g, " ").replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())

export const formatPrice = (value) => (Number(value) || 0).toFixed(2)
