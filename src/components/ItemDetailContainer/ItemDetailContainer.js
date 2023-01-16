import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import { getProducts, getProductById } from '../../services/asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

const ItemDetailContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()

    useEffect(() => {
        document.title = 'Vista de producto'
    }, [])

    useEffect(() => {
        setLoading(true)
        
        const asyncFunction = productId ? getProductById : getProducts

        asyncFunction(productId).then(response => {
            setProducts(response)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })          
    }, [productId])


    if(loading) {
        return <Loading/>
    }

    

    return (
        <div className='ItemListContainer' >
            <h1>{greeting}</h1>
            <ItemDetail product={products} />
        </div>
    )
}

export default ItemDetailContainer