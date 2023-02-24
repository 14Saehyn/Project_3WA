import {React, Fragment} from 'react' 
import axios from "axios"
import {StoreContext} from "../tools/context.js"

const Deconnexion = () => {
    const [state, dispatch] = React.useContext(StoreContext) 
    
    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({type: "LOGOUT"})
        delete axios.defaults.headers.common['Authorization']
    }
    
    return(
        <Fragment>
            <p>Vous êtes connecté(e) {state.user.first_name} {state.user.last_name}</p>
            <button onClick={logout}>Déconnexion</button>
        </Fragment> 
    )
}

export default Deconnexion