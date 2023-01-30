import React from 'react'
import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import ItemList from '../ItemList/ItemList'
import Loading from '../Loading/Loading'

import { useParams } from 'react-router-dom'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {
        document.title = 'Todos los productos'
    }, [])

    useEffect(() => {
        setLoading(true)
        
        const collectionRef = categoryId 
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')
        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
            setProducts(productsAdapted)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })        
    }, [categoryId])


    if(loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <h1>{greeting}</h1>
            <div  className='ItemListContainer' >
                <ItemList products={products} />
            </div >
        </>
    )
}

export default ItemListContainer