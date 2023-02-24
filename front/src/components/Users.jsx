import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState} from "react"
import {formatDate} from "../tools/date.js"

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
            console.log(user.avatar)
                return(
                    <ul key={i}>
                        <img src={`${BASE_URL}/img/user/${user.avatar}`} alt={`Avatar de ${user.first_name} ${user.last_name}`} width="100" height="100" border= "1px solid black"/>
                        <li>ID : {user.id}</li>
                        <li>Date d'inscription : {formatDate(user.registration_date)}</li>
                        <li>Rôle : {user.name}</li>
                        <li>Prénom : {user.first_name}</li>
                        <li>Nom : {user.last_name}</li>
                        <NavLink to={`/users/edit/${user.id}`}><button>Modifier</button></NavLink>
                    </ul>
                )   
            })}
        </div>
    )
}

export default Users