import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
   const [quantity, setQuantity] = useState(initial)

   const increment = () => {
       if(quantity < stock) {
           setQuantity(prev => prev + 1)
       }
   }

   const decrement = () => {
       if(quantity > 1) {
           setQuantity(prev => prev - 1)
       }     
   }

   return(
       <div className='Counter'>      
            <div><p className='Number'>{quantity}</p></div> 
            <div className='Controls'>
                <button className="Button" onClick={decrement}>-</button>
                <button className="Button" onClick={increment}>+</button>
            </div>
            <div>
                <button className="Button" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
            </div>
       </div>
   )

}

export const InputCount = ({onConfirm, stock, initial= 1}) => {
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

export const ButtonCount = ({ onConfirm, stock, initial = 1 }) => {
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

export default ItemCount