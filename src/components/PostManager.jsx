import { useState, useEffect } from 'react';
import ProductForm from './ProductForm';

const PostManager = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSuccess = (product, operation) => {
        if (operation === "add") {
            setProducts((currentProducts) => [product, ...currentProducts]);
        } else if (operation === "update") {
            setProducts((currentProducts) => currentProducts.map((prod) => (prod.id === product.id ? product : prod))
            );
        } else if (operation === "delete") {
            setProducts((currentProducts) => currentProducts.filter((prod) => prod.id !== product.id));
            setSelectedProduct(null);
        }
        setIsEditing(false);
    };

    // id, title, price, category
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products")

                const data = await response.json();
                setProducts(data);

            } catch (error) {
                setError(error.message)
            }
        };
        fetchProducts();

    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    }

    const handleCancelEdit = (product) => {
        setSelectedProduct(null);
        setIsEditing(false);
    }


  return (
    <div>
        <div className='text-center'>
            <h1 className='mt-10 font-semibold text-lg' >Formulário de Edição/Criação</h1>
            <ProductForm  
            product={isEditing ? selectedProduct : null}
            onSuccess={handleSuccess} />

            {isEditing && <button className=" w-36 h-10 font-semibold rounded-md ml-4  bg-stone-700 mt-5 text-white" onClick={handleCancelEdit} >Cancelar Edição</button>}
        </div>
        

        
        
        <div className=' mt-10'>
            <h1 className=' text-center text-3xl font-bold  text-cyan-700 mb-10'>Gerenciar Produtos</h1>
            <div className='lg:grid md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-16 px-12  mb-32'>
                {products.map((product) => (
                <div key={product.id} className=' flex flex-col md:items-center mb-12'>
                    <div className='flex flex-col justify-start md:w-80 lg:w-80 shadow-xl hover:shadow-2xl hover:scale-105 transition-all'>
                        <div className=' px-4'>
                            <h2 className=' text-xl font-semibold text-gray-800 mt-4 mb-1'>{product.title} </h2>
                            <p className=' pt-3 text-xl my-2 font-semibold text-green-700'>{product.price} </p>
                            <p className=' text-zinc-800 font-medium'>{product.category} </p>
                            <button className=" w-20 h-8 font-medium my-4 rounded-md bg-green-600 text-white" onClick={() => handleEdit(product)}>Editar</button>
                        </div>
                    </div>     
                </div>
                ))
                }
            </div>       
        </div>

        {/*<h2 className=' font-bold text-center text-cyan-800'>Lista de Produtos</h2>
        {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.title} </h2>
                    <p>{product.price} </p>
                    <p>{product.category} </p>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                </div>
            ))
        }*/}
    </div>
  )
}

export default PostManager