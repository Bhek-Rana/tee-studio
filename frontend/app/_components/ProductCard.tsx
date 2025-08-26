import React from "react";
import { Product } from "./PopularProducts";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const imageUrl =
    product.productImage && product.productImage.length > 0
      ? product.productImage[0].url
      : "/placeholder.png"; // fallback image

  const handleClick = () => {
    alert(`You clicked on ${product.title}`);
    // Later: navigate to product details page
  };

  return (
    <div
      className="inline-block m-4 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg p-2 rounded-lg bg-white"
      onClick={handleClick}
    >
      {/* Fixed square container for equal size */}
      <div className="w-40 h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
        <img
          src={imageUrl}
          alt={product.title || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product title */}
      <h3 className="mt-2 text-lg font-semibold text-center cursor-pointer">
        {product.title}
      </h3>
    </div>
  );
}

export default ProductCard;
