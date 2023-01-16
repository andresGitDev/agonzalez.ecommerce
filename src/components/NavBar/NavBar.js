import React from 'react'
import CartWidget from "../CartWidget/CartWidget"
import { NavLink ,useNavigate} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav className='NavBar'>
            <h1 className='Title' onClick={() => navigate('/')}>Ecommerce</h1>
            <div className='Categories'>
                <NavLink to={`/category/celular`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Celulares</NavLink>
                <NavLink to={`/category/tablet`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Tablets</NavLink>
                <NavLink to={`/category/notebook`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Notebooks</NavLink>
            </div>
            <CartWidget />
        </nav>
    )
}

export default NavBar