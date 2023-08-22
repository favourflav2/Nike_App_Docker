import * as React from 'react';
import first from '../../../assets/first.webp'
import second from '../../../assets/second.webp'
import third from '../../../assets/third.webp'

export interface IFirstAccessProps {
}

export default function FirstAccess (props: IFirstAccessProps) {
  return (
    <div className='w-full h-auto mb-[50px] mt-5 md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]'>
      {/* Content */}
      <div className='w-full h-full grid md:grid-cols-3 grid-cols-1 gap-2'>
        {/* Left */}
        <div className='w-full h-full flex flex-col relative'>
            <img src={first} alt="" className='oject-cover md:h-auto max-h-[600px]'/>

            <div className=' absolute flex flex-col md:bottom-4 lg:bottom-10 bottom-20 px-5 w-full'>
                <h1 className='font-medium'>Member Shop</h1>
                <h1 className='font-semibold text-[19px]'>Shop Member-exclusive styles.</h1>
            </div>
        </div>

        {/* Middle */}
        <div className='w-full h-full flex flex-col relative'>
            <img src={second} alt="" className='oject-cover md:h-auto max-h-[600px]'/>

            <div className=' absolute flex flex-col md:bottom-4 lg:bottom-10 bottom-20 px-5 w-full'>
                <h1 className='font-medium'>Member Shop</h1>
                <h1 className='font-semibold text-[19px]'>Shop Member-exclusive styles.</h1>
            </div>
        </div>

        {/* Last */}
        <div className='w-full h-full flex flex-col relative'>
            <img src={third} alt="" className='oject-cover md:h-auto max-h-[600px]'/>

            <div className=' absolute flex flex-col md:bottom-4 lg:bottom-10 bottom-20 px-5 w-full'>
                <h1 className='font-medium'>Member Shop</h1>
                <h1 className='font-semibold text-[19px]'>Shop Member-exclusive styles.</h1>
            </div>
        </div>
      </div>
    </div>
  );
}
