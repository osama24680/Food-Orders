import Head from "next/head"
import Hero from "../Components/Hero"
import Marquee from "../Components/Marquee"
import Menu from "../Components/Menu"
import Services from "../Components/Services"
import { client } from "../lib/client"

export const getServerSideProps = async () => {
    const query = `*[_type=="pizza" && defined(slug.current)] | order(type desc, name asc){
        _id, name, type, price, details, image, "slug": slug.current
    }`
    try {
        return { props: { dishes: await client.fetch(query) } }
    } catch (error) {
        console.error(error)
        return { props: { dishes: [] } }
    }
}

export default function Home({ dishes }) {
    const featured = dishes.find((dish) => dish.slug === "italian-pizza") || dishes[0]

    return (
        <>
            <Head>
                <title>FoodAway | My food. Your food. Our food.</title>
                <meta name="description" content="Wood-fired pizzas, towering burgers and ice-cold drinks with free and fast delivery." />
            </Head>
            <Hero featured={featured} />
            <Marquee />
            <Services />
            <Menu dishes={dishes} />
        </>
    )
}
