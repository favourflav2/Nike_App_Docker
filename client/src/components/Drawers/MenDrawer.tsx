import { Drawer } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export interface IMenDrawerProps {
    state:boolean,
    change: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenDrawer ({state,change}: IMenDrawerProps) {
    const navigate = useNavigate()
  return (
    <Drawer anchor='top' onClose={()=>change(false)} open={state} >
         <div className='w-full h-[500px] bg-white' onMouseLeave={()=>change(false)}>
            {/* Content */}
            <div className='w-full h-full grid grid-cols-3 justify-center pt-[60px] px-10'>

                {/* Featured */}
                <div className='flex flex-col h-full w-full'>
                    {/* Title */}
                    <h1 className='text-[23px] font-medium mb-2'>Featured</h1>
                    
                    {/* List */}
                    <div className='flex flex-col'>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                            change(false)
                            navigate('/category/men/All Nikes')
                        }}>Sale</h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Fresh Jordan Fleece <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>New Syles Added <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Best Sellers <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Back to School Sale <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Rep Your National Team <span className='text-xs'>(Currently unavailable)</span></h6>
                        

                    </div>
                </div>

                {/* All Shoes */}
                <div className='flex flex-col h-full w-full'>
                    {/* Title */}
                    <h1 className='text-[23px] font-medium mb-2'>All Shoes</h1>
                    
                    {/* List */}
                    <div className='flex flex-col'>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                            change(false)
                            navigate('/category/men/All Nikes')
                        }}>All Nike</h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Lifestyle <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Air Max <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Basketball <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Soccer <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Golf <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Air Force 1 <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Running <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Slides <span className='text-xs'>(Currently unavailable)</span></h6>
                        

                    </div>
                </div>

                {/* All Clothing */}
                <div className='flex flex-col h-full w-full'>
                    {/* Title */}
                    <h1 className='text-[23px] font-medium mb-2'>All Clothing</h1>
                    
                    {/* List */}
                    <div className='flex flex-col'>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Tops & T-Shirts <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Pants & Tights <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Big & Tall <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Hoodies & Sweatshirts <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Socks <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Shorts <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Jackets & Vests <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Fitness <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Underwear <span className='text-xs'>(Currently unavailable)</span></h6>
                        <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>Matching Sets <span className='text-xs'>(Currently unavailable)</span></h6>
                        

                    </div>
                </div>

            </div>
        </div>   
    </Drawer>
  );
}


