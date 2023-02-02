import React from 'react'
import './ItemListContainer.css'
import ItemList from '../ItemList/ItemList'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import { getProducts } from '../../services/firebase/firestore/products'
import {useAsync} from "../../hooks/useAsync"

const ItemListContainer = ({ greeting }) => {
    useTitle("Todos los productos",[])

    const { categoryId } = useParams()

    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])


    if(loading) {
        return <Loading message="Cargando"/>
    }

    if(error) {
        return <Loading message="Error : no se pudo cargar los productos"/>
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