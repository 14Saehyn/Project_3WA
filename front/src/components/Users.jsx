import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState} from "react"

const Users = () => {
    const [usersList, setUsersList] = useState([])
    
    useEffect(() => {
        if(usersList.length === 0){
            axios.get(`${BASE_URL}/getUsers`)
                .then(res => setUsersList(res.data.result))
                .catch(err => console.log(err))
        }
    },[usersList])
    
    return(
        <div>
            {usersList.map((user, i) => {
                return(
                    <ul key={i}>
                        <li>ID : {user.id}</li>
                        <li>Rôle : {user.name}</li>
                        <li>Prénom : {user.first_name}</li>
                        <li>Nom : {user.last_name}</li>
                        <button><NavLink to={`./edit/${user.id}`}>Modifier</NavLink></button>
                    </ul>
                )
            })}
        </div>
    )
}

export default Users