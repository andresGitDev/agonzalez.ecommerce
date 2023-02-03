import  {React, useState ,createContext} from 'react'
import { createUserDB,getUserDB } from '../services/firebase/firestore/users'

export const SessionContext =createContext()

export const SessionProvider = ({ children }) => {
    const [session,setSession] = useState(null)

    const addSession =(user) =>{
        setSession(user)
    }

    const clearSession = () => {
        setSession(null)
    }

    const createNewUser = (user) => {
        return createUserDB(user)
    }    

    const getUser = async (mail) =>{
        try {
            const user = await getUserDB(mail)
            if(user){
                return user
            } else {
                return {error : "No existe la cuenta"}            
            }
        } catch (error) {
            return {error : error}
        }
    }

    return (
    <SessionContext.Provider value={{addSession,clearSession,createNewUser,getUser,session}}>
        { children }
    </SessionContext.Provider>
    )
}