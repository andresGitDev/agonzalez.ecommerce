import './Item.css'
import { NavLink } from 'react-router-dom'

const Item = ({id, name, img, price}) => {


    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                <NavLink to={`/detail/${id}`} className='Option'>Ver detalle</NavLink>
            </footer>
        </article>
    )
}

export default Item