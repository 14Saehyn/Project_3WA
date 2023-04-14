import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState, useReducer, Fragment} from "react"
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
    
    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted, setIsDeleted]);
    
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }
    
    const deleteReview = (id) => {
        axios.post(`${BASE_URL}/deleteReviewsById`, {id})
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
            <div className="header-container">
                <h1 className="header-title">Panel admin</h1>
            </div>
            <div className="content-wrapper_header content-wrapper_reviews_contact">
                {reviewsList.length > 0 ? (
                <Fragment>
                    <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteReview(state.payload)} onCancel={closeModal}/>
                    {isDeleted && (
                        <p className="delete-message profile-message">Suppression effectuée avec succès !</p>
                    )}
                    <h2 className="title_h2">Tous les avis</h2>
                    <div>
                        <table className="table">
                            <thead className="table_head">
                                <tr className="table_row">
                                    <th className="table_header">Avatar</th>
                                    <th className="table_header">Publié par</th>
                                    <th className="table_header">Produit</th>
                                    <th className="table_header">Titre</th>
                                    <th className="table_header">Contenu</th>
                                    <th className="table_header">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="table_body">
                                {reviewsList.map((review, i) => {
                                    return (
                                        <tr key={i} className="table_row">
                                            <td className="table_data"><img src={`${BASE_URL}/img/user/${review.avatar}`} alt={`Avatar de ${review.first_name} ${review.last_name}`} className=" table_avatar"/></td>
                                            <td className="table_data">{review.first_name} {review.last_name}</td>
                                            <td className="table_data">{review.products_title}</td>
                                            <td className="table_data">{review.title}</td>
                                            <td className="table_data">{truncateText(review.content, 25)}</td>
                                            <td className="table_data"><button className="profile-button delete" onClick = {() => {openModal(review.id)}}>Supprimer</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Fragment>
                ) : (
                    <h2 className="title_h2">Aucun avis pour l'instant...</h2>
                )}
            </div>
        </Fragment>
    )
}

export default Reviews