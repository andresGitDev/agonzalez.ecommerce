import { useState ,useContext} from 'react' 
import { SessionContext } from '../../context/SessionContext'
import { useNavigate,Link } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import { NotificationContext } from '../../notification/NotificationService'
import Loading from '../Loading/Loading'
import { InfoApp } from '../InfoApp/InfoApp'

export const Register = () => {
    useTitle('Registro', [])
    const [loading, setLoading] = useState(false)
    const [userId,setUserId] = useState('')
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const { createNewUser } = useContext(SessionContext)
    const  setNotification  = useContext(NotificationContext)

    const navigate = useNavigate()

    const createUser = () => {
        setLoading(true)
        const data = {name, mail, password}
        createNewUser(data).then(response => {
            console.log(response)
            if(response.id) {
                setUserId(response.id)
                setTimeout(() => {
                    navigate('/')
                }, 5000)  
            }else {setNotification('error',response.error, 5)}
        }).catch(error => {
            console.log(error)
            setNotification('error',error, 5)
        }).finally(() => {
            setLoading(false)
        })
    }
    
    if(loading) {
        return (<Loading></Loading>)
    }

    if(userId) {
        return (
            <div className='cart-container'>
                <h1>El Id de su usuario es: {userId}</h1>
            </div>
        )
    }    
    return (
        <div className='cart-container'>
            <div>
                <div>
                    <div>
                        <h1>Registro de usuario</h1>
                    </div>
                    <form  >
                        <div>
                            <input type="text" value={name} placeholder="Nombre" onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" value={mail} placeholder="Mail" onChange={(event) => setMail(event.target.value)}/>
                        </div>                        
                        <div>
                            <input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                    </form>	
                </div>
            </div>
            <div>
                <button className="Button2" onClick={createUser}>Crear cuenta</button>	
            </div> 
            <div>
                <Link to='/login'>Ya tengo cuenta</Link>
            </div> 
            <InfoApp/>           
        </div>
    )
}

