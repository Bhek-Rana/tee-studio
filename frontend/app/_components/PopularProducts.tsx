"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  longDescription: string;
  pricing: number;
  isFeatured: boolean;
  size: string[];
  productImage: Array<{
    url: string;
  }>;
};

function PopularProducts() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    GetPopularProducts();
  }, []);

  const GetPopularProducts = async () => {
    try {
      // Your API route already returns an array of products
      const response = await axios.get<Product[]>("/api/products?ispopular=1");

      const fallbackImages = [
        "/t-shirts.png",
        "/jacket.jpg",
        "/my-tshirt.jpg",
        "/pant.png",
        "/shirt.png",
      ];

      // Add fallback images if missing
      const updatedProducts = response.data.map((product, index) => {
        if (!product.productImage || product.productImage.length === 0) {
          return {
            ...product,
            productImage: [
              { url: fallbackImages[index] || "/placeholder.png" },
            ],
          };
        }
        return product;
      });

      setProductList(updatedProducts);
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Popular Products</h2>
      <div>
        {productList.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
