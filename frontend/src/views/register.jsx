import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Helmet } from "react-helmet";

export default function Register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="login-signup-form animated fadeinDown">
            <Helmet>
                Cadastre-se
            </Helmet>
            <div className="form">
                <h1 className="title">
                    Criar Novo Usuário
                </h1>
                <form onSubmit={Submit}>
                    <input required ref={nameRef} type="name" placeholder="Name" />
                    <input required ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Cadastrar</button>
                    <p className="message">
                        Já Tem Uma Conta? <Link to= '/login'>Entrar</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}