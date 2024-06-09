import { useState, useEffect } from 'react';

const FetchPosts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

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

    }, [])

  return (
    <div className=' mt-10'>
        <h1 className=' text-center text-3xl font-bold  text-cyan-700 mb-10'>Nossos Produtos</h1>
        <div className='lg:grid md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-16 px-12  mb-32'>
            {products.map((product) => (
            <div key={product.id} className=' flex flex-col md:items-center mb-12'>
                <div className='flex flex-col justify-start md:w-80 lg:w-80 shadow-xl hover:shadow-2xl hover:scale-105 transition-all'>
                    <div className=' px-4'>
                        <h2 className=' text-xl font-semibold text-gray-800 mt-4 mb-1'>{product.title} </h2>
                        <p className=' pt-3 text-xl my-2 font-semibold text-green-700'>{product.price} </p>
                        <p className=' text-zinc-800 font-medium'>{product.category} </p>
                    </div>
                </div>     
            </div>
            ))
            }
        </div>       
    </div>
  );
}

export default FetchPosts