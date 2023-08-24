import { sizeData } from "../../pages/ItemDetails/detailsData/detailsData";
import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { deleteFromCart, updateShoeCount, updateShoeSize } from "../../redux/features/cartSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Tooltip } from "@mui/material";
import { likeShoe } from "../../redux/features/authSlice";

export interface ICartCardProps {
  item: {
    count: number;
    gender: string;
    img: string;
    name: string;
    size: string;
    type: string;
    id: number;
    price: number;
  };
}

export default function CartCard({ item }: ICartCardProps) {
  const [shoeSize, setShoeSize] = React.useState(item.size);
  const [count, setCount] = React.useState(item.count);
  const { user, likedShoes } = UseSelector((state) => state.auth);
  const User = user?.user?.id;
  const dispatch = Dispatch();
  const shoeFind = likedShoes?.find((val) => val.name === item.name);
  

  const handleChangeShoeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShoeSize(event.target.value as string);
    dispatch(updateShoeSize({ ...item, newSize: event.target.value as string }));
  };
  const handleChangeShoeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(event.target.value));
    dispatch(updateShoeCount({ ...item, newCount: Number(event.target.value) }));
    //console.log(event.target.value)
  };
  const navigate = useNavigate();

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //console.log(item)
  return (
    <div className="w-full h-auto flex flex-col my-1 border sm:border-gray-200 border-gray-500 p-1 rounded-md">
      {/* Desktop Image and Name Box */}
      <div className="w-full sm:flex hidden items-center h-auto">
        {/* Image Right Side */}
        <div className="w-[30%] h-auto ">
          <img src={item.img} alt="" className="object-cover max-w-[250px]  w-full " />
        </div>

        {/* Right Sider Name */}
        <div className="w-[70%] flex flex-col h-auto px-1 ">
          {/* Name and Price*/}
          <div className="w-full flex items-center justify-between ">
            <h1 className="font-bold mb-[2px] cursor-pointer hover:underline" onClick={() => navigate(`/itemDetails/${item.name}/${item.id}`)}>
              {item.name}
            </h1>
            <h1 className="font-bold">${(Number(item.price) * item.count).toFixed(2)}</h1>
          </div>

          {/* Gender */}
          <h1 className="text-gray-500 font-medium mb-[2px] md:text-base text-[14px]">
            {item.gender === "men&women" ? "Men & Women" : `${item.gender.slice(0, 1).toUpperCase() + item.gender.slice(1, item.gender.length)}`}{" "}
            Shoes
          </h1>

          {/* Materials */}
          <h1 className="text-gray-500 font-medium mb-[2px] md:text-base text-[14px]">White/Platinum Tint/Light Crimson/Velvet Brown</h1>

          {/* Parent Div For Size and Count Selects */}
          <div className="w-full flex items-center mt-[2px]">
            {/* Size */}
            <h1 className="text-gray-500 text-[14px] font-bold underline">Size:</h1>
            <select onChange={handleChangeShoeSize} className="w-auto mr-4 text-[14px] text-gray-500 font-semibold">
              <option>{shoeSize}</option>
              {sizeData.map(
                (value: any, index: any) =>
                  value.size !== shoeSize && (
                    <option value={value.size} key={index}>
                      {value.size}
                    </option>
                  )
              )}
            </select>

            {/* Count */}
            <h1 className="text-gray-500 text-[14px] font-bold underline">Count:</h1>
            <select className="w-auto text-[14px] text-gray-500 font-semibold" onChange={handleChangeShoeCount}>
              <option>{count}</option>
              {arr.map(
                (value: any, index: any) =>
                  value !== count && (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  )
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="w-full h-auto flex items-center md:mt-5 mt-7">
            {User ? (
              shoeFind?.name === item.name ? (
                <FavoriteIcon
                  className="font-light text-[26px] md:mr-3 mr-6 text-red-500"
                  onClick={() => dispatch(likeShoe({ shoeData: { ...item } }))}
                />
              ) : (
                <FavoriteBorderIcon className="font-light text-[26px] md:mr-3 mr-6" onClick={() => dispatch(likeShoe({ shoeData: { ...item } }))} />
              )
            ) : (
              <Tooltip title="If you login you will be able to save shoes to your favorites">
                <FavoriteBorderIcon className="font-light text-[26px] md:mr-3 mr-6" />
              </Tooltip>
            )}

            <DeleteOutlineIcon
              className="font-light text-[28px]"
              onClick={() => {
                dispatch(deleteFromCart({ ...item }));
              }}
            />
          </div>
        </div>
      </div>
              {/* ----------------------------------------------------------------------------------------------- */}
      {/* Mobile Image and Name Box */}
      <div className="w-full sm:hidden flex flex-col items-center h-auto">
        {/* Image Right Side */}
        <div className="w-full h-auto mb-4 flex items-center justify-center">
          <img src={item.img} alt="" className="object-cover max-w-[250px]  w-full " />
        </div>

        {/* Right Sider Name */}
        <div className="w-[70%] flex flex-col h-auto px-1 ">
          {/* Name and Price*/}
          <div className="w-full flex items-center justify-between ">
            <h1 className="font-bold mb-[2px] cursor-pointer hover:underline" onClick={() => navigate(`/itemDetails/${item.name}/${item.id}`)}>
              {item.name}
            </h1>
            <h1 className="font-bold">${(Number(item.price) * item.count).toFixed(2)}</h1>
          </div>

          {/* Gender */}
          <h1 className="text-gray-500 font-medium mb-[2px] md:text-base text-[14px]">
            {item.gender === "men&women" ? "Men & Women" : `${item.gender.slice(0, 1).toUpperCase() + item.gender.slice(1, item.gender.length)}`}{" "}
            Shoes
          </h1>

          {/* Materials */}
          <h1 className="text-gray-500 font-medium mb-[2px] md:text-base text-[14px]">White/Platinum Tint/Light Crimson/Velvet Brown</h1>

          {/* Parent Div For Size and Count Selects */}
          <div className="w-full flex items-center mt-[2px]">
            {/* Size */}
            <h1 className="text-gray-500 text-[14px] font-bold underline">Size:</h1>
            <select onChange={handleChangeShoeSize} className="w-auto mr-4 text-[14px] text-gray-500 font-semibold">
              <option>{shoeSize}</option>
              {sizeData.map(
                (value: any, index: any) =>
                  value.size !== shoeSize && (
                    <option value={value.size} key={index}>
                      {value.size}
                    </option>
                  )
              )}
            </select>

            {/* Count */}
            <h1 className="text-gray-500 text-[14px] font-bold underline">Count:</h1>
            <select className="w-auto text-[14px] text-gray-500 font-semibold" onChange={handleChangeShoeCount}>
              <option>{count}</option>
              {arr.map(
                (value: any, index: any) =>
                  value !== count && (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  )
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="w-full h-auto flex items-center justify-center md:mt-5 mt-7">
            {User ? (
              shoeFind?.name === item.name ? (
                <FavoriteIcon
                  className="font-light text-[26px] md:mr-3 mr-6 text-red-500"
                  onClick={() => dispatch(likeShoe({ shoeData: { ...item } }))}
                />
              ) : (
                <FavoriteBorderIcon className="font-light text-[26px] md:mr-3 mr-6" onClick={() => dispatch(likeShoe({ shoeData: { ...item } }))} />
              )
            ) : (
              <Tooltip title="If you login you will be able to save shoes to your favorites">
                <FavoriteBorderIcon className="font-light text-[26px] md:mr-3 mr-6" />
              </Tooltip>
            )}

            <DeleteOutlineIcon
              className="font-light text-[28px]"
              onClick={() => {
                dispatch(deleteFromCart({ ...item }));
              }}
            />
          </div>
        </div>
      </div>

      {/* Below Image */}
      <div className="w-full h-auto flex flex-col mt-4 sm:items-start items-center">
        <h1 className="font-semibold md:text-base text-[15px]">Shipping</h1>
        <h1 className=" font-normal md:text-base text-[14px]">
          Arrives by Fri, Aug 18 <span className="font-semibold underline cursor-pointer">Edit Location</span>
        </h1>

        <h1 className="font-semibold mt-6 md:text-base text-[16px]">Free Pickup</h1>
        <h1 className="font-semibold underline cursor-pointer md:text-base text-[16px]">Find a Store</h1>
      </div>


    </div>
  );
}
