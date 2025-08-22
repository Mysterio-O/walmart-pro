'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AddProduct() {
    const { data: session } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for the field being edited
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.price) newErrors.price = 'Price is required';
        else if (parseFloat(formData.price) < 0) newErrors.price = 'Price cannot be negative';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.stock) newErrors.stock = 'Stock quantity is required';
        else if (parseInt(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative';
        if (!session?.user?.email) newErrors.general = 'You must be logged in to add a product';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        const productData = {
            ...formData,
            userEmail: session?.user?.email,
            createdAt: new Date().toISOString()
        };

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/add-product', productData);
            console.log('Response:', res);

            if (res?.data?.result?.insertedId) {
                setSuccessMessage('Product added successfully!');
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    stock: ''
                });
                setTimeout(() => {
                    router.push('/products');
                }, 1500); // Navigate after 1.5 seconds to show success message
            } else {
                setErrors({ general: 'Failed to add product' });
            }
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            setErrors({ general: error.response?.data?.message || 'Failed to add product. Please try again.' });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 lg:my-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

            {errors.general && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.general}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : ''}`}
                        step="0.01"
                        min="0"
                        required
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                        rows="4"
                        required
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Garden</option>
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.stock ? 'border-red-500' : ''}`}
                        min="0"
                        required
                    />
                    {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                    
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}