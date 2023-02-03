import { useState ,useContext} from 'react' 
import { SessionContext } from '../../context/SessionContext'
import { useNavigate,Link } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import { NotificationContext } from '../../notification/NotificationService'
import Loading from '../Loading/Loading'
import { InfoApp } from '../InfoApp/InfoApp'

export const Login = () => {
    useTitle('Inicio', [])
    const [loading, setLoading] = useState(false)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const { getUser,addSession } = useContext(SessionContext)
    const  setNotification  = useContext(NotificationContext)

    const navigate = useNavigate()

    const findUser = () => {
        if(!password) {setNotification('error',"Debe ingresar password.", 5)}
        if(!mail) {setNotification('error',"Debe ingresar mail.", 5)}

        if(mail && password) {
            setLoading(true)
            getUser(mail).then(response => {
                if(!response.error) {
                    if(response.password===password) {
                        addSession(response)
                        setTimeout(() => {
                            navigate('/')
                        }, 5000)
                    }else {setNotification('error',"Password incorrecto.", 5)}
                }else {setNotification('error',response.error, 5)}
            }).catch(error => {
                setNotification('error',error, 5)
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    
    if(loading) {
        return (<Loading message="Iniciando"></Loading>)
    }

    return (
        <div className='cart-container'>
            <div>
                <div>
                    <div>
                        <h1>Inicio de sesion</h1>
                    </div>
                    <form  >
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
                <button className="Button2" onClick={findUser}>Iniciar</button>	
            </div> 
            <div>
                <Link to='/register'>Registrarse</Link>
            </div>
            <InfoApp/>
        </div>
    )
}

