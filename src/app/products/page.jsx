'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response?.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      {loading && (
        <div className="text-center text-gray-600">Loading products...</div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center text-gray-600">No products found.</div>
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
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}