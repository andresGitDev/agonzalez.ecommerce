import {addDoc,collection,getDocs,where,query} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { createAdaptedUser } from '../../../adapters/userAdapter'

export const createUserDB = async (user) => {
    if(!user.name) {return {error: "Falta ingresar nombre."}}
    if(!user.mail) {return {error: "Falta ingresar mail."}}
    if(!user.password) {return {error: "Falta ingresar password."}}

    try {
        const userExist = await getUserDB(user.mail)
        console.log(userExist)
        if(userExist){
            return {error : "Ya existe usuario."}
        } else {
            const userRef = collection(db, 'users')
            const { id }= await addDoc(userRef, user)
            return {id : id}            
        }
    } catch (error) {
        return {error : error}
    }
}

export const getUserDB = (mail) => {
    return new Promise((resolve, reject) => {
        const collectionRef = query(collection(db, 'users'), where('mail', '==', mail))
        getDocs(collectionRef).then(response => {
            const userAdapted = response.docs.map(doc => {
                return createAdaptedUser(doc)
            })
            resolve(userAdapted[0])
        }).catch(error => {
            resolve(null)
        })
    })
}