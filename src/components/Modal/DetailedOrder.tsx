import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"

export default function DetailedOrder({ orderId }: { orderId: number}) {
    const [order, setOrder] = useState<ICurrentOrder | null>(null)

    // fetche single order
    useEffect(()=>{

        async function getOrder() {

            const response = await fetch(`http://localhost:3000/orders/${orderId}`)


            if (response.ok) {
                const data = await response.json()
                setOrder(data)
                console.log(data);
                
            }
            
            
        }
        getOrder()
        
    },[])



    return (
        <div>
            {order ? <div>{order.id}</div> : <Loader/>}
        </div>
    )

    
    
}
