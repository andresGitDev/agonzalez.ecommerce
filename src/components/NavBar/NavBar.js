import React from 'react'
import CartWidget from "../CartWidget/CartWidget"

const NavBar = () => {
    return (
        <nav >
            <h1>Ecommerce</h1>
            <div >
                <button>Productos</button>
                <button>Carrito</button>
                <button>Perfil</button>
            </div>
            <CartWidget />
        </nav>
    )
}

export default NavBar