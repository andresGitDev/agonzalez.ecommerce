import React from "react"
import Loading from "../Loading/Loading"
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { useTitle } from "../../hooks/useTitle"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../../services/firebase/firestore/orders"

const Checkout = () => {
    useTitle('Orden de compra', [])
    const [loading, setLoading] = useState(false)
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [direction,setDirection] = useState('')
    const [orderId, setOrderId] = useState('')
    const { cart, totalPay, clearAll } = useContext(CartContext)

    const navigate = useNavigate()

    const newOrder = () => {
            setLoading(true)
            createOrder(name,phone,email,direction,cart,totalPay).then(response => {
            setOrderId(response)
            setTimeout(() => {
                navigate('/')
                clearAll()
            }, 5000)        
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return (<Loading></Loading>)
    }

    if(orderId) {
        return (
            <div className='cart-container'>
                <h1>El Id de su compra es: {orderId}</h1>
            </div>
        )
    }

    if(cart.length === 0) {
        return (
            <div className='cart-container'>
                <h1>No hay productos en el carrito</h1>
            </div>
        )
    }

    return (
        <div className='cart-container'>
            <div>
                <div>
                    <div>
                        <h1>Ingrese sus datos</h1>
                    </div>
                    <form  >
                        <div>
                            <input type="text" value={name} placeholder="Nombre" onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" value={phone} placeholder="Telefono" onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                        <div>
                            <input type="email" value={email} placeholder="Correo" onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" value={direction} placeholder="Direccion" onChange={(event) => setDirection(event.target.value)}/>
                        </div>
                    </form>	
                </div>
            </div>
            <div>
                <button className="Button2" onClick={newOrder}>Generar orden</button>	
            </div> 
        </div>
    )
}

export default Checkout