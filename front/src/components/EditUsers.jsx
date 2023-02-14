import {useParams, NavLink} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment, useReducer} from "react"
import {initialState} from "../tools/context.js"
import {reducer} from "../tools/reducer.js"
import ConfirmationModal from "./ConfirmationModal.jsx"

const EditUsers = () => {
    const {id} = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState('');
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getUsersById`, {id})
            .then(res => {
                const data = res.data.result[0]
                data.birthdate = data.birthdate.split('T')[0]
                setUser(data)
                
            })
            .catch(err => console.log(err))
    },[id])
    
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    
    const openModal = (id) => {
        dispatch({type: 'openModal', payload: id})
    }
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUsersById`, {id})
        .then(res => {
            console.log(res)
            dispatch({type: 'confirmModal'})
        })
        .catch(err => console.log(err))
    }
    
    const closeModal = () => {
        dispatch({type: 'closeModal'})
    }
    
    const submit = (e) => {
        e.preventDefault()
        console.log(user)
        axios.post(`${BASE_URL}/editUsersById`, {...user})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
    console.log(user)
    
    return (
        <Fragment>
            <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteUser(state.payload)} onCancel={closeModal}/>
            { user && (
                <form onSubmit={submit}>
                    <input type='text' name='first_name' placeholder='Nouveau prénom' onChange={handleChange} value={user.first_name} />
                    <input type='text' name='last_name' placeholder='Nouveau nom' onChange={handleChange} value={user.last_name} />
                    <input type='text' name='email' placeholder='Nouvel e-mail' onChange={handleChange} value={user.email} />
                    <input type='text' name='password' placeholder='Nouveau mot de passe' onChange={handleChange} value={user.password} />
                    <input type='date' name='birthdate' onChange={handleChange} value={user.birthdate} min="1923-01-01" max="2024-01-01" />
                    <select  name='roles_id' onChange={handleChange} value={user.roles_id}>
                        <option value='1'>Admin</option>
                        <option value='2'>User</option>
                    </select>
                    <button><NavLink to={`/avatar/${user.id}`}>Modifier l'avatar</NavLink></button>
                    <input type='submit' />
                    <button onClick = {() => openModal(user.id)}>Supprimer</button>
                </form>
            )}
        </Fragment>
    )
}

export default EditUsers