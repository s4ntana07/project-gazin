import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextproduct";
import { Helmet } from "react-helmet";

export default function Addproduct(){

    const productNameRef = useRef();
    const productPriceRef = useRef();
    const productStockRef = useRef();
    const productTypeRef = useRef();
    const productCompanyRef = useRef();
    const productDescriptionRef = useRef()

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: productNameRef.current.value,
            price: productPriceRef.current.value,
            stock: productStockRef.current.value,
            type: productTypeRef.current.value,
            company: productCompanyRef.current.value,
            description: productDescriptionRef.current.value,
        }
        axiosClient.post("/addproduct",payload).then(({data})=>{
            setUser(data.product);
    }).catch(err => {
        const response = err.response;
    });
}

    return(
        <div className="login-signup-form animated fadeinDown">
            <Helmet>
                Cadastrar Produto
            </Helmet>
            <div className="form">
                <h1 className="title">
                    Cadastrar Produto
                </h1>
                <form onSubmit={Submit}>
                    <input required ref={productNameRef} type="text" placeholder="Nome do Produto" />
                    <input required ref={productPriceRef} type="text" placeholder="Preço do Produto" />
                    <input required ref={productStockRef} type="text" placeholder="Estoque do Produto" />
                    <input required ref={productTypeRef} type="text" placeholder="Tipo do Produto" />
                    <input required ref={productCompanyRef} type="text" placeholder="Fabricante do Produto" />
                    <textarea required ref={productDescriptionRef} type="text" placeholder="Descrição do Produto" />
                    <button className="btn btn-block">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}