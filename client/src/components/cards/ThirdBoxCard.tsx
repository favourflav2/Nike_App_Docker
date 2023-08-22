import * as React from "react";
import nike from "../../assets/nike.png";


export interface IThirdBoxCardProps {
    item:{
        bottom:string
        top:string
        top2:string
        bottom2:string
    }
}

 function ThirdBoxCard({item}: IThirdBoxCardProps) {
  return (
    <div className="flex flex-col md:w-full md:h-[380px] relative md:my-0 my-5 ">
      {/* Top With Black Background */}
      <div className="w-full flex flex-col ">
        {/* Content */}
        <div className="thirdBox h-[40px]"></div>

        {/* Horizontal Line */}
        <div className=" w-full mt-3 text-black">
          <hr className="border-black" />
        </div>
      </div>

      {/* Nike Sign */}
      <div className=" absolute top-8 xl:right-[40%] md:right-[30%] lg:right-[35%] sm:right-[39%] right-[33%] rounded-full w-[100px] tr bg-blue-100">
        <div className="flex items-center justify-center">
          <img src={nike} alt="" className="w-[30px] h-[30px]" />
        </div>
      </div>

      {/* Box Text */}
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="text-[40px] font-bold ">{item.top}</h1>
        <hr className="w-full border-black"/>
        <h1 className="text-[40px] font-bold ">{item.bottom}</h1>
        <hr className="w-full border-black"/>
        <div className="flex flex-col my-2">
            <h2 className="font-medium flex items-center justify-center">{item.top2}</h2>
            <h2 className="font-medium flex items-center justify-center">{item.bottom2}</h2>
        </div>
      </div>

      {/* Bottom Black Background */}
      <div className="w-full flex flex-col">
        <hr className="border-black" />
        <div className="w-full mt-3 thirdBox h-[40px]"></div>
      </div>
    </div>
  );
}

export default React.memo(ThirdBoxCard)
