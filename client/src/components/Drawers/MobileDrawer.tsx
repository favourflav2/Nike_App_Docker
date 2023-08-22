import { Drawer,Badge } from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import jordan from '../../assets/jordan.png'
import converse from '../../assets/converse.png'
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Dispatch, UseSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { setTabValue } from "../../redux/features/cartSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from "../../redux/features/authSlice";
import {  toast } from 'react-toastify';

export interface IMobileDrawerProps {
  state: boolean;
  change: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileDrawer({ state, change }: IMobileDrawerProps) {
    const [men,setMen] = React.useState(false)
    const dispatch = Dispatch()
    const [women,setWomen] = React.useState(false)
    const [kid,setKid] = React.useState(false)
    const {cart} = UseSelector(state => state.cart)
    const {user} = UseSelector(state => state.auth)
    const User = user?.user?.id
    const UserFirstName = user?.user?.first_name
    const navigate = useNavigate()
    const totalItemCart = cart?.reduce((a, c) => {
        return a + c?.count;
      }, 0);
  return (
    <Drawer anchor="right" onClose={() => change(false)} open={state}>
      <div className=" w-[320px] flex h-full ">
        {/* Content */}
        {men === false && women === false && kid === false && 
        <div className="flex flex-col px-7 w-full h-full py-3">

            {/* Close Icon */}
          <div className=" justify-end flex mb-3">
            <CloseIcon className="text-black" sx={{fontSize:"25px"}} onClick={()=>change(false)}/>
          </div>

          {/* User */}
          {User && <div className="w-full flex items-center justify-between my-2 mb-10" onClick={()=>{
            change(false)
            navigate('/profile/profile')
            dispatch(setTabValue("profile"))
          }}>
            {/* Title */}
            <h2 className="text-[26px] font-medium cursor-pointer">Hi, {UserFirstName.slice(0,1).toUpperCase() + UserFirstName.slice(1,UserFirstName.length)}</h2>

            {/* Icon */}
            <ArrowForwardIosIcon sx={{fontSize:"20px"}}/>

          </div>}

          {/* Men */}
          <div className="w-full flex items-center justify-between my-2" onClick={()=>setMen(true)}>
            {/* Title */}
            <h2 className="text-[24px] font-medium cursor-pointer">Men</h2>

            {/* Icon */}
            <ArrowForwardIosIcon sx={{fontSize:"20px"}}/>

          </div>

          {/* Women */}
          <div className="w-full flex items-center justify-between my-2" onClick={()=>setWomen(true)}>
            {/* Title */}
            <h2 className="text-[24px] font-medium">Women</h2>

            {/* Icon */}
            <ArrowForwardIosIcon sx={{fontSize:"20px"}} className=" cursor-pointer" />

          </div>

          {/* Kid */}
          <div className="w-full flex items-center justify-between my-2" onClick={()=>setKid(true)}>
            {/* Title */}
            <h2 className="text-[24px] font-medium">Kids</h2>

            {/* Icon */}
            <ArrowForwardIosIcon sx={{fontSize:"20px"}} className=" cursor-pointer" />

          </div>

          {/* Jordan And Converse Sign */}
          <div className="flex flex-col px-1 py-8">
            {/* Jordan */}
            <div className="flex items-center mb-4">
                <img src={jordan} alt="" className="h-[24px] w-[24px] mr-4"/>
                <h6 className="text-black font-semibold">Jordan</h6>
            </div>

            {/* Converse */}
            <div className="flex items-center">
                <img src={converse} alt="" className="h-[24px] w-[24px] mr-4"/>
                <h6 className="text-black font-semibold">Converse</h6>
            </div>
          </div>

          {/* Become A Nike Member */}
          {!User && <div className="flex flex-col mt-8 py-4">
            <h1 className="text-gray-600 font-medium text-[19px]">Become a Nike Member for the best products, inspiration and stories in <span className="text-black font-bold text-[19px] underline cursor-pointer">Learn more</span></h1>

            {/* Buttons */}
            <div className="flex items-center mt-5">
                <button className="text-white bg-black rounded-[25px] p-2 w-[100px] mr-5 hover:bg-gray-500" onClick={()=>{
                    change(false)
                    navigate("/signup")
                }}>Join Us</button>
                <button className="text-black bg-white border border-gray-400 rounded-[25px] p-2 w-[100px] hover:border-black" onClick={()=>{
                    change(false)
                    navigate("/login")
                }}>Sign In</button>
            </div>
          </div>}

          {/* Icons */}
          <div className="flex flex-col mt-10 pb-10">
            <div className="flex items-center my-1">
            <Badge
              badgeContent={totalItemCart}
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
            >
              <ShoppingBagOutlinedIcon  sx={{fontSize:"24px"}} onClick={()=>{
                    change(false)
                    navigate("/cart")
                }}/>
            </Badge>
                
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 " onClick={()=>{
                    change(false)
                    navigate("/cart")
                }}>Bag</h1>
            </div>

            <div className="flex items-center  my-1" onClick={()=>{
                    change(false)
                    navigate("/profile/favorites")
                    dispatch(setTabValue('favorites'))
                }}>
                <FavoriteBorderIcon  sx={{fontSize:"24px"}}/>
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 ">Favorites</h1>
            </div>

            <div className="flex items-center  my-1">
                <RedeemOutlinedIcon  sx={{fontSize:"24px"}}/>
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 " onClick={()=>{
                    change(false)
                    navigate("/profile/orders")
                    dispatch(setTabValue('orders'))
                }}>Orders</h1>
            </div>

            <div className="flex items-center  my-1">
                <StoreOutlinedIcon  sx={{fontSize:"24px"}}/>
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 ">Find A Store</h1>
            </div>

            <div className="flex items-center  my-1">
                <HelpOutlineOutlinedIcon  sx={{fontSize:"24px"}}/>
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 ">Help</h1>
            </div>

            {User && <div className="flex items-center  my-1 text-red-500 cursor-pointer" onClick={()=>{
                change(false)
                dispatch(setLogout())
                toast.success("You Have Logged Out")
                navigate("/")
            }}>
                <LogoutIcon  sx={{fontSize:"24px"}}/>
                <h1 className="text-[18px] font-medium cursor-pointer ml-2 ">Logout</h1>
            </div>}
          </div>


        </div>}

        {/* Men Section */}
        {men === true && 
        <div className="flex flex-col px-7 w-full h-full py-10 overflow-auto">

            {/* Go back */}
            <div className="flex items-center" onClick={()=>setMen(false)}>
                <ArrowBackIosIcon sx={{fontSize:"20px"}} className=" cursor-pointer"/>
                <h6 className=" font-semibold ml-1 cursor-pointer">All</h6>
            </div>

            {/* Title */}
            <div className="mt-10 mb-6">
                <h1 className="text-[26px] font-semibold">Men</h1>
            </div>

            {/* Lists */}
            <div className="flex flex-col">

                <div className="flex flex-col">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Featured</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/men/All Nikes')
                    }}>- Sale </h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- New Syles Added <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Best Sellers <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Back to School Sale <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Rep Your National Team <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Shoes</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/men/All Nikes')
                    }}>- All Nike</h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Lifestyle <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Max <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Basketball <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Soccer <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Golf <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Force 1 <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Clothing</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Tops & T-Shirts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Pants & Tights <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Big & Tall <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Hoodies & Sweatshirts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Socks <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Shorts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jackets & Vests <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Fitness <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Underwear <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Matching Sets <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

            </div>
        </div>}

        {/* Women Section */}
        {women === true && 
        <div className="flex flex-col px-7 w-full h-full py-10 overflow-auto">

            {/* Go back */}
            <div className="flex items-center" onClick={()=>setWomen(false)}>
                <ArrowBackIosIcon sx={{fontSize:"20px"}} className=" cursor-pointer"/>
                <h6 className=" font-semibold ml-1 cursor-pointer">All</h6>
            </div>

            {/* Title */}
            <div className="mt-10 mb-6">
                <h1 className="text-[26px] font-semibold">Women</h1>
            </div>

            {/* Lists */}
            <div className="flex flex-col">

                <div className="flex flex-col">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Featured</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/women/All Nikes')
                    }}>- Sale </h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- New Syles Added <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Best Sellers <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Back to School Sale <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Rep Your National Team <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Shoes</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/women/All Nikes')
                    }}>- All Nike</h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Lifestyle <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Max <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Basketball <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Soccer <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Golf <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Force 1 <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Clothing</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Tops & T-Shirts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Pants & Leggings <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Plus Size <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Hoodies & Sweatshirts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Socks <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Shorts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Skirts & Dresses <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Fitness <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Underwear <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Matching Sets <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

            </div>
        </div>}

        {/* Kids Section */}
        {kid === true && 
        <div className="flex flex-col px-7 w-full h-full py-10 overflow-auto">

            {/* Go back */}
            <div className="flex items-center" onClick={()=>setKid(false)}>
                <ArrowBackIosIcon sx={{fontSize:"20px"}} className=" cursor-pointer"/>
                <h6 className=" font-semibold ml-1 cursor-pointer">All</h6>
            </div>

            {/* Title */}
            <div className="mt-10 mb-6">
                <h1 className="text-[26px] font-semibold">Kids</h1>
            </div>

            {/* Lists */}
            <div className="flex flex-col">

                <div className="flex flex-col">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Featured</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/All/All Nikes')
                    }}>- Sale </h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- New Syles Added <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Best Sellers <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Back to School Sale <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Rep Your National Team <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Shoes</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/All/All Nikes')
                    }}>- All Nike</h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Jordan <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Lifestyle <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Max <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Basketball <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Soccer <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Golf <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Air Force 1 <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

                <div className="flex flex-col mt-3">
                    {/* Title */}
                    <h1 className="text-gray-700 underline font-medium cursor-pointer mb-2">Clothing</h1>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/All/All Nikes')
                    }}>- Tops & T-Shirts</h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer' onClick={()=>{
                        change(false)
                        navigate('/category/All/All Nikes')
                    }}>- Pants & Leggings</h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Plus Size <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Hoodies & Sweatshirts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Socks <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Shorts <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Skirts & Dresses <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Fitness <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Underwear <span className='text-xs'>(Currently unavailable)</span></h6>
                    <h6 className='my-1 text-[15px] text-gray-600 font-medium hover:text-gray-900 cursor-pointer'>- Matching Sets <span className='text-xs'>(Currently unavailable)</span></h6>
                </div>

            </div>
        </div>}

      </div>
    </Drawer>
  );
}
