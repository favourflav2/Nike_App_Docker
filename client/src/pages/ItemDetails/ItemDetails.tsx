import * as React from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery, IconButton, Tooltip, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { staleData } from "./detailsData/detailsData";
import { sizeData } from "./detailsData/detailsData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarIcon from "@mui/icons-material/Star";
import { reviewData } from "./detailsData/detailsData";
import ReviewCard from "../../components/cards/ReviewCard";
//import { useGetAllShoesQuery } from "../../redux/api/shoeApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LatestShoeCard from "../../components/cards/LatestShoeCard";
import gray from "../../assets/gray.jpeg";
import { Dispatch, UseSelector } from "../../redux/store";
import { addToCart } from "../../redux/features/cartSlice";
import { v4 as uuid } from "uuid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getLikedShoes, likeShoe, setError } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

export interface IItemDetailsProps {}

export default function ItemDetails(props: IItemDetailsProps) {
  const { id, name } = useParams();
  const [shoeSize, setShoeSize] = React.useState<string>("");
  const [shipping, setShipping] = React.useState(false);
  const [rev, setRev] = React.useState(false);
  const [addToCartError, setAddToCartError] = React.useState(false);
  const dispatch = Dispatch();
  const { likedShoes, user, error: authError, loading } = UseSelector((state) => state.auth);
  const { cart } = UseSelector((state) => state.cart);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [scroll, setScroll] = React.useState(false);
  const User = user?.user?.id;
  const myRef = React.useRef<any>(null);
  const executeScroll = () => myRef?.current?.scrollTo(0, 0);

  // Liked Shoes is going to return an array of items we have liked
  // In order to check if our single item we have is liked we are going to use find
  const shoeFind = likedShoes?.find((val) => val.name === name);

  //const { data, isFetching, error } = useGetAllShoesQuery();
  //   const singleItem =  staleData.find(
  //     (item) => item.name === name && item.id === Number(id)
  //   );

  const singleItem = React.useMemo(() => staleData.find((item) => item.name === name), [name]);
  //const singleItem = staleData.find((item) => item.name === name)

  const [nav1, setNav1] = React.useState<any>();
  const [nav2, setNav2] = React.useState<any>();

  // React.useEffect(() => {
  //   if (error) {
  //     alert(error);
  //   }
  // }, [error]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    executeScroll();
    //dispatch(setError());
  }, [id, name, cart, dispatch]); // eslint-disable-line
  React.useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);
  React.useEffect(() => {
    if (likedShoes.length === 0) {
      if (user?.user) {
        dispatch(getLikedShoes());
        dispatch(setError());
      }
    }
  }, []); // eslint-disable-line

  const settings = {
    className: "center",
    centerPadding: "0px",
    dots: false,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const settings3 = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  // Similar / Trending Stuff
  const md = useMediaQuery("(min-width:900px)");
  const lg = useMediaQuery("(min-width:1300px)");
  const trending = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };
  const trending2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return <ArrowBackIosIcon className={className} style={{ ...style, display: "block", color: "black" }} onClick={onClick} />;
  }
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return <ArrowForwardIosIcon className={className} style={{ ...style, display: "block", color: "black" }} onClick={onClick} />;
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    executeScroll();
  }, [scroll]);

  //console.log(singleItem)
  //console.log(addToCartError)
  //console.log(cart)


  return (
    <div className="w-full h-full">
      {/* Desketop Content */}
      <div className="w-full h-full lg:flex hidden flex-col">
        {/* Top Section */}
        <div className="grid grid-cols-[60%_40%]  w-full ">
          {/* Left Side Image */}
          <div className=" w-full h-full flex p-10 justify-center  ">
            {/* Vertical SLider */}
            <Slider
              {...settings}
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              swipeToSlide={true}
              focusOnSelect={true}
              className=" mt-3 lg:w-[100px] w-[80px] lg:h-[500px]"
            >
              <LazyLoadImage
                src={singleItem?.img}
                alt=""
                className="object-cover border-gray-300 border  bg-black rounded-2xl"
                placeholderSrc={gray}
                effect="blur"
              />

              <LazyLoadImage
                src={singleItem?.image1}
                alt=""
                className=" object-cover border-gray-300 border  bg-black rounded-2xl"
                placeholderSrc={gray}
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image2}
                alt=""
                className="object-cover border-gray-300 border  bg-black rounded-2xl "
                placeholderSrc={gray}
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image3}
                alt=""
                className="object-cover border-gray-300 border  bg-black rounded-2xl "
                placeholderSrc={gray}
                effect="blur"
              />
            </Slider>

            {/* Main Slider */}
            <Slider {...settings2} asNavFor={nav2} ref={(slider1) => setNav1(slider1)} className=" mt-3 w-full lg:max-w-[500px] lg:h-[500px]">
              <LazyLoadImage
                src={singleItem?.img}
                alt=""
                className="object-cover border border-gray-300  w-full"
                placeholderSrc={gray}
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image1}
                alt=""
                className="object-cover border border-gray-300 w-full "
                placeholderSrc={gray}
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image2}
                alt=""
                className="object-cover border border-gray-300 w-full  "
                placeholderSrc={gray}
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image3}
                alt=""
                className="object-cover border border-gray-300 w-full  "
                placeholderSrc={gray}
                effect="blur"
              />
            </Slider>
          </div>

          {/* Right Side Sizes */}
          <div className=" w-full max-h-[700px] pr-10 pb-10 pt-10 flex justify-center overflow-y-scroll border-b border-gray-300" ref={myRef}>
            {/* Content */}
            <div className=" flex w-full h-full flex-col">
              {/* Shoe Name */}
              <h1 className="text-[28px] font-medium">{singleItem?.name}</h1>

              {/* Shoe Type */}
              {singleItem?.type && (
                <h1 className="text-[15px] font-medium">
                  {singleItem?.type.slice(0, 1).toUpperCase() + singleItem.type.slice(1, singleItem.type.length)}
                </h1>
              )}

              {/* Shoe Price */}
              <h1 className="mt-4 text-[15px] font-medium">${singleItem?.price}</h1>

              {/* Select Shoe Size */}
              <div className={`w-full mb-2 flex justify-between mt-[55px]`}>
                <h1 className="font-medium text-[15px]">Select Size</h1>
                <h1 className="font-semibold text-[15px] text-gray-400">Size Guide</h1>
              </div>

              {/* Buttons */}
              <div className={`w-full h-full grid grid-cols-2 gap-1 ${addToCartError ? "border border-red-500" : ""}`}>
                {sizeData.map((item: any, index: any) => (
                  <button
                    key={index}
                    className={` ${item.size === shoeSize ? "border border-black p-3" : "border border-gray-300 p-3"}`}
                    onClick={() => {
                      setAddToCartError(false);
                      setShoeSize(item.size);
                    }}
                  >
                    {item.size}
                  </button>
                ))}
              </div>

              {/* Error State */}
              {addToCartError && (
                <div className="w-full h-auto flex justify-end">
                  <h1 className=" font-bold text-red-500">Please Select a Size</h1>
                </div>
              )}

              {/* Interest */}
              <div className="w-full flex items-center flex-col mt-7 mb-3">
                <h1 className="font-semibold text-[15px]">4 interest-free payments of $50.00 with</h1>
                <div className="flex items-center">
                  <h1 className="font-bold">Klarna.</h1>
                  <h1 className=" cursor-pointer underline font-semibold">Learn More</h1>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center w-full">
                <button
                  className="bg-black text-white p-4 min-w-[60%] rounded-3xl hover:bg-gray-300 hover:text-black my-1 hover:border hover:border-gray-400"
                  onClick={() => {
                    if (shoeSize) {
                      if (singleItem) {
                        dispatch(
                          addToCart({
                            id: singleItem.id,
                            gender: singleItem.gender,
                            img: singleItem.img,
                            name: singleItem.name,
                            type: singleItem.type,
                            count: 1,
                            size: shoeSize,
                            price: Number(singleItem.price),
                            uuid: small_id,
                          })
                        );
                        setShoeSize("");
                        setScroll((val) => !val);
                      }
                    } else {
                      setAddToCartError(true);
                    }
                  }}
                >
                  Add to Bag
                </button>
                {User ? (
                  shoeFind?.name === name ? (
                    loading ? (
                      <CircularProgress />
                    ) : (
                      <button
                        className="bg-white text-black border border-gray-400 p-4 min-w-[60%] rounded-3xl  hover:bg-gray-300 my-1 hover:border  "
                        onClick={() => dispatch(likeShoe({ shoeData: singleItem }))}
                      >
                        Favorite <FavoriteIcon className="text-sm text-red-500" />
                      </button>
                    )
                  ) : loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      className="bg-white text-black border border-gray-400 p-4 min-w-[60%] rounded-3xl  hover:bg-gray-300 my-1 hover:border  "
                      onClick={() => dispatch(likeShoe({ shoeData: singleItem }))}
                    >
                      Favorite <FavoriteBorderIcon className="text-sm" />
                    </button>
                  )
                ) : (
                  <Tooltip title="If you login you will be able to save shoes to your favorites">
                    <button className="bg-white text-black border border-gray-400 p-4 min-w-[60%] rounded-3xl  hover:bg-gray-300 my-1 hover:border  ">
                      Favorite <FavoriteBorderIcon className="text-sm" />
                    </button>
                  </Tooltip>
                )}
              </div>

              {/* Shipping */}
              <div className="w-full flex flex-col mt-7">
                <h1 className="font-medium mb-1">Shipping*</h1>
                <h1 className="font-medium mb-1">To get accurate shipping information</h1>
                <h1 className="font-bold underline cursor-pointer">Edit Location</h1>

                <h1 className="mt-8 font-medium">Free Pickup</h1>
                <h1 className="font-bold underline cursor-pointer">Find A Store</h1>

                <h1 className="text-gray-400 font-semibold text-[14px] my-4">*Faster Shipping options may be available</h1>
              </div>

              {/* Shoe Desc */}
              <p className="lg:w-[70%] mt-8 mb-6 font-medium leading-8">{singleItem?.desc}</p>

              {/* Shoe Materilas */}
              <div className="flex items-center mb-1 lg:w-[70%]">
                <FiberManualRecordIcon className="text-black text-base mr-2 " />
                <h1>Shown: Light Orewood Brown/Light British Tan/Palomino/Metallic Gold</h1>
              </div>
              <div className="flex items-center mb-1 lg:w-[70%]">
                <FiberManualRecordIcon className="text-black text-base mr-2 " />
                <h1>Style: CT8532-102</h1>
              </div>

              {/* View Product Details */}
              <h1 className="underline font-bold cursor-pointer my-10">View Product Details</h1>

              <hr className="border-gray-300 font-bold border-[1px] mb-4" />

              {/* Shipping and Returns */}
              <div className="w-full flex items-center justify-between my-3 ">
                <h1 className=" font-semibold text-[20px] cursor-pointer" onClick={() => setShipping((val) => !val)}>
                  Shipping & Returns
                </h1>
                {shipping === true ? (
                  <KeyboardArrowUpIcon onClick={() => setShipping((val) => !val)} className="cursor-pointer" />
                ) : (
                  <KeyboardArrowDownIcon onClick={() => setShipping((val) => !val)} className="cursor-pointer" />
                )}
              </div>
              {shipping && (
                <div className="w-full flex flex-col mt-2">
                  <p className="mt-2 mb-6">
                    Free standard shipping on orders $50+ and free 60-day returns for Nike Members.{" "}
                    <span className="font-bold underline cursor-pointer">Learn more. Return policy exclusions apply.</span>
                  </p>
                  <h1 className="font-bold underline cursor-pointer mb-4">Pick-up available at select Nike Stores.</h1>
                </div>
              )}

              <hr className="border-gray-300 font-bold border-[1px] my-4" />

              {/* Reviews */}
              <div className="w-full flex items-center justify-between my-3">
                <h1 className=" font-semibold text-[20px] cursor-pointer" onClick={() => setRev((val) => !val)}>
                  Reviews (200)
                </h1>
                <div className="flex items-center">
                  {Array.from(new Array(5)).map((item: any, index: any) => (
                    <StarIcon key={index} />
                  ))}
                  {rev ? (
                    <KeyboardArrowUpIcon className="cursor-pointer" onClick={() => setRev((val) => !val)} />
                  ) : (
                    <KeyboardArrowDownIcon className="cursor-pointer" onClick={() => setRev((val) => !val)} />
                  )}
                </div>
              </div>

              {rev && (
                <div className="w-full flex flex-col mt-8 pb-20">
                  {/* Stars */}
                  <div className="w-full flex items-center">
                    {Array.from(new Array(5)).map((item: any, index: any) => (
                      <StarIcon key={index} />
                    ))}
                    <h1 className="ml-3 font-medium ">4.9 Stars</h1>
                  </div>

                  {/* Write A Review */}
                  <h1 className="font-bold underline text-[18px mt-5 mb-10 cursor-pointer">Write a Review</h1>

                  {/* Reviews */}
                  {reviewData.map((item: any, index: any) => (
                    <ReviewCard item={item} key={index} />
                  ))}
                </div>
              )}

              <hr className="border-gray-300 font-bold border-[1px] my-4" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full h-auto p-10 my-20">
          <div className="w-full h-full flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-[30px] font-semibold my-2">You Might Also Like</h1>

              <div className="hidden  items-center">
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
            <Slider {...trending2} ref={setSliderRef}>
              {staleData?.map((item: any, index: any) => (
                <LatestShoeCard item={item} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------Mobile COntent------------------------------------------ */}

      <div className="w-full h-full lg:hidden flex">
        {/* Content */}
        <div className="w-full h-full flex flex-col p-3 ">
          {/* 1st Box Shoe Name*/}
          <div className="w-full h-auto flex flex-col mt-2 mb-10">
            <h1 className="text-[20px] font-semibold mb-1">{singleItem?.name}</h1>

            {/* Shoe Type */}
            {singleItem?.type && (
              <h1 className="text-[15px] font-medium">
                {singleItem?.type.slice(0, 1).toUpperCase() + singleItem.type.slice(1, singleItem.type.length)}
              </h1>
            )}

            {/* Price */}
            <h1 className="mt-4 font-medium">${singleItem?.price}</h1>
          </div>

          {/* 2nd Box */}
          <div className="w-full h-full mb-10 ">
            <Slider {...settings3} className="  ">
              <LazyLoadImage
                src={singleItem?.img}
                alt=""
                className="object-cover border border-gray-300 p-1  "
                placeholderSrc="https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg"
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image1}
                alt=""
                className="object-cover border border-gray-300 p-1  "
                placeholderSrc="https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg"
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image2}
                alt=""
                className="object-cover border border-gray-300 p-1   "
                placeholderSrc="https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg"
                effect="blur"
              />
              <LazyLoadImage
                src={singleItem?.image3}
                alt=""
                className="object-cover border border-gray-300 p-1   "
                placeholderSrc="https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg"
                effect="blur"
              />
            </Slider>
          </div>

          {/* 3rd Box Shoe Sizes */}
          <div className="w-full flex flex-col h-auto  mt-10 pb-10">
            <div className="w-full flex items-center justify-between mb-3">
              <h1 className="font-medium text-[15px]">Select Size</h1>
              <h1 className="font-semibold text-[15px] text-gray-400">Size Guide</h1>
            </div>

            <div className="grid w-full h-full grid-cols-2 gap-2">
              {sizeData.map((item: any, index: any) => (
                <button
                  key={index}
                  className={` ${item.size === shoeSize ? "border border-black p-3 font-bold" : "border border-gray-300 p-3"} ${
                    addToCartError ? "border border-red-500" : ""
                  }`}
                  onClick={() => {
                    setAddToCartError(false);
                    setShoeSize(item.size);
                  }}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>
          {/* Error State */}
          {addToCartError && (
            <div className="w-full h-auto flex justify-end">
              <h1 className=" font-bold text-red-500">Please Select a Size</h1>
            </div>
          )}

          {/* Interest */}
          <div className="w-full flex items-center flex-col mt-10 mb-3">
            <h1 className="font-semibold text-[15px]">4 interest-free payments of $50.00 with</h1>
            <div className="flex items-center">
              <h1 className="font-bold">Klarna.</h1>
              <h1 className=" cursor-pointer underline font-semibold">Learn More</h1>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center w-full">
            <button
              className="bg-black text-white p-4 w-full rounded-3xl hover:bg-gray-300 hover:text-black my-1 hover:border hover:border-gray-400"
              onClick={() => {
                if (shoeSize) {
                  if (singleItem) {
                    dispatch(
                      addToCart({
                        id: singleItem.id,
                        gender: singleItem.gender,
                        img: singleItem.img,
                        name: singleItem.name,
                        type: singleItem.type,
                        count: 1,
                        size: shoeSize,
                        price: Number(singleItem.price),
                        uuid: small_id,
                      })
                    );
                    setShoeSize("");
                  }
                } else {
                  setAddToCartError(true);
                }
              }}
            >
              Add to Bag
            </button>
            {User ? (
              shoeFind?.name === name ? (
                loading ? (
                  <CircularProgress />
                ) : (
                  <button
                    className="bg-white text-black border border-gray-400 p-4 w-full rounded-3xl  hover:bg-gray-300 my-1 hover:border  "
                    onClick={() => dispatch(likeShoe({ shoeData: singleItem }))}
                  >
                    Favorite <FavoriteIcon className="text-sm text-red-500" />
                  </button>
                )
              ) : loading ? (
                <CircularProgress />
              ) : (
                <button
                  className="bg-white text-black border border-gray-400 p-4 w-full rounded-3xl  hover:bg-gray-300 my-1 hover:border  "
                  onClick={() => dispatch(likeShoe({ shoeData: singleItem }))}
                >
                  Favorite <FavoriteBorderIcon className="text-sm" />
                </button>
              )
            ) : (
              <Tooltip title="If you login you will be able to save shoes to your favorites">
                <button className="bg-white text-black border border-gray-400 p-4 w-full rounded-3xl  hover:bg-gray-300 my-1 hover:border  ">
                  Favorite <FavoriteBorderIcon className="text-sm" />
                </button>
              </Tooltip>
            )}
          </div>

          {/* Shipping */}
          <div className="w-full flex flex-col mt-10">
            <h1 className="font-medium mb-1">Shipping*</h1>
            <h1 className="font-medium mb-1">To get accurate shipping information</h1>
            <h1 className="font-bold underline cursor-pointer">Edit Location</h1>

            <h1 className="mt-8 font-medium">Free Pickup</h1>
            <h1 className="font-bold underline cursor-pointer">Find A Store</h1>

            <h1 className="text-gray-400 font-semibold text-[14px] my-4">*Faster Shipping options may be available</h1>
          </div>

          {/* Shoe Desc */}
          <p className="w-full mt-8 mb-6 font-medium leading-8 md:text-base text-[15px]">{singleItem?.desc}</p>

          {/* Shoe Materilas */}
          <div className="flex items-center mb-1 w-full">
            <FiberManualRecordIcon className="text-black text-base mr-2 " />
            <h1 className="md:text-base text-[15px]">Shown: Light Orewood Brown/Light British Tan/Palomino/Metallic Gold</h1>
          </div>
          <div className="flex items-center mb-1 w-full">
            <FiberManualRecordIcon className="text-black text-base mr-2 " />
            <h1 className="md:text-base text-[15px]">Style: CT8532-102</h1>
          </div>

          {/* View Product Details */}
          <h1 className="underline font-bold cursor-pointer my-10">View Product Details</h1>

          <hr className="border-gray-300 font-bold border-[1px] mb-4" />

          {/* Shipping and Returns */}
          <div className="w-full flex items-center justify-between my-3 ">
            <h1 className=" font-semibold md:text-[20px] cursor-pointer" onClick={() => setShipping((val) => !val)}>
              Shipping & Returns
            </h1>
            {shipping === true ? (
              <KeyboardArrowUpIcon onClick={() => setShipping((val) => !val)} className="cursor-pointer" />
            ) : (
              <KeyboardArrowDownIcon onClick={() => setShipping((val) => !val)} className="cursor-pointer" />
            )}
          </div>
          {shipping && (
            <div className="w-full flex flex-col mt-2">
              <p className="mt-2 mb-6">
                Free standard shipping on orders $50+ and free 60-day returns for Nike Members.{" "}
                <span className="font-bold underline cursor-pointer">Learn more. Return policy exclusions apply.</span>
              </p>
              <h1 className="font-bold underline cursor-pointer mb-4">Pick-up available at select Nike Stores.</h1>
            </div>
          )}

          <hr className="border-gray-300 font-bold border-[1px] my-4" />

          {/* Reviews */}
          <div className="w-full flex items-center justify-between my-3">
            <h1 className=" font-semibold md:text-[20px] cursor-pointer" onClick={() => setRev((val) => !val)}>
              Reviews (200)
            </h1>
            <div className="flex items-center">
              {Array.from(new Array(5)).map((item: any, index: any) => (
                <StarIcon key={index} className="md:text-base text-[16px]" />
              ))}
              {rev ? (
                <KeyboardArrowUpIcon className="cursor-pointer" onClick={() => setRev((val) => !val)} />
              ) : (
                <KeyboardArrowDownIcon className="cursor-pointer" onClick={() => setRev((val) => !val)} />
              )}
            </div>
          </div>

          {rev && (
            <div className="w-full flex flex-col mt-8 lg:pb-20">
              {/* Stars */}
              <div className="w-full flex items-center">
                {Array.from(new Array(5)).map((item: any, index: any) => (
                  <StarIcon key={index} />
                ))}
                <h1 className="ml-3 font-medium ">4.9 Stars</h1>
              </div>

              {/* Write A Review */}
              <h1 className="font-bold underline text-[18px mt-5 mb-10 cursor-pointer">Write a Review</h1>

              {/* Reviews */}
              {reviewData.map((item: any, index: any) => (
                <ReviewCard item={item} key={index} />
              ))}
            </div>
          )}

          <hr className="border-gray-300 font-bold border-[1px] my-4" />

          {/* Bottom Section */}
          <div className="w-full h-auto my-20">
            <div className="w-full h-full flex flex-col">
              {/* Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-[30px] font-semibold my-2">You Might Also Like</h1>

                <div className="md:flex hidden items-center">
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
              <Slider {...trending} ref={setSliderRef}>
                {staleData?.map((item: any, index: any) => (
                  <LatestShoeCard item={item} key={index} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Other Way to Accomplish image selector

//<div className="w-full h-full flex flex-col">
//<div className="w-full h-full flex items-center">
//<div className="flex flex-col w-full h-auto">
//<img
//src={singleItem?.img}
//alt=""
//className={`object-cover border-black border h-[100px] w-[100px] ${value === singleItem?.img && 'selectedImg'}`}
//onClick={(e)=>handleChange(e)}
///>
//<img
//src={singleItem?.image1}
//alt=""
//className={`object-cover border-black border h-[100px] w-[100px] ${value === singleItem?.image1 && 'selectedImg'}`}
//onClick={(e)=>handleChange(e)}
///>
//<img
//src={singleItem?.image2}
//alt=""
//className={`object-cover border-black border h-[100px] w-[100px] ${value === singleItem?.image2 && 'selectedImg'}`}
//onClick={(e)=>handleChange(e)}
///>
//<img
//src={singleItem?.image3}
//alt=""
//className={`object-cover border-black border h-[100px] w-[100px] ${value === singleItem?.image3 && 'selectedImg'}`}
//onClick={(e)=>handleChange(e)}
///>
//</div>

//<img src={value} alt="" />
//</div>
//</div>
