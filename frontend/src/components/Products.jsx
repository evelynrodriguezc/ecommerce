import React, { useEffect, useState } from 'react';
import apiClient from '../API/axiosConfig';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/products');
                setProducts(response.data);
            } catch (err) {
                setError("An error occurred while fetching products");
            }
        };

        fetchProducts();
    }, []);

    return (
    <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Products list</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                    <h2 className="text-lg font-semibold">{product.nombre}</h2>
                    <p className="text-gray-600">Precio: ${product.precio}</p>
                </div>
            ))}
            </div>
        </div>
        );
    };

export default Products;