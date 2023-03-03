import {useParams, NavLink} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState, useEffect, Fragment, useContext} from "react";
import {StoreContext} from "../tools/context.js";

const ProductDetails = () => {
    const {id} = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [state, dispatch] = useContext(StoreContext);
    
    console.log(state)

    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsById`, {id})
            .then(res => {
                const data = res.data.result[0]
                setProductDetails([data])
            })
            .catch(err => console.log(err))
    }, [id]);
    
    const addToCart = (product) => {
        dispatch({
            type: "ADD_CART",
            payload: product
        });
        axios.post(`${BASE_URL}/addToCart`, {
            cart_id: state.user.cart_id,
            products_id: product.id
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))
    };
    
    return(
        <Fragment>
            {productDetails.map((product, i) => {
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
                         <button onClick={() => addToCart(product)}>Ajouter au panier</button>
                    </ul>
                    <NavLink to={`/addreviews/${product.id}`}><button>Donner un avis</button></NavLink>
                    <NavLink to={`/details/reviews/${product.id}`}><button>{`Voir les avis de ${product.title}`}</button></NavLink>
                </Fragment>
                )
            })}
        </Fragment>
        
    )
}

export default ProductDetails