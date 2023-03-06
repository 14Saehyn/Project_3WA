import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, useReducer, Fragment} from "react"
import {reducer} from "../tools/reducer.js"
import {initialState} from "../tools/context.js"
import ConfirmationModal from "./ConfirmationModal.jsx"
import {formatDate} from "../tools/date.js"

const ContactAdmin = () => {
    const [contactList, setContactList] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        if(contactList.length === 0){
            axios.get(`${BASE_URL}/getContact`)
                .then(res => setContactList(res.data.result))
                .catch(err => console.log(err))
        }
    },[contactList])
    
    const deleteContact = (id) => {
        axios.post(`${BASE_URL}/deleteContactById`, {id})
        .then(res => {
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
            {contactList.length > 0 ? (
            <div>
                <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteContact(state.payload)} onCancel={closeModal}/>
                {isDeleted && (
                    <p>Suppression effectuée avec succès !</p>
                )}
                <h1>Tous les messages</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date d'envoi</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Contenu</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactList.map((contact, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{contact.id}</td>
                                        <td>{formatDate(contact.date)}</td>
                                        <td>{contact.first_name}</td>
                                        <td>{contact.last_name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.content}</td>
                                        <td><button onClick = {() => {openModal(contact.id)}}>Supprimer le message</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>    
                </div>
            </div>
            ) : (
                <h1>Aucun message pour l'instant</h1>
            )}
        </Fragment>
    )
}

export default ContactAdmin