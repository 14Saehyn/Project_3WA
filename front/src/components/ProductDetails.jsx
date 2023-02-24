import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect, Fragment} from "react"

const ProductDetails = () => {
    const {id} = useParams();
    const [productDetails, setProductDetails] = useState([]);
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsById`, {id})
            .then(res => {
                const data = res.data.result[0]
                setProductDetails([data])
            })
            .catch(err => console.log(err))
    }, [id])
    
    return(
        <Fragment>
            {productDetails.map((product, i) => {
            console.log(product.picture)
                return(
                <Fragment key={i}>
                    <h1>{product.title}</h1>
                    <ul>
                        <img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} width="175" height="263" border= "1px solid black"/>
                        <li>Auteur : {product.author}</li>
                        <li>Éditeur : {product.publisher}</li>
                        <li>Statut : {product.status}</li>
                        <li>Prix : {product.price} €</li>
                        <li>Résumé : {product.resume}</li>
                          <button>Ajouter au panier</button>
                    </ul>
                </Fragment>
                )
            })}
        </Fragment>
    )
}

export default ProductDetails