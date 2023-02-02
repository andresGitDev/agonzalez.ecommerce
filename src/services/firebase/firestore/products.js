import { getDocs, collection, query, where ,getDoc, doc} from 'firebase/firestore'
import { createAdaptedProduct } from '../../../adapters/prodAdapter'
import { db } from '../firebaseConfig'

export const getProducts = (categoryId) => {
    return new Promise((resolve, reject) => {
        const collectionRef = categoryId 
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc => {
                return createAdaptedProduct(doc)
            })

            resolve(productsAdapted)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, 'products', id)
        getDoc(docRef).then(response => {
            const productsAdapted= createAdaptedProduct(response)
            resolve(productsAdapted)
        }).catch(error => {
            reject(error)
        })   
    })
}
