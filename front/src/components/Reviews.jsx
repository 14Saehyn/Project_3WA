import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, useReducer} from "react"
import {reducer} from "../tools/reducer.js"
import {initialState} from "../tools/context.js"
import ConfirmationModal from "./ConfirmationModal.jsx"

const Reviews = () => {
    const [reviewsList, setReviewsList] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        if(reviewsList.length === 0){
            axios.get(`${BASE_URL}/getReviews`)
                .then(res => setReviewsList(res.data.result))
                .catch(err => console.log(err))
        }
    },[reviewsList])
    
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
            <h1>Tous les avis</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Publié par : </th>
                            <th>Produit</th>
                            <th>Titre</th>
                            <th>Contenu</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {reviewsList.map((review, i) => {
                            return (
                                <tr key={i}>
                                    <td><img src={`${BASE_URL}/img/user/${review.avatar}`} alt={`Avatar de ${review.first_name} ${review.last_name}`} width="75" height="75" border= "1px solid black"/></td>
                                    <td>{review.first_name} {review.last_name}</td>
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

export default Reviews