import React, { useState } from 'react'
import OrderModal from "../Components/OrderModal"
const Success = (props) => {
    const [paymentMethod, setPaymentMethod] = useState(true);
    return (
        <>
            <OrderModal method={1} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </>
    )
}

export default Success
