import React  from "react";
import './ItemDetail.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const InputCount = ({onConfirm, stock, initial= 1}) => {
    const [count, setCount] = useState(initial)

    const handleChange = (e) => {
        if(e.target.value <= stock) {
            setCount(e.target.value<= 1?e.target.value:1)
        }
    }

    return (
        <div>
            <input type='number' onChange={handleChange} value={count}/>
            <button onClick={() => onConfirm(count)}>Agregar al carrito</button>
        </div>
    )
}

const ButtonCount = ({ onConfirm, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial)

    const increment = () => {
        if(count < stock) {
            setCount(count + 1)
        }
    }

    const decrement = () => {
        setCount(count - 1<=1?1:count-1)
    }

    return (
        <div>
            <p>{count}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <button onClick={() => onConfirm(count)}>Agregar al carrito</button>
        </div>
    )
}


const ItemDetail = ({ product}) => {
    const [inputType] = useState('button')
    const [quantity, setQuantity] = useState(0)

    const ItemCount = inputType === 'input' ? InputCount : ButtonCount

    const handleOnAdd = (quantity) => {
        setQuantity(parseInt(quantity))
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {product.name}
                </h2>
            </header>
            <picture>
                <img src={product.img} alt={product.name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {product.category}
                </p>
                <p className="Info">
                    Descripción: {product.description}
                </p>
                <p className="Info">
                    Precio: {product.price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {
                    quantity > 0 ? (<Link to='/cart'>Terminar compra</Link>):(<ItemCount stock={product.stock} onConfirm={handleOnAdd} />)
                }
            </footer>
        </article>
    )
}

export default ItemDetail