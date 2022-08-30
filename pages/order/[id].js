import React, { useEffect } from 'react'
import { UilBill, UilBox, UilCheck, UilSmile } from '@iconscout/react-unicons'
import { client } from "../../lib/client"
import Image from "next/image"
import cooking from "../../assets/cooking.png"
import onWay from "../../assets/onway.png"
import spinner from "../../assets/spinner.svg"
import styles from "../../styles/OrderDetails.module.css"
import { Accordion } from '@mantine/core';

// export const getServerSideProps = async ({ params }) => {
//     const query = `*[_type=='order' && _id== '${params.id}']`
//     const order = await client.fetch(query)
//     return {
//         props: {
//             order: order[0],
//             allOrders:order
//         }
//     }
// }
export const getServerSideProps = async () => {
    const query = `*[_type=='order' ]`
    const order = await client.fetch(query)
    return {
        props: {
            order: order[0],
            allOrders: order,
            allOrdersLength: order.length
        }
    }
}


const OrderDetails = ({ order, allOrders }) => {

    useEffect(() => {
        if (order.status >= 3) {
            localStorage.removeItem("orderID")
        }
        localStorage.setItem("orderLength", allOrders.length)
    }, [])

    return (
        <div className={styles.Acc__container}>

            {allOrders.map((order, index) => (
                <Accordion variant="contained" radius="md" defaultValue="customization"  key={index}>
                    <Accordion.Item value="customization" className={styles.Acc__div} >
                        <Accordion.Control className={styles.handleData}>
                            <h3 style={{textAlign: 'center'}}>{order.name}</h3>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className={styles.container}>
                                <span className={styles.heading}>Order in Progress</span>
                                <div className={styles.details}>
                                    <div>
                                        <span>Order Id </span>
                                        <span>{order._id}</span>
                                    </div>
                                    <div>
                                        <span>Customer Name</span>
                                        <span>{order.name}</span>
                                    </div>
                                    <div>
                                        <span>Phone</span>
                                        <span>0{order.phone}</span>
                                    </div>

                                    <div>
                                        <span>Method </span>
                                        <span>
                                            {
                                                order.method === 0 ? "Cash on Delivery" : "Online Payment (done)"
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span>Total</span>
                                        {order.total? <span> $ {order.total}</span> : <b>Done</b>} 
                                    </div>
                                </div>
                                <div className={styles.statusContainer}>
                                    <div className={styles.status}>
                                        <UilBill width={50} height={50} fill="#F54748" />
                                        <span >Payment</span>
                                        {order.method === 0 ?
                                            <span className={styles.pending}>On Delivery</span>
                                            :
                                            <span className={styles.completed}>Completed</span>
                                        }
                                    </div>

                                    <div className={styles.status}>
                                        <Image src={cooking} alt="" width={50} height={50} />
                                        <span>Cooking</span>
                                        {order.status === 1 &&
                                            <div className={styles.spinner}>
                                                <Image src={spinner} alt="" />
                                            </div>
                                        }
                                        {order.status > 1 &&
                                            <div className={styles.completed}>
                                                <UilCheck />
                                                <span >Completed </span>
                                            </div>
                                        }
                                    </div>


                                    <div className={styles.status}>
                                        <Image src={onWay} alt="" width={50} height={50} />
                                        <span>OnWay</span>
                                        {order.status === 2 &&
                                            <div className={styles.spinner}>
                                                <Image src={spinner} alt="" />
                                            </div>
                                        }
                                        {order.status > 2 &&
                                            <div className={styles.completed}>
                                                <UilCheck />
                                                <span >Completed </span>
                                            </div>
                                        }
                                    </div>


                                    <div className={styles.status}>
                                        <UilBox width={50} height={50} fill="#F54748" />
                                        <span>Deliverd</span>
                                        {order.status >= 3 &&

                                            <div>
                                                <div className={styles.spinner}>
                                                    <Image src={spinner} alt="" />
                                                </div>
                                                <div className={styles.completed}>
                                                    <span >#Enjoy_Your_Meal </span>
                                                    <UilSmile />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            ))}


            {/* <div className={styles.allOrders}>
                {allOrders.map((order, index) => (
                    <div className={styles.container} key={index}>
                        <span className={styles.heading}>Order in Progress</span>
                        <div className={styles.details}>
                            <div>
                                <span>Order Id </span>
                                <span>{order._id}</span>
                            </div>
                            <div>
                                <span>Customer Name</span>
                                <span>{order.name}</span>
                            </div>
                            <div>
                                <span>Phone</span>
                                <span>0{order.phone}</span>
                            </div>

                            <div>
                                <span>Method </span>
                                <span>
                                    {
                                        order.method === 0 ? "Cash on Delivery" : "Online Payment (done)"
                                    }
                                </span>
                            </div>
                            <div>
                                <span>Total</span>
                                <span> $ {order.total}</span>
                            </div>
                        </div>
                        <div className={styles.statusContainer}>
                            <div className={styles.status}>
                                <UilBill width={50} height={50} fill="#F54748" />
                                <span >Payment</span>
                                {order.method === 0 ?
                                    <span className={styles.pending}>On Delivery</span>
                                    :
                                    <span className={styles.completed}>Completed</span>
                                }
                            </div>

                            <div className={styles.status}>
                                <Image src={cooking} alt="" width={50} height={50} />
                                <span>Cooking</span>
                                {order.status === 1 &&
                                    <div className={styles.spinner}>
                                        <Image src={spinner} alt="" />
                                    </div>
                                }
                                {order.status > 1 &&
                                    <div className={styles.completed}>
                                        <UilCheck />
                                        <span >Completed </span>
                                    </div>
                                }
                            </div>


                            <div className={styles.status}>
                                <Image src={onWay} alt="" width={50} height={50} />
                                <span>OnWay</span>
                                {order.status === 2 &&
                                    <div className={styles.spinner}>
                                        <Image src={spinner} alt="" />
                                    </div>
                                }
                                {order.status > 2 &&
                                    <div className={styles.completed}>
                                        <UilCheck />
                                        <span >Completed </span>
                                    </div>
                                }
                            </div>


                            <div className={styles.status}>
                                <UilBox width={50} height={50} fill="#F54748" />
                                <span>Deliverd</span>
                                {order.status >= 3 &&

                                    <div>
                                        <div className={styles.spinner}>
                                            <Image src={spinner} alt="" />
                                        </div>
                                        <div className={styles.completed}>
                                            <span >#Enjoy_Your_Meal </span>
                                            <UilSmile />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

        </div>
    )
}

export default OrderDetails
