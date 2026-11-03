import { createImageUrlBuilder } from "@sanity/image-url"

export const projectId = "dqwmp92i"
export const dataset = "production"

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => builder.image(source)

// next/image loader: Sanity's CDN does the resizing
export const sanityLoader = ({ src, width, quality }) =>
    `${src}?w=${width}&q=${quality || 75}&auto=format&fit=max`
