import React, { createContext, useReducer } from "react";
import reducer from './reducer'

export const Context = createContext();


function Store({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        cart: JSON.parse(localStorage.getItem('store')) || [],
        url: new URL(window.location.href),
        token: localStorage.getItem('token') || ''
    }
    )
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
};

export default Store;