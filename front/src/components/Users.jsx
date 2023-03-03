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
            <h1>Tous les utilisateurs</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>Date d'inscription</th>
                                <th>Rôle</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Éditer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.id}</td>
                                        <td><img src={`${BASE_URL}/img/user/${user.avatar}`} alt={`Avatar de ${user.first_name} ${user.last_name}`} width="100" height="100" border= "1px solid black"/></td>
                                        <td>{formatDate(user.registration_date)}</td>
                                        <td>{user.name}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td><NavLink to={`/users/edit/${user.id}`}><button>Modifier</button></NavLink></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>    
                </div>
        </div>        
    )
}

export default Users