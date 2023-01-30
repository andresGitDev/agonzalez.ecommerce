import React from "react"
import Loading from "../Loading/Loading"
import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"


import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [direction,setDirection] = useState('')
    const [orderId, setOrderId] = useState('')
    const { cart, totalPay, clearAll } = useContext(CartContext)

    const navigate = useNavigate()

    const createOrder = async () => {
        setLoading(true)
        try {
            const newOrder = {
                buyer: {
                    name,
                    phone,
                    email,
                    direction
                },
                items: cart,
                totalPay
            }
    
            const batch = writeBatch(db)
    
            const ids = cart.map(prod => prod.id)
            console.log(ids)
    
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
    
            const productsAddedToCartFromFirestore = await getDocs(productsRef)
            const { docs } = productsAddedToCartFromFirestore
    
            const outOfStock = []
    
            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity
    
                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })
    
            if(outOfStock.length === 0) {
                await batch.commit()
    
                const orderRef = collection(db, 'orders')
                const { id }= await addDoc(orderRef, newOrder)
                setOrderId(id)
                clearAll()

                setTimeout(() => {
                    navigate('/')
                }, 5000)
            } else {
                console.error('hay productos fuera de stock')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
       
        
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
                <button className="Button2" onClick={createOrder}>Generar orden</button>	
            </div> 
        </div>
    )
}

export default Checkout