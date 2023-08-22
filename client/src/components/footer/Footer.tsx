import * as React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocation } from "react-router-dom";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  const [getHelp, setGetHelp] = React.useState(false);
  const [aboutNike, setAboutNike] = React.useState(false);
  const {pathname} = useLocation()
  //console.log(pathname)
  if(pathname === "/signup" || pathname === "/login"){
    return null
  }
  return (
    <div className="w-full min-h-[400px] footer">
      {/*Desktop Content */}
      <div className="w-full h-full md:flex hidden flex-col px-10 lg:px-[12%] xl:px-[17%] 2xl:px-[20%]">
        {/* Top */}
        <div className="w-full h-full flex justify-between mt-10">
          {/* Left */}
          <div className="grid grid-cols-3 gap-10 w-full">
            {/* 1st */}
            <div className="w-full h-full  flex flex-col  ">
              <h1 className="text-gray-200  mt-1 mb-2  text-[13.5px] font-semibold cursor-pointer">
                GIFT CARDS
              </h1>
              <h1 className="text-gray-200  my-2 text-[13.5px] font-semibold cursor-pointer">
                PROMOTIONS
              </h1>
              <h1 className="text-gray-200  my-2 text-[13.5px] font-semibold cursor-pointer">
                FIND A STORE
              </h1>
              <h1 className="text-gray-200  my-2 text-[13.5px] font-semibold cursor-pointer">
                BECOME A MEMBER
              </h1>
              <h1 className="text-gray-200  my-2 text-[13.5px] font-semibold cursor-pointer">
                NIKE JOURNAL
              </h1>
              <h1 className="text-gray-200  my-2 text-[13.5px] font-semibold cursor-pointer">
                SEND US FEEDBACK
              </h1>
            </div>

            {/* 2nd */}
            <div className="w-full h-full  flex flex-col ">
              <h1 className="text-gray-200  my-1 text-[14px] font-semibold cursor-pointer">
                GET HELP
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Order Status
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Shipping and Delivery
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Returns
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Order Cancellation
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Payment Options
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Gift Card Balance
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Contact Us
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Order Status
              </h1>
            </div>

            {/* 3rd */}
            <div className="w-full h-full  flex flex-col ">
              <h1 className="text-gray-200  my-1 text-[14px] font-semibold cursor-pointer">
                ABOUT NIKE
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                News
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Careers
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Investors
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Purpose
              </h1>
              <h1 className="text-[12.5px] text-gray-400 hover:text-white my-2 cursor-pointer">
                Sustainability
              </h1>
            </div>
          </div>

          {/* Right */}
          <div className="flex w-full h-full  ">
            <div className="flex justify-end h-[40px]  w-full">
              <IconButton className="mx-2">
                <InstagramIcon className="text-gray-200" />
              </IconButton>

              <IconButton className="mx-2">
                <TwitterIcon className="text-gray-200" />
              </IconButton>

              <IconButton className="mx-2">
                <YouTubeIcon className="text-gray-200" />
              </IconButton>

              <IconButton className="mx-2">
                <FacebookIcon className="text-gray-200" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col w-full h-full text-gray-400">
          {/* 1st Bottom Terms of sale etc.. */}
          <div className="flex items-center justify-end my-3">
            <h1 className="text-[12px] mx-5 hover:text-white cursor-pointer">
              Guides
            </h1>
            <h1 className="text-[12px] mx-5 hover:text-white cursor-pointer">
              Terms of Use
            </h1>
            <h1 className="text-[12px] mx-5 hover:text-white cursor-pointer">
              Nike Privacy Policy
            </h1>
            <h1 className="text-[12px] mx-5 hover:text-white cursor-pointer">
              Your Privacy Choices
            </h1>
          </div>

          {/* 2nd Bottom */}
          <div className="flex items-center justify-between w-full h-full mb-3">
            <div className="w-full h-full flex items-center">
              <LocationOnIcon className="text-[10px] mb-[2px]  text-gray-200" />
              <h1 className="text-[12px] ml-1 text-gray-200 cursor-pointer">
                United States
              </h1>
              <h1 className="text-[12px] ml-4 text-gray-400">
                © 2023 Nike, Inc. All Rights Reserved
              </h1>
            </div>

            <div className="flex items-center w-full h-full justify-end mr-5">
              <h1 className="text-[12px] text-gray-400 ">
                CA Supply Chains Act
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------Moblie Content----------------------------------------------- */}
      <div className="w-full h-full flex md:hidden">
        {/* Content */}
        <div className="flex flex-col w-full h-full">
          {/* 1st Section ends with send us feedback */}
          <div className="w-full h-full  flex flex-col  px-7 pt-7 pb-3">
            <h1 className="text-white mt-1 mb-2  text-[12.5px] font-semibold cursor-pointer">
              GIFT CARDS
            </h1>
            <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
              PROMOTIONS
            </h1>
            <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
              FIND A STORE
            </h1>
            <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
              BECOME A MEMBER
            </h1>
            <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
              NIKE JOURNAL
            </h1>
            <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
              SEND US FEEDBACK
            </h1>
          </div>

          <hr />

          {/* Get Help */}
          <div className="flex w-full h-full flex-col px-7 pt-7 pb-3">
            {/* Title */}
            <div className="w-full h-full justify-between flex items-center">
              <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
                GET HELP
              </h1>
              {getHelp ? (
                <RemoveIcon
                  className="text-white"
                  onClick={() => setGetHelp((val) => !val)}
                />
              ) : (
                <AddIcon
                  className="text-white"
                  onClick={() => setGetHelp((val) => !val)}
                />
              )}
            </div>

            {getHelp === true && (
              <div className="w-full h-full flex flex-col mt-3">
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Order Status
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Shipping and Delivery
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Returns
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Order Cancellation
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Payment Options
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Gift Card Balance
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Contact Us
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Order Status
                </h1>
                <hr className="my-2" />
              </div>
            )}
          </div>

          {/* About Nike */}
          <div className="flex w-full h-full flex-col px-7 pt-4 pb-3">
            {/* Title */}
            <div className="w-full h-full justify-between flex items-center">
              <h1 className="text-white my-2 text-[12.5px] font-semibold cursor-pointer">
                ABOUT NIKE
              </h1>
              {aboutNike ? (
                <RemoveIcon
                  className="text-white"
                  onClick={() => setAboutNike((val) => !val)}
                />
              ) : (
                <AddIcon
                  className="text-white"
                  onClick={() => setAboutNike((val) => !val)}
                />
              )}
            </div>

            {aboutNike === true && (
              <div className="w-full h-full flex flex-col mt-3">
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  News
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Careers
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Investors
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Purpose
                </h1>
                <h1 className="text-[12px] text-gray-400 hover:text-white my-2 cursor-pointer">
                  Sustainability
                </h1>
                <hr className="my-2" />
              </div>
            )}
          </div>

          {/* Social Media */}
          <div className="flex items-center w-full h-full px-7 pt-4 pb-3">
            <IconButton className="mr-1 bg-gray-400">
              <InstagramIcon className="text-black" />
            </IconButton>

            <IconButton className="mx-1 bg-gray-400">
              <TwitterIcon className="text-black" />
            </IconButton>

            <IconButton className="mx-1 bg-gray-400">
              <YouTubeIcon className="text-black" />
            </IconButton>

            <IconButton className="mx-1 bg-gray-400">
              <FacebookIcon className="text-black" />
            </IconButton>
          </div>

          {/* Location */}
          <div className="w-full h-full flex flex-col px-7 pt-4 pb-3">
            <div className="w-full flex h-full items-center mb-2">
              <LocationOnIcon className="text-[10px] mb-[2px]  text-gray-200" />
              <h1 className="text-[12px] ml-1 text-gray-200 cursor-pointer">
                United States
              </h1>
            </div>
            <h1 className="text-[12px] text-gray-400">
              © 2023 Nike, Inc. All Rights Reserved
            </h1>
          </div>

          {/* Last Section */}
          <div className="w-full h-full flex flex-col text-gray-400 px-7 pt-4 pb-3">
            
              <h1 className="text-[12px] my-2 hover:text-white cursor-pointer">
                Guides
              </h1>
              <h1 className="text-[12px] my-2 hover:text-white cursor-pointer">
                Terms of Use
              </h1>
              <h1 className="text-[12px] my-2 hover:text-white cursor-pointer">
                Nike Privacy Policy
              </h1>
              <h1 className="text-[12px] my-2 hover:text-white cursor-pointer">
                Your Privacy Choices
              </h1>
            
          </div>


        </div>
      </div>
    </div>
  );
}
