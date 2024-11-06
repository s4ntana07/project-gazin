import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Helmet } from "react-helmet";

export default function ProductTable() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const onDeleteClick = product => {
    if (!window.confirm("Você tem certeza que deseja deletar este produto?")) {
      return;
    }
    axiosClient.delete(`/products/${product.id}`)
      .then(() => {
        getProduct();
      });
  };

  const getProduct = () => {
    setLoading(true);
    axiosClient.get('/products')
      .then(({ data }) => {
        setLoading(false);
        setProduct(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const filteredProduct = product.filter(product =>
    product.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportToExcel = () => {
    const exportData = filteredProduct.map(product => ({
      ID: product.id,
      Nome: product.name,
      Preço: product.price,
      Estoque: product.stock,
      Tipo: product.type,
      Fabricante: product.company,
      Descrição: product.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: [
        'ID',
        'Nome',
        'Preço',
        'Estoque',
        'Tipo',
        'Fabricante',
        'Descrição',
      ],
    });

    ws['!cols'] = [
      { wch: 10 }, // largura da coluna ID
      { wch: 20 }, // largura da coluna Nome
      { wch: 15 }, // largura da coluna Preço
      { wch: 10 }, // largura da coluna Estoque
      { wch: 15 }, // largura da coluna Tipo
      { wch: 20 }, // largura da coluna Fabricante
      { wch: 30 }, // largura da coluna Descrição
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    XLSX.writeFile(wb, 'produtos.xlsx');
  };

  return (
    <center>
      <div>
        <Helmet>
          <title>Produtos</title>
        </Helmet>
        <div>
          <h1 className="h1">Produtos</h1>
          <input
            className="input-busca"
            type="text"
            placeholder="Procurar produtos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn-export" onClick={handleExportToExcel}>Exportar para Excel</button>
        </div>
        <div className="card animated fadeInDown">
          <table id="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Tipo</th>
                <th>Fabricante</th>
                <th>Descrição</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading &&
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center">
                    Carregando Produtos...
                  </td>
                </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
                {filteredProduct.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">Nenhum produto encontrado</td>
                  </tr>
                ) : (
                  filteredProduct.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.stock}</td>
                      <td>{p.type}</td>
                      <td>{p.company}</td>
                      <td>{p.description}</td>
                      <td>
                        <Link className="btn-edit" to={'/products/' + p.id}>Edit</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      </div>
    </center>
  )
}