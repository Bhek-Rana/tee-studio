import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const menu = [
    {
        id: 1,
        name: 'Home',
        path: '/',
    },
    {
        id: 2,
        name: 'Products',
        path: '/',
    },
    {
        id: 3,
        name: 'AboutUs',
        path: '/',
    },
    {
        id: 4,
        name: 'ContactUs',
        path: '/',
    },
];

function Header() {
    return (
        <div className='flex items-center justify-between p-4 '>
            <Image src={'/logo.svg'} alt='Logo' width={120} height={80} />
        <ul className='flex gap-5'>
            {menu.map((item,index)=> (
                
                <li key={index} className='text-lg'>{item.name}</li>
            ))}
        </ul>
        <div className='flex gap-3 items-center'>
        <ShoppingCart />       
         <Button>SignIn/SignUp</Button>
        </div>
        </div>
    )
}
export default Header
