import axios from "axios";
import { useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function login(){

    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
        if(Submit == true){
            navigate('/home')
        }
    });
    }

    return(
        <div className="login-signup-form animated fadeinDown">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="form">
                <h1 className="title">
                    Entre Na Sua Conta
                </h1>
                <form onSubmit={Submit}>
                    <input required ref={emailRef} type="email" placeholder="Email" />
                    <input required ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Não Tem Um Usuário? <Link to= '/register'>Criar Usuário</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}