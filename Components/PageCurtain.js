import { useEffect, useState } from "react"
import Router from "next/router"

const COVER_MS = 500
const REVEAL_MS = 620

const pathOf = (url) => url.split(/[?#]/)[0]

// Listens to the router instead of animating page exits: CSS modules of the old
// page are dropped as soon as the route changes, so an exit animation would flash unstyled.
const PageCurtain = () => {
    const [phase, setPhase] = useState("idle")

    useEffect(() => {
        let startedAt = 0
        let revealTimer
        let idleTimer

        const onStart = (url, { shallow } = {}) => {
            if (shallow || pathOf(url) === pathOf(Router.asPath)) return
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
            clearTimeout(revealTimer)
            clearTimeout(idleTimer)
            startedAt = Date.now()
            setPhase("cover")
        }

        const onDone = () => {
            if (!startedAt) return
            const wait = Math.max(0, COVER_MS - (Date.now() - startedAt))
            startedAt = 0
            revealTimer = setTimeout(() => {
                setPhase("reveal")
                idleTimer = setTimeout(() => setPhase("idle"), REVEAL_MS)
            }, wait)
        }

        Router.events.on("routeChangeStart", onStart)
        Router.events.on("routeChangeComplete", onDone)
        Router.events.on("routeChangeError", onDone)
        return () => {
            clearTimeout(revealTimer)
            clearTimeout(idleTimer)
            Router.events.off("routeChangeStart", onStart)
            Router.events.off("routeChangeComplete", onDone)
            Router.events.off("routeChangeError", onDone)
        }
    }, [])

    return (
        <div className="curtain" data-phase={phase} aria-hidden="true">
            <span>FoodAway</span>
        </div>
    )
}

export default PageCurtain
