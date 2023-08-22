import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrendingCard from "../../../components/cards/TrendingCard";
import { IconButton, useMediaQuery } from "@mui/material";
//import { useGetAllShoesQuery } from "../../../redux/api/shoeApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { staleData } from "../../ItemDetails/detailsData/detailsData";

export interface ITredningProps {}

export default function Trending(props: ITredningProps) {
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
  //const {data,isFetching,error} = useGetAllShoesQuery()
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  // React.useEffect(()=>{
  //   if(error){
  //     alert(error)
  //   }
  // },[error])
 

  //console.log(data)

  return (
    <div className="w-full h-auto my-[50px] md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Title */}
        <h1 className="text-[30px] font-semibold my-2">Trending</h1>
        

        <div className="w-full h-auto relative">
          <Slider {...settings} ref={setSliderRef}>
              {staleData.map((item: any, index: any) => (
                <TrendingCard item={item} key={index}/>
              ))}
          </Slider>
          {/* <Slider {...settings} ref={setSliderRef}>
            {isFetching
            ? 
            (
              Array.from(new Array(10)).map((item: any, index: any) => (
                <div className="md:max-w-[500px] h-[300px] mx-2 border border-gray-300 bg-gray-400" key={index}>

                </div>
                
              ))
            ) 
            : 
            (
              data.map((item: any, index: any) => (
                <TrendingCard item={item} key={index}/>
              ))
            )
            }
          </Slider> */}

          {/* Back Button */}
          <div className=" absolute top-[45%]  left-2 hidden md:block">
            <IconButton onClick={sliderRef?.slickPrev}>
              <ArrowBackIosIcon />
            </IconButton>
          </div>

          {/* Forward Button */}
          <div className=" absolute top-[45%]  right-2 hidden md:block">
            <IconButton onClick={sliderRef?.slickNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>


        </div>
      </div>
    </div>
  );
}
