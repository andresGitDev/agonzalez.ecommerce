import { useState,useContext } from 'react' 
import { useNavigate,Link } from "react-router-dom"
import { useTitle } from '../../hooks/useTitle'
import ItemCart from '../ItemCart/ItemCart'
import Loading from '../Loading/Loading'
import { CartContext } from '../../context/CartContext'
import { NotificationContext } from "../../notification/NotificationService";
import "./Cart.css"


const Cart = () => {
    useTitle('Carrito', [])
    const [loading] = useState(false)

    const navigate = useNavigate()
    const { totalQuantity,totalPay ,cart,clearAll} = useContext(CartContext)
    const  setNotification  = useContext(NotificationContext)

    const handleClear = () => {
        clearAll()
        setNotification('error',`Se vacio el carrito`, 5)
    }

    if(loading) {
        return (<Loading message="Cargando Carrito"></Loading>)
    }


    if(!totalQuantity) {
        return (
            <div className='cart-container'>
                <header className="Header">
                    <h2 className="ItemHeader">
                        Carrito Vacio
                    </h2>
                </header>
                <div>
                    <button className="Button2" onClick={() => navigate('/')}>
                        Buscar productos
                    </button>
                </div>
            </div>
        )
    } 


    return (
        <>

            <div className='cart-container'>
                <table>
                    <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {cart.map(prod => <ItemCart key={prod.id} {...prod}/>)}
                </table>
            </div>
            {totalPay > 0 &&
                <div className='check-out'>
                    <p className='check-out__total-price'>El total de tu compra es ${totalPay}</p>
                    <div className='check-out__btn'>
                        <Link to='/checkout'><button className="Button" variant="contained">Finalizar compra</button></Link>
                        <button className="Button" variant="outlined" onClick={handleClear}>Eliminar todo</button>
                    </div>
                </div>
            }
        </>
    )    
    
    
}

export default Cart