"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`http://localhost:5000/product/${params?.id}`);
                setProduct(res?.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
                setLoading(false);
            }
        };
        if (params?.id) {
            fetchProduct();
        }
    }, [params?.id]);

    const handleBackToHome = () => {
        router.back()
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div>
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="mt-6 h-10 bg-gray-200 rounded w-full md:w-32"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-600">Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Price:</span> ${parseFloat(product.price).toFixed(2)}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Category:</span> {product.category}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Stock:</span> {product.stock} units
                    </p>
                </div>
                <div>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Description:</span>
                    </p>
                    <p className="text-gray-600">{product.description}</p>
                </div>
            </div>
            <button
                onClick={handleBackToHome}
                className="mt-6 w-full md:w-auto bg-white text-black outline-black hover:bg-gray-100 transition-colors duration-200 border cursor-pointer border-black rounded-lg px-4 py-2 shadow-md hover:shadow-lg"
            >
                Back
            </button>
        </div>
    );
}