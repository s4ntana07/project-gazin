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
    const [submitLoading, setSubmitLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setSubmitLoading(true); // começa o loading de submissão
        setSuccessMessage("");
        setErrorMessage("");

        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrorMessage("Email ou senha inválidos.");
                } else {
                    setSuccessMessage("Logado com sucesso!!");
                    setTimeout(() => navigate('/home'), 2000);
                }
            })
            .finally(() => {
                setSubmitLoading(false); // para o loading após a requisição
            });
    };

    return (
        <center>
            <div className="login-signup-form animated fadeinDown">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className="form">
                    <center>
                        <div>
                            <h1 className="title">Entrar na sua Conta</h1>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            {successMessage && <p className="success-message">{successMessage}</p>}
                        </div>
                    </center>
                    <form onSubmit={submit}>
                        <input required ref={emailRef} type="email" placeholder="Email" />
                        <input required ref={passwordRef} type="password" placeholder="Senha" />
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