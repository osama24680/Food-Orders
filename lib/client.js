import  sanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client=sanityClient({
    projectId:"dqwmp92i",
    dataset:"production",
    apiVersion:"2022-08-23",
    useCdn:true,
    token:"skPJEhpw28OaDvgZoEJ5KmpfJvYrp5Sdd48s3p7Xl9xr8n6nRKRasCoZUu2MxHXcu7gboYmZhFgoc4QN3w2WYGE0NrJjuvxB7f7MNJxMZQ0SQQ04Kt5wlh67LhGUtoSLAIUdFokuC6LPPACViW8vYbaeHGrKrPO3JWMzIAV1nsUaAH7iuq6Z"

})
const builder=imageUrlBuilder(client)

export const urlFor=(source) =>builder.image(source)
