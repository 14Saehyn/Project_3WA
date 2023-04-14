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
    
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }
    
    const deleteContact = (id) => {
        axios.post(`${BASE_URL}/deleteContactById`, {id})
        .then(res => {
            const listContact = [...contactList].filter(e => e.id !== id)
            setContactList(listContact)
            dispatch({type: 'confirmModal'});
            setIsDeleted(true);
            setTimeout(() => setIsDeleted(false), 5000);
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
                <h1 className="header-title header-title_responsive">Panel admin</h1>
            </div>
            <div className="content-wrapper_header content-wrapper_reviews_contact">
                {contactList.length > 0 ? (
                    <Fragment>
                        <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteContact(state.payload)} onCancel={closeModal}/>
                        {isDeleted && (
                            <p className="delete-message profile-message">Suppression effectuée avec succès !</p>
                        )}
                        <h2 className="title_h2 title_h2_responsive">Tous les messages</h2>
                        <div>
                            <table className="table">
                                <thead className="table_head">
                                    <tr className="table_row">
                                        <th className="table_header">ID</th>
                                        <th className="table_header">Date d'envoi</th>
                                        <th className="table_header">Prénom</th>
                                        <th className="table_header">Nom</th>
                                        <th className="table_header">Email</th>
                                        <th className="table_header">Contenu</th>
                                        <th className="table_header">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="table_body">
                                    {contactList.map((contact, i) => {
                                        return (
                                            <tr key={i} className="table_row">
                                                <td className="table_data">{contact.id}</td>
                                                <td className="table_data">{formatDate(contact.date)}</td>
                                                <td className="table_data">{contact.first_name}</td>
                                                <td className="table_data">{contact.last_name}</td>
                                                <td className="table_data">{contact.email}</td>
                                                <td className="table_data">{truncateText(contact.content, 25)}</td>
                                                <td className="table_data"><button className="profile-button delete" onClick = {() => {openModal(contact.id)}}>Supprimer</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>    
                        </div>
                    </Fragment>
                ) : (
                    <h2 className="title_h2">Aucun message pour l'instant...</h2>
                )}
            </div>
        </Fragment>
    )
}

export default ContactAdmin