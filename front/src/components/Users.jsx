import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, useReducer, Fragment} from "react"
import {formatDate} from "../tools/date.js"
import {reducer} from "../tools/reducer.js"
import {initialState} from "../tools/context.js"
import ConfirmationModal from "./ConfirmationModal.jsx"

const Users = () => {
    const [usersList, setUsersList] = useState([])
    const [isDeleted, setIsDeleted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        if(usersList.length === 0){
            axios.get(`${BASE_URL}/getUsers`)
                .then(res => setUsersList(res.data.result))
                .catch(err => console.log(err))
        }
    },[usersList])
    
    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted, setIsDeleted]);
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUsersById`, {id})
        .then(res => {
            const listContact = [...usersList].filter(e => e.id !== id)
            setUsersList(listContact)
            dispatch({type: 'confirmModal'});
            setIsDeleted(true);
        })
        .catch(err => console.log(err))
    }
    
    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'});
    }

    return(
        <Fragment>
        {usersList.length > 0 ? (
            <div>
                <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteUser(state.payload)} onCancel={closeModal}/>
                {isDeleted && (
                    <p>Suppression effectuée avec succès !</p>
                )}
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
                                        <td><button onClick = {() => {openModal(user.id)}}>Supprimer l'utilisateur</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>    
                </div>
            </div>
            ) : (
                <h1>Aucun utilisateur inscrit</h1>
            )}
        </Fragment>
    )
}

export default Users