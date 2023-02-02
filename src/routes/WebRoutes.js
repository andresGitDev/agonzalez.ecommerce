import {React} from 'react'
import {Routes, Route } from "react-router-dom"
import ItemListContainer from  "../components/ItemListContainer/ItemListContainer"  
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer"
import Cart from "../components/Cart/Cart"
import Checkout from '../components/Checkout/Checkout'


const WebRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ItemListContainer greeting='Todos nuestro products'/>}/>
      <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos filtrados'/>} />
      <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes> 
  );
}

export default WebRoutes