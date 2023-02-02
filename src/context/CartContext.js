import React, { useState ,createContext,useContext} from 'react'

export const CartContext =createContext()

export const CartProvider = ({ children }) => {
    const [cart,setCart] = useState([])

    const addItem =(prodAdd) =>{
        if(!isInCart(prodAdd.id)){
            setCart(prev =>{return [...prev,prodAdd]})
        }
    }

    const isInCart = (id) => cart.some(prod => prod.id===id) 

    const sumQuantity = () => {
        let sum = 0
        cart.forEach(prod => {sum += prod.quantity})
        return sum
    }

    const sumTotal = () => {
        let sum = 0
        cart.forEach(prod => {sum += prod.quantity * prod.price})
        return sum
    }

    const totalQuantity = sumQuantity()
    const totalPay=sumTotal()

    const clearAll = () => {
        setCart([])
    }

    const deleteItem = (id) => {
        const products = cart.filter(prod => prod.id !== id )
        setCart(products)
    }

    return (
    <CartContext.Provider value={{addItem,isInCart,clearAll,deleteItem,totalQuantity,totalPay,cart}}>
        { children }
    </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}