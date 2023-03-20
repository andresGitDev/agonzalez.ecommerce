import {React,useContext} from 'react'
import CartWidget from "../CartWidget/CartWidget"
import { NavLink ,useNavigate,Link} from 'react-router-dom'
import './NavBar.css'
import { CartContext } from '../../context/CartContext'
import { SessionContext } from '../../context/SessionContext'
import { InfoApp } from '../InfoApp/InfoApp'
//import {createProductsInDB} from '../../services/asyncMock'

const NavBar = () => {
    const navigate = useNavigate()
    const { totalQuantity } = useContext(CartContext)
    const { session ,clearSession} = useContext(SessionContext)

    return (
        (session) && (<nav className='NavBar'>
            <h1 className='Title' onClick={() => navigate('/')}>Ecommerce</h1>
            
            <div className='Categories'>
               {/* <NavLink><button onClick={createProductsInDB}>Generar productos</button></NavLink>  */}
                <NavLink to={`/category/clothing`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Ropa</NavLink>
                <NavLink to={`/category/jewelery`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Joyeria</NavLink>
                <NavLink to={`/category/electronics`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Electronicos</NavLink>
                <NavLink className='Option2' onClick={clearSession}>Cerrar Sesion</NavLink>
            </div>
            <Link to='/cart'><CartWidget totalQuantity={totalQuantity} /></Link>
            <InfoApp/>
        </nav>)
    )
}

export default NavBar