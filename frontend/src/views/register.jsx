import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Helmet } from "react-helmet";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);


    const submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setSubmitLoading(true); // Começa o loading

        axiosClient.post("/register", payload).then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrorMessage("Dados inválidos. Verifique seus dados e tente novamente.");
                console.log(response.data.errors);
            } else {
                setErrorMessage("Ocorreu um erro, tente novamente.");
            }
        }).finally(() => {
            setErrorMessage(false)
            setSubmitLoading(false);
        });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <Helmet>
                <title>Cadastre-se</title>
            </Helmet>
            <div className="form">
                <h1 className="title">Criar Novo Usuário</h1>
                <form onSubmit={submit}>
                    <input required ref={nameRef} type="text" placeholder="Name" />
                    <input required ref={emailRef} type="email" placeholder="Email" />
                    <input required ref={passwordRef} type="password" placeholder="Password" />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="btn btn-block" disabled={submitLoading}>
                        {submitLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                    <p className="message">
                        Já Tem Uma Conta? <Link to='/login'>Entrar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}