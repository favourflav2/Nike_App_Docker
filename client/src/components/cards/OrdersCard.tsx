import * as React from "react";
import { handleOpenOrderModal, selectItem } from "../../redux/features/authSlice";
import { Dispatch } from "../../redux/store";

export interface IOrdersCardProps {
  item: {
    address: string;
    city: string;
    count: string;
    country: string;
    date: string;
    gender: string;
    img: string;
    name: string;
    order_id: number;
    price: string;
    size: string;
    state: string;
    type: string;
    who_ordered: string;
    who_ordered_name: string;
    zip_code: string;
  };
}

export default function OrdersCard({ item }: IOrdersCardProps) {
  const dispatch = Dispatch();
  return (
    <div className="w-full h-auto flex my-2">
      {/* Desktop Container */}
      <div className="w-full h-auto md:flex hidden flex-col">
        <div className="w-full h-full flex">
          {/* Left Side */}
          <img src={item.img} alt="" className="object-cover max-h-[200px] border border-gray-300" />

          {/* Right Side */}
          <div className="w-full h-auto flex flex-col ml-5">
            {/* 1st layer */}
            <div className="w-full flex items-center justify-between">
              <h1 className="text-[20px] font-semibold text-gray-500 ">Ordered</h1>
              <button
                className="px-6 py-3 bg-white border border-gray-300 text-black rounded-full hover:border-black"
                onClick={() => {
                  dispatch(selectItem(item));
                  dispatch(handleOpenOrderModal());
                }}
              >
                View Or Manage
              </button>
            </div>

            <h1 className="text-black my-1 font-medium">{item.name}</h1>

            <h1 className="text-gray-500 text-[15px] my-1 font-semibold">{item.size}</h1>
          </div>
        </div>

        <hr className="border-gray-300 my-5" />
      </div>

      {/* ----------------------------------------------Mobile COntent----------------------------------------- */}
      <div className="w-full h-auto md:hidden flex flex-col">
        {/* 1st Box */}
        <div className="w-full flex items-center">
          {/* Left Side */}
          <img src={item.img} alt="" className="object-cover max-w-[150px]" />

          {/* Right Side */}
          <div className="w-full flex flex-col ml-3">
            <h1 className="md:text-[20px] text-[16px] font-semibold text-gray-500">Ordered</h1>
            <h1 className="text-black my-1 font-medium text-[16px">{item.name}</h1>
            <h1 className="text-gray-500 my-1 font-semibold text-[16px]">{item.size}</h1>
          </div>
        </div>

        {/* Button */}
        <button
          className="w-full p-4 rounded-full bg-white border border-gray-300 mb-4 mt-8 text-black"
          onClick={() => {
            dispatch(selectItem(item));
            dispatch(handleOpenOrderModal());
          }}
        >
          View or Manage
        </button>

        <hr className="border-gray-300 my-5" />
      </div>
    </div>
  );
}
