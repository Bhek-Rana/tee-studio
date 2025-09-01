import React from "react";
import { Product } from "./PopularProducts";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const imageUrl =
    product.productImage && product.productImage.length > 0
      ? product.productImage[0].url
      : `/products/${product.title?.toLowerCase()}.jpg`;

  const finalImageUrl = imageUrl || "/placeholder.png";

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg cursor-pointer transition">
      <img
        src={finalImageUrl}
        alt={product.title || "Product"}
        className="w-50 h-50 object-cover rounded-md"
      />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      
      <p className="text-gray-600">${product.pricing}</p>
       <Link href={'/product/'+product?.documentId} className="w-full"> 
      <Button className='w-full mt-2'><Palette />Customize</Button>
       </Link> 
    </div>
  );
}

export default ProductCard;
