import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export interface IShopSportCardProps {
    item:{
        name:string
        desc:string
        img:string
    }
}

 function ShopSportCard ({item}: IShopSportCardProps) {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full md:p-2 cursor-pointer'>
      {/*Desktop Content */}
      <div className='md:flex hidden flex-col w-full h-full'>
        
        
        <img src={item.img} alt="" />
        

        {/* Name */}
        <h1 className='font-semibold mt-2 mb-1 text-[20px]'>{item.name}</h1>

        {/* Desc */}
        <h1>{item.desc}</h1>

        {/* Shop */}
        <h1 className='mt-4 font-semibold text-[15px] underline cursor-pointer' onClick={()=>navigate('/category/All/All Nikes')}>Shop</h1>
      </div>

      {/* --------------------------------------------Mobile Content---------------------------------------------------  */}
      <div className='flex md:hidden w-full h-auto  my-2 border border-gray-100 rounded-2xl' onClick={()=>navigate('/category/All/All Nikes')}>
            {/* Content */}
            <div className='grid grid-cols-[60%_40%] w-full'>

                {/* Left Side */}
                <div className='w-full  flex justify-center flex-col px-2'>
                    {/* Title */}
                    <h1 className='text-gray-500 font-medium sm:mb-2 mb-1 text-[13px] sm:text-[15px]'>{item.name}</h1>

                    {/* Desc */}
                    <h1 className='font-semibold text-[14px] sm:text-[16px]'>{item.desc}</h1>
                </div>

                {/* Right Side */}
                <div className='w-full  h-full rounded-2xl'>
                    <img src={item.img} alt="" className='w-full h-full object-cover rounded-2xl'/>
                </div>

            </div>
      </div>
    </div>
  );
}
export default React.memo(ShopSportCard)
