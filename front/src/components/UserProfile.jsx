import {BASE_URL} from '../tools/constante.js';
import {useEffect, useState, Fragment, useReducer} from "react";
import axios from 'axios';
import {initialState} from "../tools/context.js";
import {reducer} from "../tools/reducer.js";
import {useParams, NavLink, useNavigate} from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal.jsx";
import UploadFile from "./UploadFile.jsx";

const UserProfile = () => {
    const [userInfos, setUserInfos] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState);
    const {id} = useParams()
    const [successMessage, setSuccessMessage] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUserInfos({ ...userInfos, [name]: value })
    }

    useEffect(() => {
        axios.post(`${BASE_URL}/getUsersById`, {id})
            .catch(err => console.log(err))
            .then(res => {
                const data = res.data.result[0]
                setUserInfos(data)
            })
    }, [id])

    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }
    
    useEffect(() => {
        let timeout;
        if (successMessage) {
            timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [successMessage, setSuccessMessage]);

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
            setIsDeleting(false);
            dispatch({type: 'confirmModal'});
            alert("Suppression effectuée avec succès !");
            logoutAndRedirect();
        })
        .catch(err => console.log(err))
    };
    
    const logoutAndRedirect = () => {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        navigate('/login');
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'});
    }
    
    return (
        <Fragment>
            <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteUser(state.payload)} onCancel={closeModal}/>
            {userInfos && (
                <Fragment>
                    <div className="header-container">
                        <h1 className="header-title">Mon profil</h1>
                    </div>
                    <div className="content-wrapper_header">
                        {!isDeleting && successMessage && (
                            <p className="success-message profile-message">{successMessage}</p>
                        )}
                        <img src={`${BASE_URL}/img/user/${userInfos.avatar}`} alt={`Avatar de ${userInfos.first_name} ${userInfos.last_name}`} className="avatar"/>
                        <UploadFile />
                        <div className="user-infos-container">
                            <h2 className="title_h2">Modifier les informations</h2>
                            <form onSubmit={submit}>
                                <input type='text' name='first_name' placeholder='Nouveau prénom' onChange={handleChange} value={userInfos.first_name} />
                                <input type='text' name='last_name' placeholder='Nouveau nom' onChange={handleChange} value={userInfos.last_name} />
                                <input type='text' name='email' placeholder='Nouvel e-mail' onChange={handleChange} value={userInfos.email} />
                                <input type='submit' value="Modifier" className="text-input"/>
                            </form>
                        </div>
                        <div className="user-buttons-container">
                            <NavLink to={`/reviews/${userInfos.id}`}>
                                <button className="profile-button review">Voir tous mes avis</button>
                            </NavLink>
                             <NavLink to="/logout">
                                <button className="profile-button logout">Se déconnecter</button>
                             </NavLink>
                            <button onClick = {() => {setIsDeleting(true); openModal(userInfos.id)}} className="profile-button delete">Supprimer le compte</button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserProfile