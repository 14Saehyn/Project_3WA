import axios from "axios";
import {NavLink} from "react-router-dom";
import {BASE_URL} from '../tools/constante.js';
import {useEffect, useState} from "react";

const Products = () => {
    const [productsList, setProductsList] = useState([])
    
    useEffect(() => {
        if(productsList.length === 0){
            axios.get(`${BASE_URL}/getProducts`)
                .then(res => setProductsList(res.data.result))
                .catch(err => console.log(err))
        }
    },[productsList])
    
    return(
        <div>
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Products