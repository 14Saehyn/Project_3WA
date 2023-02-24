import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    confirmOpen: false,
    payload: null,
    isLogged: false,
    user:{}
}

export {StoreContext, initialState}