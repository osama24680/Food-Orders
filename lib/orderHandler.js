export const createOrder = async({ name, phone, address, totalValue, method })=>{
    const response=await fetch("/api/order",{
        method:"POST",
        body:JSON.stringify({
            name,
            phone:parseInt(phone),
            address,
            totalValue:parseFloat(totalValue),
            method,
            status:1,
        }),
    })
    const id=await response.json()
    return id
}