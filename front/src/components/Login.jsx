import {useState, useContext, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {lengthLimit, checkEmpty} from "../tools/checkInputsLogin.js"
import {StoreContext} from "../tools/context.js"
import {Navigate, NavLink, useNavigate} from "react-router-dom"


const Login = () => {
    const initialState = {email:"", password:""};
    const [state, dispatch] = useContext(StoreContext);
    const [info, setInfo] = useState(initialState);
    const [errorMess, setErrorMess] = useState("");
    const navigate = useNavigate();
    
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
            alert ("Vous devez remplir tous les champs")
            return
        }
        
        axios.post(`${BASE_URL}/login`, {email: info.email, password: info.password})
        
        .then(res => {
            setErrorMess(res.data.response)
            if (res.data.response.response) {
                dispatch({type: "LOGIN", payload: res.data.response.userData});
                localStorage.setItem("jwtToken", res.data.response.token);
                axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.response.token;
                setInfo(initialState);
                navigate('/');
            }
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                setErrorMess("E-mail ou mot de passe incorrect");
                setTimeout(() => {
                    setErrorMess("");
                }, 5000);
            }
        })
    }
    
    return (
        <Fragment>
            {state.isLogged ?
            (<Navigate to="/" replace={true} />)
            :
                <Fragment>
                    <div className="header-container">
                        <h1 className="header-title">Se connecter</h1>
                    </div>
                    <Fragment>
                        <div className="content-wrapper_header">
                            <form onSubmit={submit}>
                                <input type="email" name="email" value={info.email} onChange={handleChange} placeholder="Votre e-mail" />
                                <input type="password" name="password" value={info.password} onChange={handleChange} placeholder="Votre mot de passe" />
                                <input type="submit" value="Se connecter" className="text-input text-input_login" />
                            </form>
                            {errorMess.length > 0 && <p>{errorMess}</p>}
                            <div className="user-buttons-container">
                                <p className="signup_text">Pas encore inscrit ?</p>
                                <NavLink to="/signup">
                                    <button className="profile-button edit">S'inscrire</button>
                                </NavLink>
                            </div>
                        </div>
                    </Fragment>
                </Fragment>
            }
        </Fragment>
    )
}

export default Login