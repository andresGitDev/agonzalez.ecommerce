
import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { createAdaptedOrder } from "../../../adapters/orderAdapter"

export const createOrder = async (name,phone,email,direction,cart,totalPay) => {
    const newOrder = createAdaptedOrder(name,phone,email,direction,cart,totalPay)
    const batch = writeBatch(db)

    const ids = cart.map(prod => prod.id)
    const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))

    const productsAddedToCartFromFirestore = await getDocs(productsRef)
    const { docs } = productsAddedToCartFromFirestore
    const outOfStock = []

    docs.forEach(doc => {
        const dataDoc = doc.data()
        const stockDb = dataDoc.stock

        const productAddedToCart = cart.find(prod => prod.id === doc.id)
        const prodQuantity = productAddedToCart.quantity

        if(stockDb >= prodQuantity) {
            batch.update(doc.ref, { stock: stockDb - prodQuantity})
        } else {
            outOfStock.push({ id: doc.id, ...dataDoc})
        }
    })
    
    if(outOfStock.length === 0) {
        await batch.commit()
        const orderRef = collection(db, 'orders')
        const { id }= await addDoc(orderRef, newOrder)
        return id
    } else {
        return 'Hay productos en el carrito que no tienen stock.'
    }
}