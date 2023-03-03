import {StoreContext} from "../tools/context.js";
import React, {useEffect} from "react";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";

const Cart = () => {
    const [state, dispatch] = React.useContext(StoreContext);
    
    useEffect(() => {
        if(state.user.cart_id && state.cart.length === 0){
            axios.post(`${BASE_URL}/getCart`, {cart_id: state.user.cart_id})
            .then(res => {
                console.log(res)
                // on met le panier dans le Reducer
                dispatch({
                    type:"INIT_CART", payload: res.data.result.cartProduct
                });
            })
            .catch(e => console.log(e))
        }
    },[state.user.cart_id])
    
    
    const removeCart = (product) => {
        axios.post(`${BASE_URL}/deleteCartProducts`, {products_id: product.id})
        .then(res => {
            console.log(res)
            dispatch({ 
            type: "REMOVE_CART", payload: product
            });
        })
    }
    
    console.log(state);
    
    /*const modifyCart = (product) => {
        dispatch({
            type: "MODIFY_CART",
            payload: state.panier
        })
    }*/
    
    return(
        <ul>
            <h1>Votre panier</h1>
            {state.cart.map((product, i) => {
            console.log(product)
                return(
                    <div key = {i}>
                        <p>ID : {product.id}</p>
                        <p>Titre : {product.title}</p>
                        <p>Prix : {product.price} </p>
                        <p>Résumé : {product.resume} </p>
                        <button onClick={() => removeCart(product)}>Retirer du panier</button>
                   </div>
                )
            })}
        </ul>
        )
}
export default Cart;