import { createClient } from "@sanity/client"
import { projectId, dataset } from "./image"

// Server only: import this from getServerSideProps, getStaticProps and API routes.
// Reads use the token too, so the dataset can be private. "published" keeps drafts off the site.
export const client = createClient({
    projectId,
    dataset,
    apiVersion: "2022-08-23",
    useCdn: true,
    perspective: "published",
    token: process.env.SANITY_API_TOKEN,
})

export const writeClient = client.withConfig({ useCdn: false })
