import {React} from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.js';
import Cart from './components/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import Checkout from './components/Checkout/Checkout'

function App() {
  return (
    <div className='App'>
      <NotificationProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting='Todos nuestro products'/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos filtrados'/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes> 
         </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;