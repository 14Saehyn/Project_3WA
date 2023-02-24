import { useState, useContext, Fragment } from "react"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"
import { lengthLimit, checkEmpty } from "../tools/checkInputsLogin.js"
import { StoreContext } from "../tools/context.js"
import { Navigate, NavLink } from "react-router-dom"


const Login = () => {
    const initialState = {email:"", password:""}
    const [state, dispatch] = useContext(StoreContext)
    const [info, setInfo] = useState(initialState)
    const [errorMess, setErrorMess] = useState("")
    
    const handleChange = (e) => {
        setErrorMess ("")
        if (!lengthLimit(e.target.value, 250)) {
            alert("Erreur : Cela dépasse 250 caractères")
            return
        }
        
        const {name, value} = e.target
        setInfo({...info, [name]: value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if (!checkEmpty(info)) {
            alert ("Le champ ne peut pas être vide")
            return
        }
        
        axios.post(`${BASE_URL}/login`, {email: info.email, password: info.password})
        
        .then(res => {
            setErrorMess(res.data.response)
            if (res.data.response.response) {
                console.log(res.data.response.userData);
                dispatch({type: "LOGIN", payload: res.data.response.userData});
                localStorage.setItem("jwtToken", res.data.response.token);
                axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.response.token;
                setInfo(initialState);
            }
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                setErrorMess("E-mail ou mot de passe incorrect");
            }
        })
    }
    
    console.log(state)
    
    return (
        <Fragment>
            {state.isLogged ?
            (state.user.roles_id === 1 ?
                <Navigate to="/admin" replace={true} />
            :
                <Navigate to="/" replace={true} />)
            :
                <div>
                    <h1>Se connecter</h1>
                    <form onSubmit={submit}>
                        <input type="text" name="email" value={info.email} onChange={handleChange} placeholder="Votre e-mail" />
                        <input type="password" name="password" value={info.password} onChange={handleChange} placeholder="Votre mot de passe" />
                        <input type="submit" />
                    </form>
                    {errorMess.length > 0 && <p>{errorMess}</p>}
                    <div>
                        <p>Pas encore inscrit ?</p>
                        <NavLink to="/signup">
                            S'inscrire
                        </NavLink>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Login