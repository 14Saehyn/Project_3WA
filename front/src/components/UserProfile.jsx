import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, Fragment, useReducer} from "react"
import axios from 'axios'
import {initialState} from "../tools/context.js"
import {reducer} from "../tools/reducer.js"
import {useParams} from "react-router-dom"
import ConfirmationModal from "./ConfirmationModal.jsx"
import UploadFile from "./UploadFile.jsx"

const UserProfile = () => {
    const [userInfos, setUserInfos] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState);
    const {id} = useParams()
    const [successMessage, setSuccessMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserInfos({ ...userInfos, [name]: value })
        console.log(userInfos)
    }

    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getUsersById`, {id})
            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                const data = res.data.result[0]
                data.birthdate = data.birthdate.split('T')[0]
                setUserInfos(data)
            })
            .then(res => setIsLoading(false))
    }, [id])

    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(userInfos)
        axios.post(`${BASE_URL}/editUsersById`, {...userInfos})
        .then (res => {
            console.log(res);
            setSuccessMessage("Informations modifiées avec succès !");
        })
        .catch(err => console.log(err))
    }

    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUsersById`, {id})
        .then(res => {
            console.log(res);
            setIsDeleted(true);
            setIsDeleting(false);
            dispatch({type: 'confirmModal'});
        })
        .catch(err => console.log(err))
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'});
    }

    if (isLoading || !userInfos) {
        return <div>Chargement des informations...</div>
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
                    <label>Rôle : </label>
                    <select  name='roles_id' onChange={handleChange} value={userInfos.roles_id}>
                        <option value='1'>Admin</option>
                        <option value='2'>User</option>
                    </select>
                    <input type='submit' />
                    <button onClick = {() => {
                    setIsDeleting(true);
                    openModal(userInfos.id)}}>Supprimer</button>
                </form>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserProfile
