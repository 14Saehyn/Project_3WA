import {StoreContext} from "../tools/context.js";
import {useEffect, useState, useContext, Fragment} from "react";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {NavLink} from "react-router-dom";

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        if(state.user.cart_id && state.cart.length === 0){
            axios.post(`${BASE_URL}/getCart`, {cart_id: state.user.cart_id})
            .then(res => {
                // on met le panier dans le Reducer
                dispatch({
                    type:"INIT_CART", payload: res.data.result.cartProduct
                });
            })
            .catch(e => console.log(e))
        }
    },[dispatch, state.user.cart_id, state.cart.length])
    
    useEffect(() => {
        const newTotal = state.cart.reduce((i, currentProduct) => {
            return i + currentProduct.price;
        }, 0);
        setTotal(newTotal);
    }, [dispatch, state.cart])
    
    
    const removeCartProduct = (product) => {
        axios.post(`${BASE_URL}/deleteCartProducts`, {products_id: product.id})
        .then(res => {
            dispatch({ 
                type: "REMOVE_CART_PRODUCT", payload: product
            });
        })
    }
    
    const removeCart = () => {
        axios.post(`${BASE_URL}/deleteCart`, {cart_id: state.user.cart_id})
        .then(res => {
            dispatch({
                type: "REMOVE_CART", payload: {cart: [], user: {...state.user, cart_id: null}}
            });
        })
        .catch(err => console.log(err))
    }
    
    return(
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Panier</h1>
            </div>
            {state.cart.length > 0 ? (
                <div className="cart-container">
                    {state.cart.map((product, i) => {
                        return(
                            <div key={i} className="cart-item">
                                <img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} />
                                <div className="cart-item-details">
                                    <p className="cart_title">{product.title}</p>
                                    <p className="cart_price">{product.price} €</p>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => removeCartProduct(product)} className="profile-button delete">Retirer du panier</button>
                                </div>
                           </div>
                        )
                    })}
                    <p className="total">Total : {total} €</p>
                    <div className="cart-buttons">
                        <NavLink to="/cart/confirmation"><button className="profile-button edit" onClick={removeCart}>Réserver</button></NavLink>
                    </div>
                </div>
            ) : (
                <div className="cart-container">
                    <h2 className="title_h2">Ton panier est vide...</h2>
                </div>
            )}
        </Fragment>
    )
}
export default Cart;