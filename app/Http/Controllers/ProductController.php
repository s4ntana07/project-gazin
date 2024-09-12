<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Método para listar todos os produtos
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Método para exibir um produto específico
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        return response()->json($product);
    }

    // Método para criar um novo produto
    public function store(Request $request)
    {
        // Validação dos dados de entrada
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'type' => 'nullable|string|max:100',
            'company' => 'nullable|string|max:100',
            'description' => 'nullable|string',
        ]);

        // Criação do produto
        $product = Product::create($validatedData);

        // Retorno da resposta
        return response()->json($product, 201);
    }

    // Método para atualizar um produto existente
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        // Validação dos dados de entrada
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'type' => 'nullable|string|max:100',
            'company' => 'nullable|string|max:100',
            'description' => 'nullable|string',
        ]);

        // Atualização do produto
        $product->update($validatedData);

        // Retorno da resposta
        return response()->json($product);
    }

    // Método para deletar um produto existente
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        // Exclusão do produto
        $product->delete();

        // Retorno da resposta
        return response()->json(['message' => 'Produto deletado com sucesso']);
    }
}
