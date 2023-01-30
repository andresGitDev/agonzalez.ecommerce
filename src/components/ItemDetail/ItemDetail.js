import React  from "react";
import './ItemDetail.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import ItemCount from "../ItemCount/ItemCount";
import { NotificationContext } from "../../notification/NotificationService";


const ItemDetail = ({ id, name, category, img, price, stock, description}) => {
    const { addItem, isInCart } = useContext(CartContext)
    const  setNotification  = useContext(NotificationContext)

    const handleOnAdd = (quantity) => {
        addItem({ id, name, price, quantity})
        setNotification('success',`Se agrego ${quantity} unidades de ${name}`, 5)
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {category}
                </p>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    Disponible: {stock}
                </p>                
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {
                    isInCart(id) ? (<Link to='/cart'>Terminar compra</Link>):(<ItemCount stock={stock} onAdd={handleOnAdd} />)
                }
            </footer>
        </article>
    )
}

export default ItemDetail