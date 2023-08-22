import * as React from "react";
import girl1 from "../../../assets/girl1.jpg";
import nike from '../../../assets/nike.png'
import girl2 from '../../../assets/girl2.jpg'
import girl3 from '../../../assets/girl3.jpg'
import girl4 from '../../../assets/girl4.jpg'
import rightGirl1 from '../../../assets/rightGirl1.jpg'
import rightGirl2 from '../../../assets/rightGirl2.jpg'
import rightGirl3 from '../../../assets/rightGirl3.jpg'
import rightGirl4 from '../../../assets/rightGirl4.jpg'
import { useNavigate } from "react-router-dom";

export interface ISecondBoxProps {}

 function SecondBox(props: ISecondBoxProps) {
    const navigate = useNavigate()
  return (
    <div className="w-full h-auto pr-[20px] pl-[20px] pb-[20px] mt-10">

      {/* Desktop Content */}
      <div className="w-full h-full  md:flex hidden flex-col">

        {/* Grid Content Cols 3 */}
        <div className="grid grid-cols-[48%_4%_48%] h-full w-full ">

            {/* Left Side */}
            <div className=" w-full grid grid-cols-[75%_25%] h-[600px]">
                {/* Big Image */}
                <div className="w-full h-full ">
                    <img src={girl1} alt="" className="w-full h-[600px] p-4 object-cover"/>
                </div>

                {/* Small Images */}
                <div className="w-full h-[600px]  grid-rows-3">

                    <div className="h-[33.33%] w-full ">
                        <img src={girl2} alt="nike pic" className="w-full h-full pt-4 px-2  object-cover"/>
                    </div>

                    <div className="h-[33.33%] w-full ">
                        <img src={girl3} alt="nike pic" className="w-full h-full pt-1 px-2 pb-1 object-cover"/>
                    </div>

                    <div className="h-[33.33%] w-full ">
                        <img src={girl4} alt="nike pic" className="w-full h-full pb-4 px-2  object-cover"/>
                    </div>
                    
                </div>
            </div>
            
            {/* Middle */}
            <div className=" w-full h-full flex flex-col justify-between items-center py-4">
                <img src={nike} alt="" className="w-[30px] h-[30px] -rotate-90"/>

                <span className="w-[39px] h-[30px]  -rotate-90 font-bold">NIKE</span>
                <img src={nike} alt="" className="w-[30px] h-[30px] -rotate-90"/>
            </div>
            
            {/* Right Side */}
            <div className=" w-full grid grid-cols-[75%_25%] h-[600px]">
                {/* Big Image */}
                <div className="w-full h-full ">
                    <img src={rightGirl1} alt="" className="w-full h-[600px] object-cover p-4"/>
                </div>

                {/* Small Images */}
                <div className="w-full  grid-rows-3 h-[600px]">

                    <div className="h-[33.33%] w-full ">
                        <img src={rightGirl2} alt="nike pic" className="w-full h-full pt-4 px-2 object-cover"/>
                    </div>

                    <div className="h-[33.33%] w-full ">
                        <img src={rightGirl3} alt="nike pic" className="w-full h-full pt-1 px-2 pb-1 object-cover"/>
                    </div>

                    <div className="h-[33.33%] w-full ">
                        <img src={rightGirl4} alt="nike pic" className="w-full h-full pb-4 px-2 object-cover"/>
                    </div>
                    
                </div>
            </div>
        </div>

        {/* Header Below Grid Pictures */}
        <div className="py-10 mt-[40px] flex flex-col items-center">
            <h1 className="text-[50px] font-bold">FITS FOR FALL</h1>
            <h1 className="text-[50px] font-bold mb-2">AND BEYOND</h1>

            <h4 className="text-black font-medium mb-8 mt-5 text-lg">Bring big attitude to your school day with the latest kicks, tops, and more.</h4>

            <button className="p-3 rounded-3xl w-[200px] bg-black text-white hover:bg-gray-500" onClick={()=>navigate('/category/All/All Nikes')}>Shop Back to School</button>
        </div>

      </div>

      {/* ------------------------------------------------------------------------------------------- */}

      {/* Mobile Content */}
      <div className="w-full h-full md:hidden flex">

        {/* Content */}
        <div className="flex flex-col w-full h-full">
            {/* 1st Box */}
            <div className="grid grid-cols-[60%_40%] h-[400px]">
                <div className="w-full h-full">
                    <img src={girl1} alt="nike pic" className=" w-full h-full p-4 object-cover"/>
                </div>

                {/* Right Side Box 1 */}
                <div className="w-full h-[400px]  grid grid-rows-2 ">
                    <div className="h-full w-full ">
                        <img src={girl2} alt="" className="w-full h-full object-cover  pt-4 px-2 pb-1"/>
                    </div>

                    <div className="h-full w-full ">
                        <img src={girl4} alt="" className="w-full h-full object-cover pt-1 px-2 pb-4"/>
                    </div>
                </div>
            </div>

            {/* 2nd Box */}
            <div className="grid grid-cols-[60%_40%] h-[400px]">
                <div className="w-full h-full">
                    <img src={rightGirl1} alt="nike pic" className=" w-full h-[400px] p-4 object-cover"/>
                </div>

                {/* Right Side Box 1 */}
                <div className="w-full h-[400px]  grid grid-rows-2 ">
                    <div className="h-full w-full ">
                        <img src={rightGirl2} alt="" className="w-full h-full object-cover  pt-4 px-2 pb-1"/>
                    </div>

                    <div className="h-full w-full ">
                        <img src={rightGirl3} alt="" className="w-full h-full object-cover pt-1 px-2 pb-4"/>
                    </div>
                </div>
            </div>

            {/* Header Under Grid Pics */}
        <div className="py-10 mt-[20px] flex flex-col items-center">
            <h1 className="text-[40px] font-bold">FITS FOR FALL</h1>
            <h1 className="text-[40px] font-bold mb-2">AND BEYOND</h1>

            <h4 className="text-black font-medium mb-8 mt-5 text-lg">Bring big attitude to your school day with the latest kicks, tops, and more.</h4>

            <button className="p-3 rounded-3xl w-[200px] bg-black text-white hover:bg-gray-500" onClick={()=>navigate('/category/All/All Nikes')}>Shop Back to School</button>
        </div>
        </div>

      </div>

     


    </div>
  );
}

export default React.memo(SecondBox)