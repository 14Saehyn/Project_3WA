import {initialState} from "./context.js";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "openModal":
            return {
                ...state,
                confirmOpen: true,
                payload: action.payload
            };
        case "closeModal":
            return {
                ...state,
                confirmOpen: false
            };
        case "confirmModal":
            return {
                ...state,
                confirmOpen: false
            };
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isLogged: true
            }
        case "LOGOUT":
            return {
                ...state,
                user: {},
                isLogged: false
            }
        default:
            return state;
    }
}

export {reducer}