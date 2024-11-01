import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextproduct";
import { useNavigate } from "react-router-dom";

export default function MakeOrder() {
  const { setUser } = useStateContext();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const productRef = useRef();
  const quantityRef = useRef();
  const addressRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      product: productRef.current.value,
      quantity: quantityRef.current.value,
      address: addressRef.current.value,
    };

    setSubmitLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    axiosClient.post("/makeorder", payload)
      .then(({ data }) => {
        setUser(data.order);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrorMessage("Dados inválidos.");
          console.log(response.data.errors);
        } else {
          setSuccessMessage("Pedido feito com sucesso!");
          setTimeout(() => navigate('/orders'), 2000);
        }
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <div className="makeorder-form animated fadeinDown">
      <Helmet>
        <title>Fazer Pedido</title>
      </Helmet>
      <div className="form">
        <center>
          <div>
            <h1 className="title">Fazer Pedido</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </center>
        <form onSubmit={handleSubmit}>
          <label>
            Produto
            <input required ref={productRef} type="text" placeholder="Nome do Produto" />
          </label>
          <label>
            Quantidade
            <input required ref={quantityRef} type="text" placeholder="Quantidade do Produto" />
          </label>
          <label>
            Endereço
            <input required ref={addressRef} type="text" placeholder="Endereço de Entrega" />
          </label>
          <button className="btn btn-block" disabled={submitLoading}>
            {submitLoading ? 'Fazendo Pedido...' : 'Fazer Pedido'}
          </button>
        </form>
      </div>
    </div>
  );
}