import './ItemDetailContainer.css'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useTitle } from '../../hooks/useTitle'
import { getProductById } from '../../services/firebase/firestore/products'
import { useAsync } from '../../hooks/useAsync'

const ItemDetailContainer = () => {
    useTitle('Vista de producto', [])
    const { productId } = useParams()

    const getProductWithId = () => getProductById(productId)

    const { data: products, error, loading } = useAsync(getProductWithId, [productId])


    if(loading) {
        return <Loading message="Cargando"/>
    }

    if(error) {
        return <Loading message="Error : no se pudo cargar el producto."/>
    }

    return (
        <div className='ItemListContainer' >
            <h1>{products?.name}</h1>
            <ItemDetail {...products} />
        </div>
    )
}

export default ItemDetailContainer