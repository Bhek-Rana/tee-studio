
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Category = {
  name: string,
  documentId: string
}

const imageMap: Record<string, string> = {
  'shirt': '/shirt.png',
  't-shirts': '/t-shirts.png',
  'my-tshirt': '/my-tshirt.jpg',
  'jacket': '/jacket.jpg',
  'pant': '/pant.png',
}

function Categories() {
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    GetCategoryList()
  }, [])

  const GetCategoryList = async () => {
    const result = await axios.get('/api/categories')
    setCategoryList(result?.data?.data || [])
  }

  return (
    <div>
      <h2 className='font-bold text-2xl'>Popular Categories</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {categoryList.map((category, index) => (
          <Link
            href={'#'}
            key={index}
            className='p-4 border rounded-lg flex flex-col items-center hover:border-primary cursor-pointer'
          >
            <img
              src={imageMap[category.name] || '/placeholder.png'}
              alt={category.name}
              className="w-50 h-50 object-cover"
            />
            <h2 className='text-lg font-medium'>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
