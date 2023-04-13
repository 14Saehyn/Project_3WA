import axios from "axios";
import {NavLink} from "react-router-dom";
import {BASE_URL} from '../tools/constante.js';
import {useEffect, useState, useReducer, Fragment} from "react";
import {reducer} from "../tools/reducer.js"
import {initialState} from "../tools/context.js"
import ConfirmationModal from "./ConfirmationModal.jsx"

const Products = () => {
    const [productsList, setProductsList] = useState([])
    const [isDeleted, setIsDeleted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        if(productsList.length === 0){
            axios.get(`${BASE_URL}/getProducts`)
                .then(res => setProductsList(res.data.result))
                .catch(err => console.log(err))
        }
    },[productsList])
    
    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted, setIsDeleted]);
    
    const deleteProduct = (id) => {
        axios.post(`${BASE_URL}/deleteProductsById`, {id})
        .then(res => {
            const listContact = [...productsList].filter(e => e.id !== id)
            setProductsList(listContact)
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
            {productsList.length > 0 ? (
            <div>
                <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteProduct(state.payload)} onCancel={closeModal}/>
                {isDeleted && (
                    <p>Suppression effectuée avec succès !</p>
                )}
                <h1>Tous les produits</h1>
                <NavLink to={`/addproducts`}><button>Ajouter un produit</button></NavLink>
                <div>   
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Couverture</th>
                                <th>Titre</th>
                                <th>Catégorie</th>
                                <th>Auteur</th>
                                <th>Éditeur</th>
                                <th>Statut</th>
                                <th>Prix</th>
                                <th>Résumé</th>
                                <th>Éditer</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((product, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{product.id}</td>
                                        <td><img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} width="175" height="263" border= "1px solid black"/></td>
                                        <td>{product.title}</td>
                                        <td>{product.name}</td>
                                        <td>{product.author}</td>
                                        <td>{product.publisher}</td>
                                        <td>{product.status}</td>
                                        <td>{product.price} €</td>
                                        <td>{product.resume}</td>
                                        <td><NavLink to={`/products/edit/${product.id}`}><button>Modifier</button></NavLink></td>
                                        <td><button onClick = {() => {openModal(product.id)}}>Supprimer le produit</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            ) : (
                <h1>Aucun produit n'a été ajouté</h1>
            )}
        </Fragment>
    )
}

export default Products