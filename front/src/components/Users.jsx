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
            <div className="header-container">
                <h1 className="header-title">Panel admin</h1>
            </div>
            <div className="content-wrapper_header content-wrapper_reviews_contact">
                {usersList.length > 0 ? (
                    <div>
                        <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteUser(state.payload)} onCancel={closeModal}/>
                        {isDeleted && (
                            <p className="delete-message profile-message">Suppression effectuée avec succès !</p>
                        )}
                        <h2 className="title_h2">Tous les utilisateurs</h2>
                        <div>
                            <table className="table">
                                <thead className="table_head">
                                    <tr className="table_row">
                                        <th className="table_header">ID</th>
                                        <th className="table_header">Avatar</th>
                                        <th className="table_header">Date d'inscription</th>
                                        <th className="table_header">Rôle</th>
                                        <th className="table_header">Prénom</th>
                                        <th className="table_header">Nom</th>
                                        <th className="table_header">Éditer</th>
                                        <th className="table_header">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="table_body">
                                    {usersList.map((user, i) => {
                                        return (
                                            <tr key={i} className="table_row">
                                                <td className="table_data">{user.id}</td>
                                                <td className="table_data"><img src={`${BASE_URL}/img/user/${user.avatar}`} alt={`Avatar de ${user.first_name} ${user.last_name}`} width="100" height="100" border= "1px solid black" className="table_avatar"/></td>
                                                <td className="table_data">{formatDate(user.registration_date)}</td>
                                                <td className="table_data">{user.name}</td>
                                                <td className="table_data">{user.first_name}</td>
                                                <td className="table_data">{user.last_name}</td>
                                                <td className="table_data"><NavLink to={`/users/edit/${user.id}`}><button className="profile-button edit">Modifier</button></NavLink></td>
                                                <td className="table_data"><button className="profile-button delete" onClick = {() => {openModal(user.id)}}>Supprimer</button></td>
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
            </div>
        </Fragment>
    )
}

export default Users