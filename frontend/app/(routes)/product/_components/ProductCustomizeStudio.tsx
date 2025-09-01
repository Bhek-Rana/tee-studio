import { Product } from '@/app/_components/PopularProducts'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Crop, ImageOff, ImageUpscale, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Canvas, FabricImage } from 'fabric'

type Props = {
  product?: Product
}

function ProductCustomizeStudio({ product }: Props) {
    const canvasRef=useRef<any>(null);
    const [canvasInstance,setCanvasInstance]=useState<any>(null);

    useEffect(()=>{
         if(canvasRef.current)
         {
            const initCanvas= new Canvas(canvasRef.current,{
                width:180,
                height:180,
                backgroundColor:'transparent'

            })
            initCanvas.renderAll();
            setCanvasInstance(initCanvas);

            return() => {
                initCanvas.dispose();
            }

         }

    },[])

    useEffect(()=> {
        if(canvasInstance)
        {
            AddDefaultImageToCanvas();
        }
    },[canvasInstance])

    const AddDefaultImageToCanvas= async () => {
        const canvasImageRef= await FabricImage.fromURL('https://ik.imagekit.io/Tubeguruji/strapi-uploads/treva.png?updatedAt=1752616252141');
        canvasImageRef.scaleX= 0.1;
        canvasImageRef.scaleY= 0.1;
        canvasInstance.add(canvasImageRef);
        canvasInstance.renderAll();
    }

      if (!product) return null;
  // ✅ Map of keywords → fallback images
  const fallbackMap: Record<string, string> = {
    pant: "/pant.jpg",
    jacket: "/jacket.jpg",
    "my-tshirt": "/my-tshirt.jpg",
    "t-shirt": "/t-shirts.jpg",
    tshirt: "/t-shirts.jpg",
    shirt: "/shirt.jpg",
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

  // ✅ Try Strapi image, otherwise fallback
  const imageUrl =
    product?.productImage?.[0]?.url ||
    product?.productImage?.[1]?.url ||
    getFallbackImage(product?.title);




  return (
    <div className='flex items-center flex-col '>
        <div className='flex items-center flex-col h-[400px] w-[400px]'>
             <canvas 
      id='canvas'
      ref={canvasRef} 
      className='absolute top-20 left-0 z-10 border rounded-2xl border-dashed'
      />
      <Image
        src={imageUrl}
        alt={product?.title ?? "Product image"}
        width={400}
        height={400}
        className="object-contain"
        unoptimized
      />
      
      </div>


      <div className='flex gap-5 my-5'>
        <div className='flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer  hover:bg-blue-50' >
            <Upload />
            <h2>Upload Image</h2>
        </div>
        <div className='flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer  hover:bg-blue-50' >
            <ImageOff />
            <h2>BG Remove</h2>
        </div>
        <div className='flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer  hover:bg-blue-50' >
            <ImageUpscale />
            <h2>Upscale</h2>
        </div>
        <div className='flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer  hover:bg-blue-50' >
            <Crop />
            <h2>SmartCrop</h2>
        </div>
        
        
      </div>
    </div>
  )
}

export default ProductCustomizeStudio
