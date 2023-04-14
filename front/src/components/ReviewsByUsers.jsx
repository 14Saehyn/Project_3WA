import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, useReducer, Fragment} from "react"
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
    
    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted, setIsDeleted]);
    
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
                {allReviewsUsers.length > 0 ? (
                <div>
                    <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteReview(state.payload)} onCancel={closeModal}/>
                    {isDeleted && (
                        <p className="delete-message profile-message">Suppression effectuée avec succès !</p>
                    )}
                    <h2 className="title_h2">Tous mes avis</h2>
                    <div>
                        <table className="table">
                            <thead className="table_head">
                                <tr>
                                    <th className="table_header_review">Produit</th>
                                    <th className="table_header_review">Titre</th>
                                    <th className="table_header_review">Contenu</th>
                                    <th className="table_header_review">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="table_body">
                                {allReviewsUsers.map((review, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="table_data_review">{review.products_title}</td>
                                            <td className="table_data_review">{review.title}</td>
                                            <td className="table_data_review">{review.content}</td>
                                            <td className="table_data_review"><button className="profile-button delete" onClick = {() => {openModal(review.id)}}>Supprimer</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>    
                    </div>
                </div>
                ) : (
                    <h2 className="title_h2">Vous avez écrit aucun avis pour l'instant</h2>
                )}
            </div>
        </Fragment>
    )
}

export default AllReviewsUsers