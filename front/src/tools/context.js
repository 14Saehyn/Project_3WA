import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    confirmOpen: false,
    payload: null
}

export {StoreContext, initialState}