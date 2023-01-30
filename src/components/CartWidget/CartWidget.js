import React from 'react'
import imgCart from './image/cart.svg'
import './CartWidget.css'

const CartWidget = ({ totalQuantity ,onClick}) => {
    return (
        <div className='CartWidget'>
            <img src={imgCart} onClick={onClick} className='CartImg' alt='Carrito'/>
            {totalQuantity}
        </div>
    )
}

export default CartWidget