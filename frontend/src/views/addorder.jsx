import React, { useState, useContext } from 'react';
import { ContextProvider, useStateContext } from './Context/contextorder';

const Pedidos = () => {
  const { user, token } = useStateContext();

  const [pedido, setPedido] = useState({
    produto: '',
    quantidade: '',
    endereco: '',
  });

  const handlePedido = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const fazerPedido = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição para o servidor para criar o pedido
    console.log(pedido);
  };

  return (
    <div>
      <h1>Fazer Pedido</h1>
      {user ? (
        <form onSubmit={fazerPedido}>
          <label>Produto:</label>
          <input type="text" name="produto" value={pedido.produto} onChange={handlePedido} />
          <br />
          <label>Quantidade:</label>
          <input type="number" name="quantidade" value={pedido.quantidade} onChange={handlePedido} />
          <br />
          <label>Endereço:</label>
          <input type="text" name="endereco" value={pedido.endereco} onChange={handlePedido} />
          <br />
          <button type="submit">Fazer Pedido</button>
        </form>
      ) : (
        <p>Você precisa estar logado para fazer um pedido.</p>
      )}
    </div>
  );
};

export default Pedidos;