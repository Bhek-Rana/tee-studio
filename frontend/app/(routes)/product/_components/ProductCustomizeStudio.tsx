import { Product } from '@/app/_components/PopularProducts'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Crop, GalleryVerticalEnd, ImageOff, ImageUpscale, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Canvas, FabricImage } from 'fabric'
import { imagekit } from '@/lib/ImageKitInstance'

type Props = {
  product?: Product
}

const DEFAULT_IMAGE = 'https://ik.imagekit.io/Tubeguruji/image.png?updatedAt=1752630045024';
const AITransformOptions = [
  {
    name: 'Background remove',
    icon: ImageOff,
    imageKitTr:"e-bgremove"
  },
  {
    name: 'Upscale',
    icon: ImageUpscale,
    imageKitTr:"e-upscale"
  },
  {
    name: 'Smart crop',
    icon: Crop,
    imageKitTr:"fo-auto"
  },
  {
    name: 'Shadow',
    icon: GalleryVerticalEnd,
    imageKitTr:"e-shadow"
  }
]

function ProductCustomizeStudio({ product }: Props) {
    const canvasRef=useRef<any>(null);
    const [canvasInstance,setCanvasInstance]=useState<any>(null);
    const [uploadedImage,setUploadedImage]=useState<string>(DEFAULT_IMAGE)
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
        if(canvasInstance){
            AddDefaultImageToCanvas();
        }
    },[canvasInstance,uploadedImage])

    const AddDefaultImageToCanvas= async () => {
        canvasInstance.clear();
        canvasInstance.renderAll();
        const canvasImageRef= await FabricImage.fromURL(uploadedImage);
        canvasImageRef.scaleX= 0.1;
        canvasImageRef.scaleY= 0.1;
        canvasInstance.add(canvasImageRef);
        canvasInstance.renderAll();
    }

    const onHandleImageUpload= async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file= event.target.files?.[0];
      //Upload file
      if (file){
        const uploadImageRef = await imagekit.upload({
          //@ts-ignore
          file: file,
          fileName: file?.name!,
          isPublished: true,
          useUniqueFileName: false,
        });
        
        //Show on canvas
        //@ts-ignore
        const uploadedImageUrl= uploadImageRef?.url;
        console.log(uploadedImageUrl);
        if (uploadedImageUrl)
        {
          setUploadedImage(uploadedImageUrl);
          canvasInstance.clear();
          canvasInstance.renderAll();
          const canvasImageRef= await FabricImage.fromURL(uploadedImageUrl);
          canvasImageRef.scaleX= 0.1;
          canvasImageRef.scaleY= 0.1;
          canvasInstance.add(canvasImageRef);
          canvasInstance.renderAll();
          }
      }
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

    const OnApplyAITransformation=(transformation:any,add:boolean)=>{

      if(add){
        if(uploadedImage?.includes('&tr=')){
          const newUrl= uploadedImage + transformation + ',';
          setUploadedImage(newUrl);
        } else{
          const newUrl= uploadedImage +'&tr=' + transformation + ',';
          setUploadedImage(newUrl);
        }
      } 
      else {
        const newUrl= uploadedImage.replace(transformation,'');
        setUploadedImage(newUrl);
      }
    }

    const isTransformationApplied= (transformation:string)=> {
      return uploadedImage?.includes(transformation)?false:true;
    }

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
        <label htmlFor='uploadImage'>
          <div className='flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer  hover:bg-blue-50' >
              <Upload />
              <h2>Upload Image</h2>
          </div>
        </label>
        <input type='file' id='uploadImage' className='hidden' onChange={onHandleImageUpload} />

          {AITransformOptions.map((item,index) => (
          <div key={index} className={`flex flex-col p-5 items-center border
           rounded-lg hover:border-primary
           cursor-pointer  hover:bg-blue-50 
           ${uploadedImage.includes(item.imageKitTr)?'border-primary' : null}
           `} 
           onClick={()=> OnApplyAITransformation(item?.imageKitTr,isTransformationApplied(item?.imageKitTr))}
          >
            <item.icon />
            <h2 className='text-center'>{item.name}</h2>
          </div>
          ))}
        
      </div>
    </div>
  )
}

export default ProductCustomizeStudio 

