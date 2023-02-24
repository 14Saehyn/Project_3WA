import axios from "axios"
import {NavLink} from "react-router-dom"
import {BASE_URL} from '../tools/constante.js'
import {useEffect, useState} from "react"

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
            {productsList.map((product, i) => {
            console.log(product.picture)
                return(
                    <ul key={i}>
                        <img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} width="175" height="263" border= "1px solid black"/>
                        <li>ID : {product.id}</li>
                        <li>Titre : {product.title}</li>
                        <li>Catégorie : {product.name}</li>
                        <li>Auteur : {product.author}</li>
                        <li>Éditeur : {product.publisher}</li>
                        <li>Statut : {product.status}</li>
                        <li>Prix : {product.price} €</li>
                        <li>Résumé : {product.resume}</li>
                        <NavLink to={`/products/edit/${product.id}`}><button>Modifier</button></NavLink>
                    </ul>
                )
            })}
        </div>
    )
}

export default Products