import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export interface ITrendingCard {
  item: {
    desc: string
    gender: string;
    id: number;
    img: string;
    name: string;
    price: string;
    type: string;
  };
 
}


export default function TrendingCard ({item}: ITrendingCard) {
    const md = useMediaQuery("(min-width:435px)");
    const navigate = useNavigate()
   
  

  return (
    <div className='md:max-w-[500px] h-auto mx-2 border border-gray-300 cursor-pointer' onClick={()=>navigate(`/itemDetails/${item.name}/${item.id}`)}>
        {/* Content */}
        <div className='flex flex-col w-full h-full bg-pink-500 relative'>

            <img src={item.img} alt="" className='w-full h-full object-cover'/>
           

            {!md ? <h1 className=' absolute z-10 bottom-1 left-2 font-semibold text-[11px] md:text-[14px]'>{item.name.length >= 20 ? item.name.slice(0,20) + '...' : item.name}</h1> : <h1 className=' absolute z-10 bottom-1 left-2 font-semibold text-[11px] md:text-[14px]'>{item.name}</h1>}
        </div>
    </div>
  );
}
