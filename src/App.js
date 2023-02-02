import {React} from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import  WebRoutes  from './routes/WebRoutes.js';

function App() {
  return (
    <div className='App'>
      <NotificationProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <WebRoutes/>
          </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;