import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ILatestShoeCardProps {
  item: {
    desc: string;
    gender: string;
    id: number;
    img: string;
    name: string;
    price: string;
    type: string;
  };
}

export default function LatestShoeCard({ item }: ILatestShoeCardProps) {
  const xl = useMediaQuery("(min-width:1224px)");
  const navigate = useNavigate()

  return (
    <div className="md:max-w-[500px] h-auto mx-2 cursor-pointer" onClick={()=>navigate(`/itemDetails/${item.name}/${item.id}`)}>
      {/* Content */}
      <div className="w-full h-full flex-col flex">
        <img
          src={item.img}
          alt=""
          className="w-full h-full object-cover border border-gray-200"
        />

        {/* Name and Price */}
        <div className="flex items-center justify-between mt-2 font-semibold px-2">
          {!xl ? (
            <h1 className="text-[13px] sm:text-[15px] ">
              {item.name.length >= 20
                ? item.name.slice(0, 20) + "..."
                : item.name}
            </h1>
          ) : (
            <h1>{item.name}</h1>
          )}
          <h1 className="text-[13px] sm:text-[15px] mr-2">${item.price}</h1>
        </div>

        {/* Type */}
        <h1 className="text-[12px] sm:text-[14px] text-gray-500 font-medium px-2 mt-1">
          Shoes
        </h1>
      </div>
    </div>
  );
}
