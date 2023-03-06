import {BASE_URL} from '../tools/constante.js';
import {useEffect, useState, Fragment, useReducer} from "react";
import axios from 'axios';
import {initialState} from "../tools/context.js";
import {reducer} from "../tools/reducer.js";
import {useParams, NavLink} from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal.jsx";
import UploadFile from "./UploadFile.jsx";

const UserProfile = () => {
    const [userInfos, setUserInfos] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState);
    const {id} = useParams()
    const [successMessage, setSuccessMessage] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUserInfos({ ...userInfos, [name]: value })
    }

    useEffect(() => {
        axios.post(`${BASE_URL}/getUsersById`, {id})
            .catch(err => console.log(err))
            .then(res => {
                const data = res.data.result[0]
                data.birthdate = data.birthdate.split('T')[0]
                setUserInfos(data)
            })
    }, [id])

    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/editUsersById`, {...userInfos})
        .then (res => {
            setSuccessMessage("Informations modifiées avec succès !");
        })
        .catch(err => console.log(err))
    }

    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUsersById`, {id})
        .then(res => {
            setIsDeleted(true);
            setIsDeleting(false);
            dispatch({type: 'confirmModal'});
        })
        .catch(err => console.log(err))
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'});
    }
    
    return (
        <Fragment>
            <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteUser(state.payload)} onCancel={closeModal}/>
            {userInfos && (
                <Fragment>
                {!isDeleting && successMessage && !isDeleted && (
                    <p>{successMessage}</p>
                )}
                {isDeleted && (
                    <p>Suppression effectuée avec succès !</p>
                )}
                <img src={`${BASE_URL}/img/user/${userInfos.avatar}`} alt={`Avatar de ${userInfos.first_name} ${userInfos.last_name}`} width="100" height="100" border= "1px solid black"/>
                <UploadFile />
                <h2>Modifier les informations</h2>
                <form onSubmit={submit}>
                    <label>Prénom : </label>
                    <input type='text' name='first_name' placeholder='Nouveau prénom' onChange={handleChange} value={userInfos.first_name} />
                    <label>Nom : </label>
                    <input type='text' name='last_name' placeholder='Nouveau nom' onChange={handleChange} value={userInfos.last_name} />
                    <label>E-mail : </label>
                    <input type='text' name='email' placeholder='Nouvel e-mail' onChange={handleChange} value={userInfos.email} />
                    <label>Date de naissance :  </label>
                    <input type='date' name='birthdate' onChange={handleChange} value={userInfos.birthdate} min="1923-01-01" max="2024-01-01" />
                    <input type='submit' value="Modifier"/>
                    <NavLink to="/logout"><button>Se déconnecter</button></NavLink>
                    <button onClick = {() => {
                    setIsDeleting(true);
                    openModal(userInfos.id)}}>Supprimer le compte</button>
                </form>
                <NavLink to={`/reviews/${userInfos.id}`}><button>Voir tous mes avis</button></NavLink>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserProfile
