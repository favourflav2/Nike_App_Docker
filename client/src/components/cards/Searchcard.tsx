import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface ISearchCardProps {
  item: {
    desc: string
    gender: string;
    id: number;
    img: string;
    name: string;
    price: string;
    type: string;
  };
  change : React.Dispatch<React.SetStateAction<boolean>>
  setState: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchCard({item,change,setState}: ISearchCardProps) {
  const navigate = useNavigate()
  return (
    <div className="flex w-auto cursor-pointer mx-2" onClick={()=>{
      change(false)
      navigate(`itemDetails/${item.name}/${item.id}`)
      setState("")
    }}>
      {/* Content */}
      <div className="flex flex-col w-full">
        <img src={item.img} alt="" className="w-full"/>
        {/* Name */}
        <h1 className="text-[15px] font-semibold mt-2">{item.name}</h1>

        {/* Gender */}
        <h1 className="text-gray-400 text-[14px] font-medium my-1">{item.gender === 'men&women' ? 'Mens & Womens Shoes' : item.gender === 'men' ? 'Men Shoes' : 'Women Shoes'}</h1>

        {/* Price */}
        <h2 className="text-[14px] font-semibold mt-2">${item.price}</h2>
      </div>
    </div>
  );
  }