"use client";

import PopularProducts, { Product } from "@/app/_components/PopularProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Divide, Palette } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCustomizeStudio from "../_components/ProductCustomizeStudio";

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const[enableCustomizeStudio,setEnableCustomizeStudio]=useState(false);

  useEffect(() => {
    const GetProductById = async () => {
      try {
        const result = await axios.get(`/api/products?productId=${productId}`);
        setProduct(result.data);
      } catch (e) {
        console.error("Failed to fetch product:", e);
      } finally {
        setLoading(false);
      }
    };

    if (productId) GetProductById();
  }, [productId]);

  // ✅ Map of keywords → fallback images
  const fallbackMap: Record<string, string> = {
    "pant": "/pant.jpg",
    "jacket": "/jacket.jpg",
    "my-tshirt": "/my-tshirt.jpg",
    "t-shirt": "/t-shirts.jpg",
    "tshirt": "/t-shirts.jpg",
    "shirt": "/shirt.jpg",
  };

  // ✅ Function to pick fallback image
  const getFallbackImage = (title?: string) => {
    if (!title) return "/my-tshirt.jpg";
    const lower = title.toLowerCase();

    for (const key in fallbackMap) {
      if (lower.includes(key)) return fallbackMap[key];
    }
    return "/my-tshirt.jpg"; // default
  };

  const imageUrl =
    product?.productImage?.[0]?.url ||
    product?.productImage?.[1]?.url ||
    getFallbackImage(product?.title);

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
      <div className="flex items-center justify-center border rounded-2xl">
        {loading ? (
          <Skeleton className="w-full h-[300px]" />
        ) : (
          !enableCustomizeStudio?<Image
            src={imageUrl}
            alt={product?.title ?? "Product image"}
            width={400}
            height={400}
            className="object-contain"
            unoptimized
          />:
          
          <ProductCustomizeStudio product={product} />
        )}
      </div>
      {/* <div>
        {product ? <div className="flex flex-col gap-3">
      </div>
      : <div className="space-y-3 ">
      <Skeleton className="w-full h-[20px]"  />
       <Skeleton className="w-full h-[30px]"  />
        <Skeleton className="w-full h-[50px]"  />
      
      </div>}
      </div> */}

      <div>

      {product?<div className="flex flex-col gap-3">
         {/* Info section */}
        {/* Product Info Section */}
         <h2 className="text-3xl font-bold">{product?.title}</h2> 
         <h2 className="font-bold text-3xl">${product?.pricing}</h2>
         <p className="text-gray-500">{product?.description}</p>
         <div>
            <h2 className="text-lg">Size</h2>
            <div className="flex gap-3">
                <Button variant={'outline'}>S</Button>
                 <Button variant={'outline'}>M</Button>
                  <Button variant={'outline'}>L</Button>
                   <Button variant={'outline'}>XL</Button>
            </div>
         </div>

         {!enableCustomizeStudio&& <Button size={'lg'} onClick={()=>setEnableCustomizeStudio(true)}><Palette />Customize</Button>}
          <Button size={'lg'} variant={!enableCustomizeStudio?'outline' :'default'}><Palette />Add to Cart</Button>
        {/* Add more info here if needed */}
      </div>
       : <div className="space-y-3">
        <Skeleton className="w-full h-[20px]"  />
       <Skeleton className="w-full h-[30px]"  />
        <Skeleton className="w-full h-[50px]"  />
       </div>}
      </div>


      </div>
      <div className="mt-10">
        <h2 className="font-bold text-lg">Product Description</h2>
        <p className="text-gray-500">{product?.description}</p>
      </div>
       <PopularProducts  />

    </div>
    
  );
}

export default ProductDetail;
