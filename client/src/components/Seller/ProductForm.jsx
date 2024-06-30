// src/components/Seller/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, onEditProduct, editingProduct, setEditingProduct }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    images: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onEditProduct(formData);
    } else {
      onAddProduct(formData);
    }
    setFormData({
      title: '',
      description: '',
      price: '',
      images: '',
      category: '',
      stock: '',
    });
    setEditingProduct(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="images"
        value={formData.images}
        onChange={handleChange}
        placeholder="Images URL (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
