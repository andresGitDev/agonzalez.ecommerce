import {React,useContext} from 'react'
import {Routes, Route } from "react-router-dom"
import ItemListContainer from  "../components/ItemListContainer/ItemListContainer"  
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer"
import Cart from "../components/Cart/Cart"
import Checkout from '../components/Checkout/Checkout'
import { PublicRoute,ProtectedRoute } from './auth/AuthRoutes'
import {Login} from '../components/Login/Login'
import {Register} from '../components/Register/Register'
import { SessionContext } from '../context/SessionContext'

const WebRoutes = () => {
  const { session } = useContext(SessionContext)
  return (
    <Routes>
      <Route element={<ProtectedRoute user={session} redirectPath='/login'/>}>
        <Route path='/' element={<ItemListContainer greeting='Todos nuestro products'/>}/>
        <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos filtrados'/>} />
        <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>

      <Route element={<PublicRoute user={session}/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Route>

    </Routes> 
  );
}

export default WebRoutes