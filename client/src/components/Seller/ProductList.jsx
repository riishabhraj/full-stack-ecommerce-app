// src/components/Seller/ProductList.js
import React from 'react';

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product._id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => onEditProduct(product)} 
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDeleteProduct(product._id)} 
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
