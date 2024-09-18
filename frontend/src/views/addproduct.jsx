import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextproduct";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

export default function AddProduct() {
    const { setUser } = useStateContext();
    const navigate = useNavigate(); // Inicializando useNavigate
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const productNameRef = useRef();
    const productPriceRef = useRef();
    const productStockRef = useRef();
    const productTypeRef = useRef();
    const productCompanyRef = useRef();
    const productDescriptionRef = useRef();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: productNameRef.current.value,
            price: productPriceRef.current.value,
            stock: productStockRef.current.value,
            type: productTypeRef.current.value,
            company: productCompanyRef.current.value,
            description: productDescriptionRef.current.value,
        };

        setSubmitLoading(true);
        setSuccessMessage("");

        axiosClient.post("/addproduct", payload)
            .then(({ data }) => {
                setUser(data.product);
                navigate('/products');
                setSuccessMessage("Produto cadastrado com sucesso!"); // Mensagem de sucesso //
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrorMessage("Dados inválidos.");
                    console.log(response.data.errors);
                } else {
                    setErrorMessage("Ocorreu um erro, tente novamente.");
                }
            })
            .finally(() => {
                setErrorMessage(false)
                setSubmitLoading(false);
            });
    };

    return (
        <div className="addproduct-form animated fadeinDown">
            <Helmet>
                <title>Cadastrar Produto</title>
            </Helmet>
            <div className="form">
                <h1 className="title">Cadastrar Produto</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome
                        <input required ref={productNameRef} type="text" placeholder="Nome do Produto" />
                    </label>
                    <label>
                        Preço
                        <input required ref={productPriceRef} type="text" placeholder="Preço do Produto" />
                    </label>
                    <label>
                        Estoque
                        <input required ref={productStockRef} type="text" placeholder="Estoque do Produto" />
                    </label>
                    <label>
                        Tipo
                        <input required ref={productTypeRef} type="text" placeholder="Tipo do Produto" />
                    </label>
                    <label>
                        Fabricante
                        <input required ref={productCompanyRef} type="text" placeholder="Fabricante do Produto" />
                    </label>
                    <label>
                        Descrição
                        <textarea required ref={productDescriptionRef} placeholder="Tamanho, Cor, Qualidade e etc.." />
                    </label>
                    <button className="btn btn-block" disabled={submitLoading}>
                        {submitLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}