import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, useReducer} from "react"
import {reducer} from "../tools/reducer.js"
import {initialState} from "../tools/context.js"
import ConfirmationModal from "./ConfirmationModal.jsx"

const AllReviewsUsers = () => {
    const {users_id} = useParams();
    const [allReviewsUsers, setAllReviewsUsers] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getReviewsByUsersId/`, {users_id})
            .then(res => setAllReviewsUsers(res.data.result))
            .catch(err => console.log(err))
    }, [users_id])
    
    const deleteReview = (id) => {
        axios.post(`${BASE_URL}/deleteReviewsById`, {id})
        .then(res => {
            dispatch({type: 'confirmModal'});
            console.log(res);
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
        <div>
            <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteReview(state.payload)} onCancel={closeModal}/>
            {isDeleted && (
                <p>Suppression effectuée avec succès !</p>
            )}
            <h1>Tous mes avis</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Titre</th>
                            <th>Contenu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allReviewsUsers.map((review, i) => {
                            return (
                                <tr key={i}>
                                    <td>{review.products_title}</td>
                                    <td>{review.title}</td>
                                    <td>{review.content}</td>
                                    <td><button onClick = {() => {openModal(review.id)}}>Supprimer l'avis</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>    
            </div>
        </div>
    )
}

export default AllReviewsUsers