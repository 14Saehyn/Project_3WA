import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    user: {
        admin: false,
        user: false,
        id: null
    },
    confirmOpen: false,
    payload: null,
    cart: [],
    product: []
}

export {StoreContext, initialState}