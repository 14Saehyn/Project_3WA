import {useParams, NavLink} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState, useEffect, Fragment, useContext} from "react";
import {StoreContext} from "../tools/context.js";

const ProductDetails = () => {
    const {id} = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsById`, {id})
            .then(res => {
                const data = res.data.result[0]
                setProductDetails([data])
            })
            .catch(err => console.log(err))
    }, [id]);
    
    const addToCart = (product) => {
        const isInCart = [...state.cart].filter(e => e.id === product.id).length > 0
        if(isInCart) {
            alert("Ce produit est déjà dans votre panier !")
        } else {
            dispatch({
                type: "ADD_CART",
                payload: product
            });
            axios.post(`${BASE_URL}/addToCart`, {
                cart_id: state.user.cart_id,
                products_id: product.id
            })
            .then(() => alert("Le produit a été ajouté au panier"))
            .catch(e => console.log(e))
        }
    };
    
    return(
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Informations</h1>
            </div>
            <div className="product_container">
                {productDetails.map((product, i) => {
                    return(
                    <Fragment key={i}>
                        <h2 className="title_h2">{product.title}</h2>
                        <div className="product_details_container">
                            <div className="product_couv">
                                <img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} className="product_couv_img"/>
                            </div>
                            <div className="product_details">
                                <ul className="product_details_list">
                                    <li className="product_content">Auteur : {product.author}</li>
                                    <li className="product_content">Éditeur : {product.publisher}</li>
                                    <li className="product_content">Statut : {product.status}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="resume_container">
                            <p className="product_content">{product.resume}</p>
                            <p className="product_content product_details_price">{product.price} €</p>
                        </div>
                        {product.status === "Rupture de stock" ? (
                            <p className="product_out_stock">Ce produit est en rupture de stock</p>
                        ) : (
                            <button onClick={() => addToCart(product)} className="profile-button edit">Ajouter au panier</button>
                        )}
                        <NavLink to={`/details/addreviews/${product.id}`}><button className="profile-button review">Donner un avis</button></NavLink>
                        <NavLink to={`/details/reviews/${product.id}`}><button className="profile-button logout">{`Tous les avis`}</button></NavLink>
                    </Fragment>
                    )
                })}
            </div>
        </Fragment>
        
    )
}

export default ProductDetails