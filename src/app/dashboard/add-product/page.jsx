'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

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
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const productData = {
            ...formData,
            userEmail: session?.user?.email,
            createdAt: new Date().toISOString()
        };

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            // Show validation errors in SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                html: Object.values(validationErrors)
                    .map(error => `<p>${error}</p>`)
                    .join(''),
                confirmButtonColor: '#ef4444',
            });
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/add-product', productData);
            console.log('Response:', res);

            if (res?.data?.result?.insertedId) {
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    stock: ''
                });
                setErrors({});
                setLoading(false);
                // Show success alert with SweetAlert2
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product added successfully!',
                    confirmButtonColor: '#3b82f6',
                });
                router.push('/products'); // Navigate after alert is dismissed
            } else {
                setErrors({ general: 'Failed to add product' });
                setLoading(false);
                // Show server error in SweetAlert2
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add product',
                    confirmButtonColor: '#ef4444',
                });
            }
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || 'Failed to add product. Please try again.';
            setErrors({ general: errorMessage });
            setLoading(false);
            // Show server error in SweetAlert2
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonColor: '#ef4444',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 lg:my-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

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
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Adding...
                        </>
                    ) : (
                        'Add Product'
                    )}
                </button>
            </form>
        </div>
    );
}
