import * as React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { useGetAllShoesQuery } from "../../../redux/api/shoeApi";
import LatestShoeCard from "../../../components/cards/LatestShoeCard";
import { staleData } from "../../ItemDetails/detailsData/detailsData";

export interface ILatestShoesProps {}

export default function LatestShoes(props: ILatestShoesProps) {
  const md = useMediaQuery("(min-width:900px)");
  const lg = useMediaQuery("(min-width:1300px)");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);
  //const {data} = useGetAllShoesQuery()

  return (
    <div className="w-full h-auto my-[50px] md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-semibold my-2">The Latest in Footwear</h1>

          <div className="flex items-center">
            {/* Back Button */}

            <IconButton onClick={sliderRef?.slickPrev} className=" mr-2">
              <ArrowBackIosIcon />
            </IconButton>

            {/* Forward Button */}

            <IconButton onClick={sliderRef?.slickNext} className=" ">
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>

        {/* Slider */}
        <Slider {...settings} ref={setSliderRef}>
            {staleData?.map((item:any,index:any)=>(
                <LatestShoeCard item={item} key={index} />
            ))}
        </Slider>
        


      </div>
    </div>
  );
}
