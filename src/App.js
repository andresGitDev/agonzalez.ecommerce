import './App.css';
import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className='App'>
        { <NavBar /> }
        { <ItemListContainer greeting="Bienvenidos" /> }
    </div>
  );
}

export default App;