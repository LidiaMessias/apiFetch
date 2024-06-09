import { useState, useEffect } from "react";

const ProductForm = ({ product, onSuccess }) => {

    const [title, setTitle] = useState(product?.title || "");
    const [price, setPrice] = useState(product?.price || "");
    const [category, setCategory] = useState(product?.category || "");

    useEffect(() => {
        setTitle(product?.title || "");
        setPrice(product?.price || "");
        setCategory(product?.category || "");
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {title, price, category}

        try {
            if(product) {
                const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });

                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto');
                }

                const data = await response.json();

                // Atualizar produto na lista
                onSuccess(data, "update");

            } else {
                const response = await fetch("https://fakestoreapi.com/products", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            
            if (!response.ok) {
                throw new Error('Erro ao criar produto');
            }

            const data = await response.json();

            // Adicionar produto na lista
            onSuccess(data, "add");
            }
            
            setTitle("");
            setPrice("");
            setCategory("");

        } catch (error) {
            console.log("Erro ao criar produto", error)
        }
    }

    const handleDelete = async() => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir produto');
            }

            // Deletar produto da lista
            onSuccess(product, "delete");
            setTitle("");
            setPrice("");
            setCategory("");

        } catch (error) {
            console.log("Erro ao excluir produto", error)
        }
    }

  return (
    <div className=" mt-5 ">
        <form  onSubmit={handleSubmit}>
            <div className="">
                <input className=" w-96 h-8 rounded-md border-2 border-slate-300 mb-4" type="text" value={title} placeholder="Digite o nome do produto" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="">
                <input className=" w-96 h-8 rounded-md border-2 border-slate-300 mb-4" type="text" value={price} placeholder="Digite o valor do produto" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="">
                <input className=" w-96 h-8 rounded-md border-2 border-slate-300 mb-4" type="text" value={category} placeholder="Digite a categoria do produto" onChange={(e) => setCategory(e.target.value)} />
            </div>
            <button className="  w-32 h-10 font-semibold rounded-md bg-green-600 text-white" type="submit">Enviar</button>
            {product && (
                <button className="  w-32 h-10 font-semibold rounded-md ml-4  bg-red-700 text-white" type="button" onClick={handleDelete} >Excluir</button>
            )}
        </form>
    </div>
  )
}

export default ProductForm