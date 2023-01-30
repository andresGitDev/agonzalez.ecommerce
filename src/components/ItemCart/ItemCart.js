import { useNavigate } from 'react-router-dom';
import { React,useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import { NotificationContext } from "../../notification/NotificationService";
    
const ItemCart = ({ id, name, quantity, price }) => {
    const navigate = useNavigate()
    const { deleteItem } = useContext(CartContext)
    const setNotification  = useContext(NotificationContext)

    const handleDeleteItem = () => {
        deleteItem(id)
        setNotification('error',`Se borro ${name} del carrito`, 5)
    }

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>${price}</td>
                <td>${price * quantity}</td>
                <td><button className='Button' onClick={() => navigate(`/detail/${id}`)}>Detalle</button></td>
                <td><button className='Button' onClick={handleDeleteItem}>Borrar</button></td>
            </tr>
        </>

    );
}

export default ItemCart