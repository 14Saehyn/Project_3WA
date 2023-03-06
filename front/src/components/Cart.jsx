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
            {state.cart.length > 0 ? (
                <Fragment>
                    <h1>Votre panier</h1>
                    {state.cart.map((product, i) => {
                        return(
                            <div key={i}>
                                <img src={`${BASE_URL}/img/product/${product.picture}`} alt={`Première de couverture de ${product.title}`} width="95" height="139" border= "1px solid black"/>
                                <p>{product.title}</p>
                                <p>{product.price} €</p>
                                <button onClick={() => removeCartProduct(product)}>Retirer du panier</button>
                           </div>
                        )
                    })}
                    <p>Total : {total} €</p>
                    <NavLink to="/cart/confirmation"><button onClick={removeCart}>Réserver</button></NavLink>
                </Fragment>
            ) : (
                <h1>Votre panier est vide !</h1>
            )}
        </Fragment>
        )
}
export default Cart;