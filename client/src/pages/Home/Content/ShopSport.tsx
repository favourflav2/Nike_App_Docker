import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, useMediaQuery } from "@mui/material";
import football from "../../../assets/football.webp";
import soccer from "../../../assets/soccer.webp";
import golf from "../../../assets/golf.jpeg";
import running from "../../../assets/running.webp";
import basketball from "../../../assets/basketball.webp";
import tennis from "../../../assets/tennis.webp";
import ShopSportCard from "../../../components/cards/ShopSportCard";

export interface IShopSportProps {}

 function ShopSport(props: IShopSportProps) {
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
  const data = [
    {
      name: "Nike Basketball",
      desc: "Hoop in the latest gear for the game you love.",
      img: basketball,
    },
    {
      name: "Nike Running",
      desc: "Everything you'll need for every mile.",
      img: running,
    },
    {
      name: "Nike Football",
      desc: "Commnad the filed in game-ready gear.",
      img: football,
    },
    {
      name: "Nike Soccer",
      desc: "Bring mad style to the pitch with the latest gear.",
      img: soccer,
    },
    { name: "Nike Golf", desc: "Conquer any course in style.", img: golf },
    { name: "Nike Tennis", desc: "Serve up in style.", img: tennis },
  ];
  return (
    <div className="w-full h-auto my-[50px] md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]">
      {/* Desktop Content */}
      <div className="md:flex hidden w-full h-full flex-col">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-semibold my-2">Shop by Sport</h1>

          <div className="flex items-center">
            {/* Back Button */}

            <IconButton onClick={sliderRef?.slickPrev} className=" mr-2">
              <ArrowBackIosIcon  />
            </IconButton>

            {/* Forward Button */}

            <IconButton onClick={sliderRef?.slickNext} className=" ">
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>

        <div className="w-full h-auto relative">
          <Slider {...settings} ref={setSliderRef}>
            {data.map((item: any, index: any) => (
              <ShopSportCard item={item} key={index} />
            ))}
          </Slider>
        </div>
      </div>

      {/* --------------------------------Mobile Content--------------------------------------- */}
      <div className="w-full h-full md:hidden flex flex-col">
        {/* Title */}
        <h1 className="text-[30px] font-semibold my-2">Shop by Sport</h1>
        {data.map((item:any,index:any)=>(
            <ShopSportCard item={item} key={index} />
        ))}
        
      </div>
    </div>
  );
}

export default React.memo(ShopSport)
