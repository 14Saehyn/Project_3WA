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
            <div className="header-container">
                <h1 className="header-title">Panel admin</h1>
            </div>
            <div className="content-wrapper_header content-wrapper_reviews_contact">
                {productsList.length > 0 ? (
                    <div>
                        <ConfirmationModal isOpen={state.confirmOpen} onConfirm={() => deleteProduct(state.payload)} onCancel={closeModal}/>
                        {isDeleted && (
                            <p className="delete-message profile-message">Suppression effectuée avec succès !</p>
                        )}
                        <h2 className="title_h2">Tous les produits</h2>
                        <NavLink to={`/addproducts`}><button className="profile-button add">Ajouter un produit</button></NavLink>
                        <div>   
                            <table className="products_table">
                                <thead className="products_table_head">
                                    <tr className="products_table_row">
                                        <th className="products_table_header">ID</th>
                                        <th className="products_table_header">Couverture</th>
                                        <th className="products_table_header">Titre</th>
                                        <th className="products_table_header">Catégorie</th>
                                        <th className="products_table_header">Auteur</th>
                                        <th className="products_table_header">Éditeur</th>
                                        <th className="products_table_header">Statut</th>
                                        <th className="products_table_header">Prix</th>
                                        <th className="products_table_header">Résumé</th>
                                        <th className="products_table_header">Éditer</th>
                                        <th className="products_table_header">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="products_table_body">
                                    {productsList.map((product, i) => {
                                        return (
                                            <tr key={i} className="products_table_row">
                                                <td className="products_table_data">{product.id}</td>
                                                <td className="products_table_data"><img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} width="175" height="263" border= "1px solid black" className= "products_cover"/></td>
                                                <td className="products_table_data">{product.title}</td>
                                                <td className="products_table_data">{product.name}</td>
                                                <td className="products_table_data">{product.author}</td>
                                                <td className="products_table_data">{product.publisher}</td>
                                                <td className="products_table_data">{product.status}</td>
                                                <td className="products_table_data">{product.price} €</td>
                                                <td className="products_table_data">{product.resume}</td>
                                                <td className="products_table_data"><NavLink to={`/products/edit/${product.id}`}><button className="profile-button edit">Modifier</button></NavLink></td>
                                                <td className="products_table_data"><button className="profile-button delete" onClick = {() => {openModal(product.id)}}>Supprimer</button></td>
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
            </div>
        </Fragment>
    )
}

export default Products