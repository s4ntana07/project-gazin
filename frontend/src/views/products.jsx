import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Helmet } from "react-helmet";

export default function ProductTable(){
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getProduct();
    }, [])

    const onDeleteClick = product => {
        if (!window.confirm("Você tem certeza que deseja deletar este produto?")) {
          return
        }
        axiosClient.delete(`/products/${product.id}`)
          .then(() => {
            getProduct()
          })
      }

    const getProduct = () => {
        setLoading(true)
        axiosClient.get('/products')
          .then(({ data }) => {
            setLoading(false)
            setProduct(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
          <Helmet>
            <title>Produtos</title>
          </Helmet>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Users</h1>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table id="tabela">
            <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estpque</th>
              <th>Tipo</th>
              <th>Fabricante</th>
              <th>Descrição</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {product.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.type}</td>
                  <td>{p.comapany}</td>
                  <td>{p.description}</td>
                  <td>
                    <Link className="btn-edit" to={'/products/' + p.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}