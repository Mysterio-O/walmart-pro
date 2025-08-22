'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ProductHighlights() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get('https://walmart-server-ruddy.vercel.app/products?limit=3');
                setProducts(res.data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Product Highlights</h2>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                        >
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
                    {error}
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="text-center text-gray-600 p-4">
                    No products available.
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Price:</span> ${parseFloat(product.price).toFixed(2)}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Stock:</span> {product.stock}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Description:</span> {product.description}
                            </p>
                            <p className="text-gray-500 text-sm">
                                <span className="font-medium">Added on:</span>{" "}
                                {new Date(product.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}