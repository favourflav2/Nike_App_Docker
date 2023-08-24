import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch, UseSelector } from "../../redux/store";
import CartCard from "../../components/cards/CartCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HelpIcon from "@mui/icons-material/Help";
import { IconButton, Skeleton, Tooltip, useMediaQuery } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { staleData } from "../ItemDetails/detailsData/detailsData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LatestShoeCard from "../../components/cards/LatestShoeCard";
import { stripePaymentGuest } from "../../redux/features/authSlice";

export interface ICartProps {}

export default function Cart(props: ICartProps) {
  const [readySale, setReadySale] = React.useState(true);
  const { cart, loading } = UseSelector((state) => state.cart);
  const { user, loading: authLoading } = UseSelector((state) => state.auth);
  const [promo, setPromo] = React.useState(false);
  const [inputPromo, setInputPromo] = React.useState("");
  const dispatch = Dispatch();
  const User = user?.user?.id;
  const reverse = staleData.slice().reverse();
  const [openTip, setOpenTip] = React.useState(false);

  // Total Price REduce Function
  const subtotalPrice = cart?.reduce((a, c) => {
    return a + c?.count * c?.price;
  }, 0);

  // Tooltip Checkout btn State
  const handleTooltipClose = () => {
    setOpenTip(false);
  };
  const handleTooltipOpen = () => {
    setOpenTip(true);
  };

  // Tooltip text
  const subtotalToolTip =
    "The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes.";

  // Similar / Trending Stuff
  const md = useMediaQuery("(min-width:900px)");
  const lg = useMediaQuery("(min-width:1300px)");

  const trending2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);
  const [sliderRefMobile, setSliderRefMobile] = React.useState<any>(null);

  return (
    <div className="flex w-full h-full justify-center flex-col 2xl:px-[350px] xl:px-[100px] lg:px-[50px]">
      {/* Desktop Content */}
      <div className="w-full h-full lg:flex hidden flex-col items-center">
        {/* 1st Box */}
        <div className="w-full h-auto flex mt-3">
          {/* Left Side */}
          <div className="w-[65%] flex flex-col h-auto  mr-5">
            {/* Memebers Box */}
            <div className="w-full h-auto flex flex-col border border-gray-300 p-2">
              <h1 className="text-[18px] text-orange-600 font-medium">Members get free shipping on orders $50+</h1>
              <h1 className="text-gray-500">
                Become a Nike Member for fast free shipping on orders $50+{" "}
                <span className="text-gray-600 font-semibold underline cursor-pointer">Join us</span> or{" "}
                <span className="text-gray-600 font-semibold underline cursor-pointer">Sign-in</span>
              </h1>
            </div>

            {/* Fall Ready Sale */}
            {readySale && (
              <div className="w-full h-auto flex items-center justify-between bg-gray-200 mt-3 py-2 px-1 mb-5">
                <div className="w-full flex flex-col">
                  <h1 className="text-black font-semibold text-[14px]">Fall Ready Sale | Extra 20% Off Select Styles</h1>
                  <h1 className="text-black text-[12px]">Sign in and use code READY. Ends 8.27.</h1>
                </div>

                <ClearIcon onClick={() => setReadySale(false)} />
              </div>
            )}

            {/* Mapped Cart Items */}
            <h1 className=" text-[27px] font-semibold mt-4 mb-[2px]">Bag</h1>
            {cart.length ? (
              <div className="w-full h-auto grid grid-cols-1 gap-2">
                {loading
                  ? cart.map((item: any, index: any) => <Skeleton variant="rectangular" height={150} />)
                  : cart?.map((item: any, index: any) => <CartCard item={item} key={item.uuid} />)}
              </div>
            ) : (
              <div className="w-full h-auto flex">
                <h1 className="py-5 font-bold">There are no items in your bag.</h1>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="w-[35%] flex flex-col h-auto  ml-5">
            <h1 className=" text-[27px] font-semibold">Summary</h1>

            <div className="w-full items-center flex justify-between mt-4">
              <h1 className="font-semibold">Do you have a Promo Code?</h1>
              {promo === true ? (
                <KeyboardArrowUpIcon onClick={() => setPromo((val) => !val)} />
              ) : (
                <KeyboardArrowDownIcon onClick={() => setPromo((val) => !val)} />
              )}
            </div>

            {/* If Promo */}
            {promo && (
              <div className="w-full h-auto items-center flex justify-between mt-4">
                <input
                  type="text"
                  className=" outline-none border border-gray-300 rounded-2xl indent-2 w-[70%] mr-1 h-[39px]"
                  onChange={(e) => setInputPromo(e.target.value)}
                />
                <button
                  disabled={inputPromo.length === 0}
                  className={` ${
                    inputPromo.length === 0
                      ? "border-gray-400 border h-[40px] w-[30%] ml-1 rounded-full bg-gray-200 text-gray-300"
                      : "border-gray-400 border h-[40px] w-[30%] ml-1 rounded-full"
                  }`}
                  onClick={() => setPromo((val) => !val)}
                >
                  Apply
                </button>
              </div>
            )}

            {/* Pricing */}
            <div className="w-full h-auto flex flex-col mt-4">
              {/* SubTotal */}
              <div className="w-full flex items-center justify-between my-1">
                <div className="flex items-center">
                  <h1 className=" text-[17px] font-medium">Subtotal</h1>
                  <Tooltip title={subtotalToolTip}>
                    <IconButton>
                      <HelpIcon className="text-[13px] text-black" />
                    </IconButton>
                  </Tooltip>
                </div>

                {/* Total Price */}
                <h1 className=" text-[17px] font-medium ">${subtotalPrice.toFixed(2)}</h1>
              </div>

              {/* Estimated Shipping */}
              <div className="w-full flex items-center justify-between my-1">
                <div className="flex items-center">
                  <h1 className=" text-[17px] font-medium">Estimated Shipping & Handling</h1>
                </div>

                {/* Total Price */}
                {cart.length ? (
                  <h1 className=" text-[17px] font-medium">${Number("7").toFixed(2)}</h1>
                ) : (
                  <h1 className=" text-[17px] font-medium">—</h1>
                )}
                {/* {!cart.length && <h1 className=" text-[17px] font-medium">—</h1>} */}
              </div>

              {/* Estimated Tax */}
              <div className="w-full flex items-center justify-between my-1">
                <div className="flex items-center">
                  <h1 className=" text-[17px] font-medium">Estimated Tax</h1>
                  <Tooltip title="The actual tax will be calculated based on the applicable state and local sales taxes when your order is shipped. ">
                    <IconButton>
                      <HelpIcon className="text-[13px] text-black" />
                    </IconButton>
                  </Tooltip>
                </div>

                {/* Total Price */}
                <h1 className=" text-[17px] font-medium ">—</h1>
              </div>

              <hr className="border border-gray-200 mt-4 mb-4" />

              <div className="w-full h-auto flex justify-between items-center">
                <h1 className=" text-[17px] font-medium">Total</h1>
                {cart.length ? (
                  <h1 className=" text-[17px] font-bold">${(subtotalPrice + 7).toFixed(2)}</h1>
                ) : (
                  <h1 className=" text-[17px] font-bold">${subtotalPrice.toFixed(2)}</h1>
                )}
              </div>

              <hr className="border border-gray-200 mt-4 mb-4" />

              <Tooltip
                title="My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
            minutes of inactivity. So, this will cause a delay in the response if this your the first request to my backend."
              >
                <button
                  className={` rounded-full p-4 mt-3 mb-3 ${
                    !cart?.length || authLoading ? "bg-gray-200 text-black/30" : "bg-black text-white hover:bg-gray-900"
                  }`}
                  disabled={cart?.length <= 0 || authLoading}
                  onClick={() => {
                    if (cart?.length) {
                      if (User) {
                        dispatch(stripePaymentGuest({ cart, date: new Date(), id: User }));
                      } else {
                        dispatch(stripePaymentGuest({ cart, date: new Date() }));
                      }
                    }
                  }}
                >
                  {authLoading ? "Loading..." : "Checkout"}
                </button>
              </Tooltip>
              <button disabled className="bg-gray-200 text-black  rounded-full justify-center flex p-4 border border-gray-300">
                <AppleIcon className="text-gray-400" /> <span className="text-[18px] text-gray-400">Pay</span>
              </button>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="w-full h-auto  my-20">
          <div className="w-full h-full flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-[30px] font-semibold my-2">You Might Also Like</h1>
            </div>

            <div className="w-full h-auto justify-end flex">
              <IconButton onClick={sliderRef?.slickPrev} className=" mr-2">
                <ArrowBackIosIcon />
              </IconButton>

              {/* Forward Button */}

              <IconButton onClick={sliderRef?.slickNext} className=" ">
                <ArrowForwardIosIcon />
              </IconButton>
            </div>

            {/* Slider */}
            <Slider {...trending2} ref={setSliderRef}>
              {reverse?.map((item: any, index: any) => (
                <LatestShoeCard item={item} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------Mobile Content---------------------------------------------------------- */}
      <div className="w-full h-full lg:hidden block">
        {/* Content */}
        <div className="w-full h-auto flex lg:hidden flex-col p-5">
          {/* 1st Box  */}
          <div className="w-full justify-center items-center h-auto  flex flex-col p-10">
            <h1 className="text-[25px] font-semibold">Bag</h1>
            {cart.length ? (
              <h1>
                {cart.length} Items | ${(subtotalPrice + 7).toFixed(2)}
              </h1>
            ) : (
              <h1>
                {cart.length} Items | ${subtotalPrice.toFixed(2)}
              </h1>
            )}
          </div>

          {/* Memebers Box */}
          <div className="w-full h-auto flex flex-col border border-gray-300 p-2 ">
            <h1 className="md:text-[18px]  text-orange-600 font-medium">Members get free shipping on orders $50+</h1>
            <h1 className="text-gray-500 md:text-base text-[15px]">
              Become a Nike Member for fast free shipping on orders $50+{" "}
              <span className="text-gray-600 font-semibold underline cursor-pointer">Join us</span> or{" "}
              <span className="text-gray-600 font-semibold underline cursor-pointer">Sign-in</span>
            </h1>
          </div>

          {/* Fall Ready Sale */}
          {readySale && (
            <div className="w-full h-auto flex items-center justify-between bg-gray-200 mt-3 py-2 px-1 mb-5">
              <div className="w-full flex flex-col">
                <h1 className="text-black font-semibold text-[14px]">Fall Ready Sale | Extra 20% Off Select Styles</h1>
                <h1 className="text-black text-[12px]">Sign in and use code READY. Ends 8.27.</h1>
              </div>

              <ClearIcon onClick={() => setReadySale(false)} />
            </div>
          )}

          {/* Mapped Cart Items */}
          <h1 className=" text-[27px] font-semibold mt-4 mb-[2px]">Bag</h1>
          {cart.length === 0 && <h1 className="my-4 font-bold ">Your Bag is currently empty!</h1>}
          {cart.length >= 1 && (
            <div className="w-full h-auto grid grid-cols-1 gap-2">
              {cart?.map((item: any, index: any) => (
                <CartCard item={item} key={index} />
              ))}
            </div>
          )}

          {/* You Might Also Like */}
          <div className="w-full h-auto my-20">
            <div className="w-full h-full flex flex-col">
              {/* Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-[30px] font-semibold my-2">You Might Also Like</h1>
              </div>

              <div className="w-full h-auto justify-end flex">
                <IconButton onClick={sliderRefMobile?.slickPrev} className=" mr-2">
                  <ArrowBackIosIcon />
                </IconButton>

                {/* Forward Button */}

                <IconButton onClick={sliderRefMobile?.slickNext} className=" ">
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>

              {/* Slider */}
              <Slider {...trending2} ref={setSliderRefMobile}>
                {staleData?.map((item: any, index: any) => (
                  <LatestShoeCard item={item} key={index} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* Checkout Button */}
        {cart.length && (
          <div className="w-full h-[100px]  fixed bottom-0 p-5 lg:hidden flex items-center justify-center z-10 bg-white">
            <Tooltip
            onClose={handleTooltipClose}
            open={openTip}
            placement="top"
            disableFocusListener
            title="My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
            minutes of inactivity. So, this will cause a delay in the response if this your the first request to my backend."
            >
              <button
                className={`  p-5 w-full rounded-full ${
                  !cart?.length || authLoading ? "bg-gray-200 text-black/30" : "bg-black text-white hover:bg-gray-900"
                }`}
                disabled={cart?.length <= 0 || authLoading}
                onClick={() => {
                  if (cart?.length) {
                    handleTooltipOpen()
                    if (User) {
                      dispatch(stripePaymentGuest({ cart, date: new Date(), id: User }));
                    } else {
                      dispatch(stripePaymentGuest({ cart, date: new Date() }));
                    }
                  }
                }}
              >
                {authLoading ? "Loading..." : "Checkout"}
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}
