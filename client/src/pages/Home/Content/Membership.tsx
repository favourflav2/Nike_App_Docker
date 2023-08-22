import * as React from 'react';
import member from '../../../assets/member.png'

export interface IMembershipProps {
}

export default function Membership (props: IMembershipProps) {
  return (
    <div className='w-full h-auto mt-[50px] md:pr-[25px] md:pb-[2px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]'>
        {/* content */}
        <div className='flex flex-col w-full h-auto'>
            <h1 className="text-[30px] font-semibold my-2">Nike Membership</h1>

            <div className='w-full h-auto grid md:grid-cols-[50%_50%] grid-cols-1 bg-black'>
                {/* Left Side */}
                <div className='w-full h-full flex flex-col justify-center text-white p-5'>
                    <h1 className='text-[45px] font-bold '>BECOME A </h1>
                    <h1 className='text-[45px] font-bold'>MEMBER</h1>

                    <div className='mt-4 mb-7'>Sign up for free. Join the community</div>

                    <div className='flex items-center'>
                        <button className='bg-white text-black font-semibold p-2 rounded-3xl mr-2 w-[100px] hover:bg-gray-500 hover:text-white'>Join Us</button>
                        <button className='bg-white text-black font-semibold p-2 rounded-3xl w-[100px] hover:bg-gray-500 hover:text-white'>Sign In</button>
                    </div>
                </div>

                {/* Right Side */}
                <div className='w-full h-full p-5'>
                    <img src={member} alt="" className='w-full md:max-h-[500px] sm:max-h-[300px] max-h-[250px] object-cover'/>
                </div>
            </div>


        </div>
    </div>
  );
}
