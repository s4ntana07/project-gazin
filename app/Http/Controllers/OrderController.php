<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $pedidos = new Pedido();
        $data['pedidos'] = $pedidos->findAll();
        return view('pedidos/index', $data);
    }

    public function create()
    {
        $produtos = new Produto();
        $data['produtos'] = $produtos->findAll();
        return view('pedidos/create', $data);
    }

    public function store()
    {
        $pedido = new Pedido();
        $pedido->produto_id = $this->request->getPost('produto_id');
        $pedido->quantidade = $this->request->getPost('quantidade');
        $pedido->endereco = $this->request->getPost('endereco');
        $pedido->save();
        return redirect()->to('/pedidos');
    }

    public function show($id)
    {
        $pedido = new Pedido();
        $data['pedido'] = $pedido->find($id);
        return view('pedidos/show', $data);
    }

    public function edit($id)
    {
        $pedido = new Pedido();
        $data['pedido'] = $pedido->find($id);
        $produtos = new Produto();
        $data['produtos'] = $produtos->findAll();
        return view('pedidos/edit', $data);
    }

    public function update($id)
    {
        $pedido = new Pedido();
        $pedido->produto_id = $this->request->getPost('produto_id');
        $pedido->quantidade = $this->request->getPost('quantidade');
        $pedido->endereco = $this->request->getPost('endereco');
        $pedido->update($id);
        return redirect()->to('/pedidos');
    }

    public function delete($id)
    {
        $pedido = new Pedido();
        $pedido->delete($id);
        return redirect()->to('/pedidos');
    }
}

