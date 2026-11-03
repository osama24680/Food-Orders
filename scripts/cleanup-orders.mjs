// Lists orders in Sanity, and deletes them only when asked. Deleting cannot be undone.
//   node --env-file=.env.local scripts/cleanup-orders.mjs                 list only
//   node --env-file=.env.local scripts/cleanup-orders.mjs --delete-test   delete the QA test orders
//   node --env-file=.env.local scripts/cleanup-orders.mjs --delete-legacy delete the old public orders
import { createClient } from "@sanity/client"

const TEST_NAMES = ["QA Test Order", "QA Stripe Test Order"]

const client = createClient({
    projectId: "dqwmp92i",
    dataset: "production",
    apiVersion: "2022-08-23",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

const orders = await client.fetch(`*[_type=="order"]{_id, name, _createdAt} | order(_createdAt asc)`)
const test = orders.filter((order) => TEST_NAMES.includes(order.name))
// New orders have a dot in their id, which keeps them out of the public API
const legacy = orders.filter((order) => !order._id.includes(".") && !TEST_NAMES.includes(order.name))

console.log(`Orders: ${orders.length}, QA test: ${test.length}, old public: ${legacy.length}`)
for (const order of legacy) console.log(`  old  ${order._createdAt.slice(0, 10)}  ${order._id}`)
for (const order of test) console.log(`  test ${order._createdAt.slice(0, 10)}  ${order.name}`)

const flag = process.argv[2]
const targets = flag === "--delete-test" ? test : flag === "--delete-legacy" ? legacy : []

if (targets.length > 0) {
    const transaction = client.transaction()
    for (const order of targets) transaction.delete(order._id)
    await transaction.commit()
    console.log(`Deleted ${targets.length} orders`)
}
