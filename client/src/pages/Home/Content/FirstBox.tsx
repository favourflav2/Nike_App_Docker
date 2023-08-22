import * as React from "react";
import nike from "../../../assets/nike.png";
import nikeLogo from "../../../assets/nikeLogo.png";
import nikeHeader from "../../../assets/nikeHeader.png";
import nikeHeader2 from "../../../assets/nikeHeader2.png";
import { useNavigate } from "react-router-dom";

export interface IFirstBoxProps {}

function FirstBox(props: IFirstBoxProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full md:h-[370px] h-[420px] flex-col md:pr-0 md:pb-0 md:pl-0 pr-[20px] pl-[20px] pb-[20px] ">
      {/* Desktop Content */}
      <div className="w-full h-full md:flex flex-col hidden firstBox">
        {/* 1st Box */}
        <div className="flex items-center w-full px-1 border-b border-gray-200">
          {/* list items */}
          <div className=" items-center flex mx-2 w-full">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">
              NEW STYLES ADDED
            </h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-[70%]">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">ENDS 8.5</h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-full">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">
              NEW STYLES ADDED
            </h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-[70%]">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">ENDS 8.5</h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-full">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">
              NEW STYLES ADDED
            </h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-[70%]">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">ENDS 8.5</h1>
          </div>

          {/* list items */}
          <div className=" items-center flex mx-2 w-full">
            <img src={nike} alt="" className="w-[30px] h-[30px] mr-2" />
            <h1 className="text-xs text-gray-200 font-semibold">
              NEW STYLES ADDED
            </h1>
          </div>
        </div>

        {/* 2nd Box */}
        <div className="flex items-center w-full h-full px-5">
          {/* Left Side */}
          <div className="flex flex-col w-[45%] 2xl:w-[35%] h-full justify-center">
            <h1 className="text-white p-0 m-0">Back to School Sale</h1>
            <h1 className="text-white font-bold xl:text-[60px] md:text-[50px]">
              SAVE UP TO 60%
            </h1>
            <h4 className="text-white mt-2">
              Get an extra 20% of select styles code SCHOOL20.
            </h4>
            <h4 className="text-white">Exclusions apply.</h4>
            <button className="w-[100px] bg-white hover:bg-gray-400 rounded-3xl p-2 lg:mt-5 md:mt-3" onClick={()=>navigate('/category/All/All Nikes')}>
              Shop
            </button>
          </div>

          {/* Right Side */}
          <div className="flex w-[55%] 2xl:w-[65%] relative h-full justify-center">
            <div className=" absolute bottom-0 left-0">
              <img src={nikeLogo} alt="" className="w-[100px] h-[100px] " />
            </div>

            <div className=" absolute left-10 top-10">
              <img src={nikeHeader} alt="" className=" w-[100px] h-[117px]" />
            </div>

            <div className=" ">
              <img src={nikeHeader2} alt="" className="h-[330px] " />
            </div>

            <div className=" absolute bottom-0 right-0">
              <img src={nikeLogo} alt="" className="w-[100px] h-[100px] " />
            </div>

            <div className=" absolute right-10 top-10">
              <img src={nikeHeader} alt="" className=" w-[100px] h-[117px]" />
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------------------------- */}

      {/* Mobile Content */}
      <div className="w-full h-full md:hidden flex flex-col">

        {/* Content With Blue Background */}
        <div className="w-full h-[65%] firstBox flex flex-col">

          {/* 1st Box */}
          <div className="flex w-full px-1 border-b border-gray-200 h-[24px] md:h-[30px]">
            {/* list items */}
            <div className=" items-center flex mx-2 w-full">
              <img src={nike} alt="" className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] mr-2" />
              <h1 className="text-[10px] md:text-xs  text-gray-200 font-semibold">
                NEW STYLES ADDED
              </h1>
            </div>

            {/* list items */}
            <div className=" items-center flex mx-2 w-[70%]">
              <img src={nike} alt="" className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] mr-2" />
              <h1 className="text-[10px] md:text-xs text-gray-200 font-semibold">
                ENDS 8.5
              </h1>
            </div>

            {/* list items */}
            <div className=" items-center md:flex hidden mx-2 w-full">
              <img src={nike} alt="" className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] mr-2" />
              <h1 className="text-[10px] md:text-xs text-gray-200 font-semibold">
                NEW STYLES ADDED
              </h1>
            </div>

            {/* list items */}
            <div className=" items-center md:flex hidden mx-2 w-[70%]">
              <img src={nike} alt="" className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] mr-2" />
              <h1 className="text-[10px] md:text-xs text-gray-200 font-semibold">
                ENDS 8.5
              </h1>
            </div>
          </div>

          {/* 2nd Box */}
          <div className="w-full h-full  flex px-5">
            {/* Left Side */}
            <div className="h-full flex items-center w-[40%]">
                <h1 className="text-white font-bold text-[38px]">SAVE UP TO 60%</h1>
            </div>

            {/* Right Side */}
            <div className="flex flex-col w-[60%] h-full ">
                <div className="flex justify-start h-full">
                    <img src={nikeLogo} alt="" className="w-[80px] h-[80px]"/>
                </div>

                <div className="flex justify-end h-full">
                    <img src={nikeLogo} alt="" className="w-[80px] h-[80px]"/>
                </div>
            </div>

          </div>

        </div>

        {/* Content Outside Blue Box */}
        <div className="flex flex-col h-[35%] pt-4">
            <h1 className=" font-bold">Get an extra 20% of select styles code SCHOOL20. Exclusions apply.</h1>

            <button className="w-[100px] bg-black hover:bg-gray-400 text-white rounded-3xl p-2 mt-5" onClick={()=>navigate('/category/All/All Nikes')}>Shop</button>
        </div>

      </div>
    </div>
  );
}

export default React.memo(FirstBox);
