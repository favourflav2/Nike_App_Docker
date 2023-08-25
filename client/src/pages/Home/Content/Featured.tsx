import * as React from "react";
import featured1 from "../../../assets/featured1.webp";
import featured2 from "../../../assets/featured2.jpg";
import { useNavigate } from "react-router-dom";

export interface IFeaturedProps {}

 function Featured(props: IFeaturedProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full h-auto my-[50px] md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Title */}
        <h1 className="text-[30px] font-semibold my-2">Featured</h1>

        {/* Grid Pictures */}
        <div className="w-full grid md:grid-cols-[49.5%_1%_49.5%] grid-cols-1 md:gap-0 gap-4">
          {/* Left */}
          <div className="group relative w-full cursor-pointer">
            <img
              src={featured2}
              alt="Movie Pic"
              className="md:h-[600px] 2xl:h-[700px] h-[400px] w-full object-cover"
            />

            <div className=" absolute flex flex-col bottom-10 left-6  text-black sm:group-hover:hidden">
              <h1 className=" font-semibold text-[19px]">Low Top 1's</h1>
              <h1 className=" font-semibold text-[25px] mt-3">The Latest</h1>
              <h1 className=" font-semibold text-[25px] mb-5">and Greatest</h1>

              <button className="text-white bg-black p-2 rounded-3xl" onClick={()=>navigate('/category/All/All Nikes')}>
                Shop
              </button>
            </div>

            {/* Image Overlay */}
            <div className="absolute hidden top-0 left-0 w-full sm:flex flex-col h-full opacity-0 sm:group-hover:opacity-100 duration-300 sm:group-hover:bg-black/50 items-center  text-gray-300">
              <div className="w-full h-full relative">
                <div className=" absolute flex flex-col bottom-10 left-6  text-white">
                  <h1 className=" font-semibold text-[19px]">Low Top 1's</h1>
                  <h1 className=" font-semibold text-[25px] mt-3">
                    The Latest
                  </h1>
                  <h1 className=" font-semibold text-[25px] mb-5">
                    and Greatest
                  </h1>

                  <button className="text-black bg-white p-2 rounded-3xl hover:bg-black hover:text-white" onClick={()=>navigate('/category/All/All Nikes')}>
                    Shop
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className="w-full bg-white"></div>

          {/* Right */}
          <div className="group relative w-full cursor-pointer ">
            <img
              src={featured1}
              alt="Movie Pic"
              className="md:h-[600px] 2xl:h-[700px] h-[400px] w-full object-cover"
            />

            <div className=" absolute flex flex-col bottom-10 left-6  text-white sm:group-hover:hidden">
              <h1 className=" font-semibold text-[19px]">Zenvy, Universa & Go</h1>
              <h1 className=" font-semibold text-[25px] mt-3">Meet the Best</h1>
              <h1 className=" font-semibold text-[25px] mb-5">New Nike Sports Leggings</h1>

              <button className="text-white bg-black p-2 rounded-3xl w-[70%]" onClick={()=>navigate('/category/women/All Nikes')}>
                Shop
              </button>
            </div>

            {/* Image Overlay */}
            <div className="absolute hidden top-0 left-0 w-full sm:flex flex-col h-full opacity-0 sm:group-hover:opacity-100 duration-300 sm:group-hover:bg-black/50 items-center  text-gray-300">
              <div className="w-full h-full relative">
                <div className=" absolute flex flex-col bottom-10 left-6  text-white">
                  <h1 className=" font-semibold text-[19px]">Zenvy, Universa & Go</h1>
                  <h1 className=" font-semibold text-[25px] mt-3">
                    Meet the Best
                  </h1>
                  <h1 className=" font-semibold text-[25px] mb-5">
                    New Nike Sports Bra
                  </h1>

                  <button className="text-black bg-white p-2 rounded-3xl hover:bg-black hover:text-white w-[70%]" onClick={()=>navigate('/category/women/All Nikes')}>
                    Shop
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default React.memo(Featured)
