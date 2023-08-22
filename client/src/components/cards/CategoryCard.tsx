import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gray from '../../assets/gray.jpeg'
import { useNavigate } from "react-router-dom";

interface Data {
  item: {
    name: string;
    id: number;
    type: string;
    price: string;
    gender: string;
    desc: string;
    img: string;
    image1: string;
    image2: string;
    image3: string;
  };
}

export default function CategoryCard({ item }: Data) {
    const navigate = useNavigate()
  return (
    <div className="w-full h-auto flex flex-col p-4 cursor-pointer" onClick={()=>navigate(`/itemDetails/${item.name}/${item.id}`)}>
      <LazyLoadImage
        src={item?.img}
        alt="shoe img"
        className="w-full h-auto object-cover border border-gray-300 max-h-[400px]"
        placeholderSrc={gray}
        effect="blur"
      />

      <h1 className="font-semibold my-1 md:text-base text-[14px]">{item.name.length > 23 ? item.name.slice(0,20) + '...' : item.name}</h1>
      <h1 className=" text-gray-400 md:mb-4 mb-2 md:text-base text-[14px]">
        {item?.type.slice(0, 1).toUpperCase() +
          item.type.slice(1, item.type.length)}
      </h1>
      <h1 className="font-semibold md:text-base text-[14px]">${item.price}</h1>
    </div>
  );
}
