import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemDetailContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()

    useEffect(() => {
        document.title = 'Vista de producto'
    }, [])

    useEffect(() => {
        setLoading(true)
        const docRef = doc(db, 'products', productId)
        getDoc(docRef).then(doc => {
            const productAdapted = { id: doc.id, ...doc.data() }
            setProducts(productAdapted)
        }).catch(error => {
            setProducts([])
        }).finally(() => {
            setLoading(false)
        })        
    }, [productId])


    if(loading) {
        return <Loading/>
    }

    

    return (
        <div className='ItemListContainer' >
            <h1>{products?.name}</h1>
            <ItemDetail {...products} />
        </div>
    )
}

export default ItemDetailContainer