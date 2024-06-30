import React from "react";

const ProductCard = ({ product }) => {
  const { title, price, images } = product;
  const imageUrl = images[0]; // Using the first image from the images array

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <img
        src={imageUrl}
        alt={title}
        className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
      />
      <div className="py-4">
        <div
          className="font-bold text-xl mb-2 truncate "
          style={{ maxWidth: "200px" }}
        >
          {title}
        </div>
        <p className="text-gray-700 text-base">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
