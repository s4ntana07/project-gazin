import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    order: null,
    setOrder: () => {},
});

export const ContextProviderProduct = ({children}) => {
    const [order, setOrder] = useState({});

    return (
        <StateContext.Provider value={{
            order,
            setOrder,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)