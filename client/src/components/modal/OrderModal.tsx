import { Modal } from "@mui/material";
import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { handleCloseOrderModal, setSelectedItem } from "../../redux/features/authSlice";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

export interface IOrderModalProps {}

export default function OrderModal(props: IOrderModalProps) {
  const { openOrderModal, selectedItem } = UseSelector((state) => state.auth);
  const dispatch = Dispatch();
  const [exchange, setExchange] = React.useState(true);
  //dayjs(User?.joined).format("MM/DD/YYYY")
  return (
    <Modal open={openOrderModal} onClose={() => dispatch(handleCloseOrderModal())}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white 2xl:w-[80%] xl:w-[90%]  sm:w-[98%] w-full h-full lg:h-auto flex overflow-y-auto">
        {/* Content */}
        <div className="w-full h-auto flex flex-col p-5">
          {/* 1st Box  */}
          <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-[23px] font-medium">Orders</h1>
            <ClearIcon
              className="text-[30px] font-medium"
              onClick={() => {
                dispatch(handleCloseOrderModal());
                dispatch(setSelectedItem());
              }}
            />
          </div>

          <hr className="mt-4 mb-10 border-gray-400" />

          {/* 2nd Box Purcchase Online */}
          <div className="flex flex-col w-full h-auto">
            <h1 className="text-gray-500 font-medium">Purchased Online - {dayjs(selectedItem?.date).format("MMM,D YYYY")}</h1>
            <h1 className="text-gray-500 font-medium">C00126128735 - ${selectedItem?.price}</h1>
          </div>

          {/* 3rd Box */}
          <div className="w-full flex flex-col lg:flex-row  h-auto lg:mt-10 mt-5">
            {/* Left Side */}
            <div className="lg:w-[60%] w-full h-auto lg:mr-5 flex flex-col">
              <hr className=" border-gray-400 lg:mb-8 mb-5" />

              {/* Exchange */}
              {exchange && (
                <div className="w-full h-auto flex flex-col p-4 bg-gray-400/40">
                  <div className="w-full flex items-center justify-between mb-[2px]">
                    <h1 className="text-black font-medium">Exchanges</h1>
                    <ClearIcon onClick={() => setExchange(false)} className=" cursor-pointer" />
                  </div>
                  <h1 className="text-[15px]">
                    Want to exchange? Give us a call and we'll make it happen. <span className="font-semibold underline">1-800-806-6453</span>
                  </h1>
                </div>
              )}

              <div className="lg:mt-10 lg:mb-5 mt-8 mb-3 flex sm:justify-normal justify-center">
                <h1 className="text-gray-500 font-medium ">Delivering Soon</h1>
              </div>

              {/* Image And Name */}
              <div className="w-full flex sm:flex-row flex-col sm:items-start items-center">
                {/* Left Side Image */}
                <img src={selectedItem?.img} alt="" className=" object-cover sm:max-w-[200px] max-w-[250px] border border-gray-300" />

                {/* Right Side Shoe details */}
                <div className="w-full flex flex-col ml-4 pt-4 sm:items-start items-center">
                  <h1 className=" font-semibold my-[1px]">{selectedItem?.name}</h1>
                  <h1 className=" font-semibold my-[1px]">${selectedItem?.price}</h1>
                  <h1 className="text-gray-500 font-medium my-[1px]">
                    {selectedItem?.gender === "men&women" ? "Men & Women" : selectedItem?.gender === "men" ? "Men" : "Women"} Shoes
                  </h1>
                  <h1 className="text-gray-500 font-medium my-[1px]">Size {selectedItem?.size}</h1>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:w-[40%] w-full h-auto lg:ml-5 flex flex-col">
              <hr className=" border-gray-400 lg:mb-8 mb-5 lg:mt-0 mt-8" />

              {/* Shipping */}
              <div className="w-full flex  justify-between">
                <h1 className="w-full font-semibold">Shipping</h1>
                <div className="w-full flex flex-col items-end">
                  <h1 className="text-gray-500 font-medium mb-[1px]">{selectedItem?.who_ordered_name}</h1>
                  <h1 className="text-gray-500 font-medium my-[1px]">{selectedItem?.address}</h1>
                  <h1 className="text-gray-500 font-medium my-[1px]">
                    {selectedItem?.city}, {selectedItem?.state} {selectedItem?.zip_code}
                  </h1>
                </div>
              </div>

              <hr className=" border-gray-400 lg:mt-8 mb-5  mt-8" />

              {/* Summary */}
              <div className="w-full h-auto flex flex-col">
                <h1 className="w-full font-semibold mb-4">Summary</h1>

                {/* Summary Details */}
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-gray-500 font-medium mb-[1px]">Subtotal</h1>
                  <h1 className="text-gray-500 font-medium mb-[1px]">${selectedItem?.price}</h1>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="text-gray-500 font-medium mb-[1px]">Shipping</h1>
                  <h1 className="text-gray-500 font-medium mb-[1px]">$0.00</h1>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="text-black font-semibold mt-[2px]">Total</h1>
                  <h1 className="text-black font-semibold mt-[2px]">${selectedItem?.price}</h1>
                </div>
              </div>

              <hr className=" border-gray-400 lg:mt-8 mb-5  mt-8" />

              {/* Need Help */}
              <div className="w-full h-auto flex flex-col">
                <h1 className="w-full font-semibold mb-2 text-[19px]">Need Help?</h1>

                <h1 className="text-black my-[6px] font-medium">Shipping and Delivery</h1>
                <h1 className="text-black my-[6px] font-medium">Cancelling an Order</h1>
                <h1 className="text-black my-[6px] font-medium">Return Policy</h1>
              </div>

              <hr className=" border-gray-400 lg:mt-8 mb-5  mt-8" />

              <div className="w-full h-auto flex flex-col pb-10">
                <div className="flex w-full items-center mb-3">
                  <ChatOutlinedIcon />
                  <h1 className="font-semibold ml-2">Chat Now</h1>
                </div>

                <div className="flex w-full items-center">
                  <LocalPhoneOutlinedIcon />
                  <h1 className="font-semibold ml-2">Contact Us</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
