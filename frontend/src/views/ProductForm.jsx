import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Helmet } from "react-helmet";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProducts] = useState({
    id: null,
    name: '',
    price: '',
    stock: '',
    type: '',
    company: '',
    description:'',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false); // Novo estado para loading de submissão

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setProducts(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [id])
  }

  const onSubmit = ev => {
    ev.preventDefault();
    setSubmitLoading(true); // Ativa o loading de submissão

    if (product.id) {
      axiosClient.put(`/products/${product.id}`, product)
        .then(() => {
          navigate('/products');
        })
        .catch(err => {
          const response = err.response;
          setSubmitLoading(false); // Desativa o loading de submissão
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/products', product)
        .then(() => {
          navigate('/products');
        })
        .catch(err => {
          const response = err.response;
          setSubmitLoading(false); // Desativa o loading de submissão
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  }

  return (
    <>
      <Helmet>
        <title>Produtos</title>
      </Helmet>
      {product.id && <h1>Update Product: {product.name}</h1>}
      {!product.id && <h1>New Product</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={product.name} onChange={ev => setProducts({ ...product, name: ev.target.value })} placeholder="Name" />
            <input value={product.price} onChange={ev => setProducts({ ...product, price: ev.target.value })} placeholder="Preço" />
            <input value={product.stock} onChange={ev => setProducts({ ...product, stock: ev.target.value })} placeholder="Estoque" />
            <input value={product.type} onChange={ev => setProducts({ ...product, type: ev.target.value })} placeholder="Tipo" />
            <input value={product.company} onChange={ev => setProducts({ ...product, company: ev.target.value })} placeholder="Fabricante" />
            <input value={product.description} onChange={ev => setProducts({ ...product, description: ev.target.value })} placeholder="Descrição" />
            <button className="btn" disabled={submitLoading}> 
              {submitLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}