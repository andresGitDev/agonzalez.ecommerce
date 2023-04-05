import {React} from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import  WebRoutes  from './routes/WebRoutes.js';
import {SessionProvider} from './context/SessionContext'

function App() {
  return (
    <div className='App'>
      <NotificationProvider>
        <CartProvider>
          <SessionProvider>
            <BrowserRouter>
              <NavBar />
              <WebRoutes/>
            </BrowserRouter>
          </SessionProvider>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
