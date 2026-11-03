// Sends a copy of the dish image into the cart icon
export function flyToCart(sourceEl) {
    const target = document.querySelector("[data-cart-target]")
    if (!sourceEl || !target) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const from = sourceEl.getBoundingClientRect()
    const to = target.getBoundingClientRect()
    const ghost = sourceEl.cloneNode(true)
    Object.assign(ghost.style, {
        position: "fixed",
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        margin: 0,
        objectFit: "cover",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 90,
        pointerEvents: "none",
    })
    document.body.appendChild(ghost)

    const x = to.left + to.width / 2 - (from.left + from.width / 2)
    const y = to.top + to.height / 2 - (from.top + from.height / 2)
    ghost.animate(
        [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${x * 0.6}px, ${y * 0.3 - 40}px) scale(.55)`, opacity: 1, offset: 0.6 },
            { transform: `translate(${x}px, ${y}px) scale(.08)`, opacity: 0.2 },
        ],
        { duration: 800, easing: "cubic-bezier(.5, 0, .2, 1)" }
    ).onfinish = () => ghost.remove()
}
