import React from 'react'
import imgCart from './image/cart.svg'
import './CartWidget.css'

const CartWidget = () => {
    return (
        <div className='CartWidget'>
            <img src={imgCart} className='CartImg' alt='Carrito'/>
            0
        </div>
    )
}

export default CartWidget