import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Helmet } from "react-helmet";

export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controle de loading
    const [submitLoading, setSubmitLoading] = useState(false); // Estado para controle de loading na submissão

    const submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setSubmitLoading(true); // Começa o loading de submissão

        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/'); // Redireciona após o login
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrorMessage("Email ou senha inválidos.");
                } else {
                    setErrorMessage("Ocorreu um erro, tente novamente.");
                }
            })
            .finally(() => {
                setSubmitLoading(false); // Para o loading após a requisição
            });
    };

    return (
        <center>
            <div className="login-signup-form animated fadeinDown">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className="form">
                    <h1 className="title">Entre Na Sua Conta</h1>
                    <form onSubmit={submit}>
                        <input required ref={emailRef} type="email" placeholder="Email" />
                        <input required ref={passwordRef} type="password" placeholder="Password" />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="btn btn-block" disabled={submitLoading}>
                                {submitLoading ? 'Entrando...' : 'Entrar'}
                            </button>

                        <p className="message">
                            Não Tem Um Usuário? <Link to='/register'>Criar Usuário</Link>
                        </p>
                    </form>
                </div>
            </div>
        </center>
    );
}