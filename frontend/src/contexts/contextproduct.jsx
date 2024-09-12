import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    product: null,
    setProduct: () => {},
});

export const ContextProviderProduct = ({children}) => {
    const [product, setProduct] = useState({});

    return (
        <StateContext.Provider value={{
            product,
            setProduct,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)