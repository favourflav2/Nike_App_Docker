import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Menu,
  MenuItem,
  Typography,
  RadioGroup,
  Radio,
  Modal,
  FormControl,
} from "@mui/material";
import { Dispatch, UseSelector } from "../../redux/store";
import {
  handleGender,
  handleShopByPrice,
  handleSortBy,
  setMenGender,
  setHandleShopByPrice,
  setWomenGender,
} from "../../redux/features/categorySlice";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CategoryCard from "../../components/cards/CategoryCard";
import CancelIcon from "@mui/icons-material/Cancel";

export interface IFilterPageProps {}

export default function FilterPage(props: IFilterPageProps) {
  const { gender, item } = useParams();
  const upperCaseGender =
    gender && gender.slice(0, 1).toUpperCase() + gender.slice(1, gender.length);
  const upperCaseItem =
    item && item.slice(0, 1).toUpperCase() + item.slice(1, item.length);
  const {
    Women,
    Men,
    priceFilter,
    sortByRedux,
    staleData: dataRedux,
  } = UseSelector((state) => state.categoryState);
  const dispatch = Dispatch();
  const navigate = useNavigate();

  // Refs for styling on scroll
  const ref = React.useRef<any>();
  const sideBar = React.useRef<any>();
  const pathName = React.useRef<any>();
  const genderPathName = React.useRef<any>();

  // All States Arrows Up and Down for Sidebar
  const [sales, setSales] = React.useState(false);
  const [genderState, setGenderState] = React.useState(false);
  const [shopBy, setShopBy] = React.useState(false);
  const [prodDiscount, setProductDiscount] = React.useState(false);
  const [shoeHeight, setShoeHeight] = React.useState(false);
  const [shoeType, setShoesType] = React.useState(false);
  const [shoeIcon, setShoeIcon] = React.useState(false);

  // Hide Show State
  const [hideFilter, setHideFilter] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(false);

  // Mui Menu For Sort By
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Making sticky header chnage height when scrolling
  React.useEffect(() => {
    const handler = () => {
      // Check and update component here.
      if (window.scrollY > 80) {
        //console.log("Now make sticky div smaller")
        ref?.current?.classList.add("shrink");
        pathName?.current?.classList.add("pathName");
        genderPathName?.current?.classList.add("genderPathName");
        if (!hideFilter) {
          sideBar?.current?.classList.add("sideBar");
        }
      } else {
        //console.log("we do nothing")
        ref?.current?.classList.remove("shrink");
        pathName?.current?.classList.remove("pathName");
        genderPathName?.current?.classList.remove("genderPathName");
        if (!hideFilter) {
          sideBar?.current?.classList.remove("sideBar");
        }
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [hideFilter]);

  // Radio Buttons Prices State
  function handleRadioBtn(event: React.ChangeEvent<HTMLInputElement>) {
    //setPriceRadioBtn((event.target as HTMLInputElement).value);
    dispatch(handleShopByPrice(event.target.value));
  }
  function handleMobileRadioBtn(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(handleSortBy(event.target.value));
  }

  // Modal State
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const data = dataRedux;

  const res =
    priceFilter === "price_25_50"
      ? data.filter(
          (item) => Number(item.price) >= 25 && Number(item.price) <= 50
        )
      : priceFilter === "price_50_100"
      ? data.filter(
          (item) => Number(item.price) >= 50 && Number(item.price) <= 100
        )
      : priceFilter === "price_100_150"
      ? data.filter(
          (item) => Number(item.price) >= 100 && Number(item.price) <= 150
        )
      : priceFilter === "price_150_plus"
      ? data.filter((item) => Number(item.price) >= 150)
      : data;

  const newRes = res;

  const match =
    Women && Men
      ? res
      : Men
      ? newRes.filter(
          (item) => item.gender === "men" || item.gender === "men&women"
        )
      : Women
      ? newRes.filter(
          (item) => item.gender === "women" || item.gender === "men&women"
        )
      : res;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [res, Women, Men]);

  React.useEffect(() => {
    if (gender) {
      if (gender === "men") {
       
        dispatch(setMenGender());
      }
      if (gender === "women") {
        dispatch(setWomenGender());
        
      }
    }
  }, []); // eslint-disable-line

  //console.log(gender)

  // console.log(sortByRedux)
  //console.log(dataRedux)

  return (
    <div className="w-full h-full flex">
      {/* Desktop Content */}
      <div className="w-full h-full lg:flex hidden flex-col">
        {/* Sticky Header */}
        <div
          className="w-full h-[90px] sticky top-0 z-10 transition-all ease-in-out delay-150 duration-300 bg-white"
          ref={ref}
        >
          <div className="w-full h-full flex flex-col justify-center md:pr-[25px] md:pb-[2px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px] ">
            {/* Path */}
            <h1
              className="font-medium transition-all ease-in-out delay-150 duration-300"
              ref={pathName}
            >
              {upperCaseGender} / {upperCaseItem}
            </h1>

            <div className="w-full flex items-center justify-between ">
              <h1
                className="text-[25px] font-semibold transition-all ease-in-out delay-150 duration-300"
                ref={genderPathName}
              >
                {Women && Men ? "" : Women ? "Women" : Men ? "Men" : ""}{" "}
                {upperCaseItem}
              </h1>

              <div className=" flex items-center">
                {/* Show Hide Filters */}
                <div
                  className="flex items-center mx-4"
                  onClick={() => setHideFilter((val) => !val)}
                >
                  <h1 className="cursor-pointer">
                    {hideFilter ? "Show Filters" : "Hide Filters"}
                  </h1>
                  <TuneIcon className=" cursor-pointer" />
                </div>

                {/* Sort By */}
                <div
                  className="flex items-center ml-2"
                  onClick={(e) => {
                    setSortBy((val) => !val);
                    handleClick(e);
                  }}
                >
                  <h1 className=" cursor-pointer">
                    Sort By
                    {sortByRedux && (
                      <span className="text-gray-400">:{sortByRedux}</span>
                    )}
                  </h1>
                  {sortBy ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>

                {/* Sort By Menu */}
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => {
                    setSortBy((val) => !val);
                    handleClose();
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setSortBy((val) => !val);
                      dispatch(handleSortBy("Price: High-Low"));
                      handleClose();
                    }}
                  >
                    Price: High-Low
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy((val) => !val);
                      dispatch(handleSortBy("Price: Low-High"));
                      handleClose();
                    }}
                  >
                    Price: Low-High
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Hidefilter is false Grid */}
        {hideFilter === false && (
          <div className="w-full h-auto  grid xl:grid-cols-[17%_83%] 2xl:grid-cols-[15%_85%] lg:grid-cols-[20%_80%]">
            {/* Left Side */}

            <div
              className={`w-full   max-h-[700px]  sticky top-0 overflow-y-auto overscroll-y-contain md:pr-[25px] md:pb-[2px] md:pl-[40px]`}
              ref={sideBar}
            >
              {/* Content */}
              <div className="w-full h-full flex flex-col">
                {/* 1st Box */}
                <div className="w-full h-auto flex flex-col mb-3">
                  <h1 className="mb-1 font-semibold cursor-pointer">
                    Air Force 1
                  </h1>
                  <h1 className="my-1 font-semibold cursor-pointer">Air Max</h1>
                  <h1 className="my-1 font-semibold cursor-pointer">
                    Nike Dunk
                  </h1>
                  <h1 className="my-1 font-semibold cursor-pointer">Blazer</h1>
                  <h1 className="my-1 font-semibold cursor-pointer">Jordan</h1>

                  <hr className="border-gray-300 mt-8" />
                </div>

                {/*  Sales & Offers */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Sale & Offers</h1>
                    {sales === false ? (
                      <KeyboardArrowUpIcon
                        data-name="sales"
                        onClick={() => setSales((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        data-name="sales"
                        onClick={() => setSales((val) => !val)}
                      />
                    )}
                  </div>

                  {!sales && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Up to 60% Off Select Styles"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Back to School"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Sale"
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/*  Gender */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Gender</h1>
                    {genderState === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setGenderState((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setGenderState((val) => !val)}
                      />
                    )}
                  </div>

                  {!genderState && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          checked={Men}
                          onChange={() => {
                            if (!Men) {
                              if (Women) {
                                navigate(`/category/men&women/${item}`);
                              } else {
                                navigate(`/category/men/${item}`);
                              }
                            }
                            if (Men) {
                              if (Women) {
                                navigate(`/category/women/${item}`);
                              } else {
                                navigate(`/category/All/${item}`);
                              }
                            }
                            dispatch(handleGender("Men"));
                          }}
                          control={<Checkbox />}
                          label={
                            <Typography className=" font-normal">
                              Men
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          checked={Women}
                          onChange={() => {
                            // navigate(`/category/women/${item}`)
                            if (!Women) {
                              if (Men) {
                                navigate(`/category/men&women/${item}`);
                              } else {
                                navigate(`/category/women/${item}`);
                              }
                            }
                            if (Women) {
                              if (Men) {
                                navigate(`/category/men/${item}`);
                              } else {
                                navigate(`/category/All/${item}`);
                              }
                            }
                            dispatch(handleGender("Women"));
                          }}
                          control={<Checkbox />}
                          label={
                            <Typography className=" font-normal">
                              Women
                            </Typography>
                          }
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/*  Shop By Price */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Shop By Price</h1>
                    {shopBy === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setShopBy((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setShopBy((val) => !val)}
                      />
                    )}
                  </div>

                  {!genderState && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <RadioGroup onChange={handleRadioBtn} value={priceFilter}>
                        <FormControlLabel
                          value="all"
                          control={<Radio />}
                          label={
                            <Typography className=" font-normal">
                              All
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="price_25_50"
                          control={<Radio />}
                          label={
                            <Typography className=" font-normal">
                              $25 - $50
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="price_50_100"
                          control={<Radio />}
                          label={
                            <Typography className=" font-normal">
                              $50 - $100
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="price_100_150"
                          control={<Radio />}
                          label={
                            <Typography className=" font-normal">
                              $100 - $150
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="price_150_plus"
                          control={<Radio />}
                          label={
                            <Typography className=" font-normal">
                              {" "}
                              Over $150
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/* Product Discounts */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Product Discounts</h1>
                    {prodDiscount === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setProductDiscount((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setProductDiscount((val) => !val)}
                      />
                    )}
                  </div>

                  {!prodDiscount && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="40% Off and Up"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="30% Off and Up"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="20% Off and Up"
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/* Shoe Height */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Shoe Height</h1>
                    {shoeHeight === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setShoeHeight((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setShoeHeight((val) => !val)}
                      />
                    )}
                  </div>

                  {!shoeHeight && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Low Top"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Mid Top"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="High Top"
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/* Shoe Type */}
                <div className="w-full h-auto flex flex-col">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Shoe Type</h1>
                    {shoeType === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setShoesType((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setShoesType((val) => !val)}
                      />
                    )}
                  </div>

                  {!shoeType && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Platforms"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Boots"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Slides"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Sandals"
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 my-3" />

                {/* Shoe Icon */}
                <div className="w-full h-auto flex flex-col pb-10">
                  <div className="w-full justify-between flex mb-2">
                    <h1 className="font-semibold">Shoe Icon</h1>
                    {shoeIcon === false ? (
                      <KeyboardArrowUpIcon
                        onClick={() => setShoeIcon((val) => !val)}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        onClick={() => setShoeIcon((val) => !val)}
                      />
                    )}
                  </div>

                  {!shoeIcon && (
                    <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300">
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Air Force 1"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Air Max"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Blazer"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Cortez"
                        />
                      </FormGroup>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full h-full md:pr-[25px] md:pb-[20px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px]">
              <div className="grid grid-cols-4 w-full h-auto gap-3">
                {match?.map((item: any, index: any) => (
                  <CategoryCard item={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {hideFilter && (
          <div className="w-full h-full  md:pr-[25px] md:pb-[20px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px] ">
            <div className="grid grid-cols-4 w-full h-auto gap-3">
              {match?.map((item: any, index: any) => (
                <CategoryCard item={item} key={index} />
              ))}
            </div>
          </div>
        )}

        {/* <div className="w-full h-full flex ">
            <div className="w-[20%] max-h-[900px]  sticky top-0 overflow-y-auto mb-10" ref={sideBar}>
            {arr.map((item:any,index:any)=>(
                    <div key={index} className="h-[50px] my-10">
                        Box
                    </div>
                ))}
                
            </div>

            <div className="bg-green-500 w-[80%] h-full ">
            <div className="grid grid-cols-2 w-full h-full gap-3 ">
                {arr.map((item:any,index:any)=>(
                    <div key={index} className="h-[200px]">
                        Box
                    </div>
                ))}
                </div>
            </div>
        </div> */}
      </div>

      {/* -------------------------------------------Mobile Content----------------------------------------- */}
      <div className="w-full flex flex-col lg:hidden h-full">
        {/* Sticky Header */}
        <div
          className="w-full h-[90px] sticky top-0 z-10 transition-all ease-in-out delay-150 duration-300 bg-white"
          ref={ref}
        >
          <div className="w-full h-full flex flex-col justify-center md:pr-[25px] md:pb-[2px] md:pl-[25px] pr-[20px] pl-[20px] pb-[20px] ">
            {/* Path */}
            <h1
              className="font-medium transition-all ease-in-out delay-150 duration-300"
              ref={pathName}
            >
              {upperCaseGender} / {upperCaseItem}
            </h1>

            <div className="w-full flex items-center  ">
              <h1
                className="text-[25px] font-semibold transition-all ease-in-out delay-150 duration-300"
                ref={genderPathName}
              >
                {Women && Men ? "" : Women ? "Women" : Men ? "Men" : ""}{" "}
                {upperCaseItem}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col h-full">
          {/* Shoe List First Box */}
          <div className="w-full h-auto flex pr-[20px] pl-[25px] ">
            <h1 className="mr-3 font-medium cursor-pointer hover:text-gray-400 text-[13px] mb:text-base">
              Air Force 1
            </h1>
            <h1 className="mx-3 font-medium cursor-pointer hover:text-gray-400 text-[13px] mb:text-base">
              Air Max
            </h1>
            <h1 className="mx-3 font-medium cursor-pointer hover:text-gray-400 text-[13px] mb:text-base">
              Nike Dunk
            </h1>
            <h1 className="mx-3 font-medium cursor-pointer hover:text-gray-400 text-[13px] mb:text-base">
              Blazer
            </h1>
            <h1 className="mx-3 font-medium cursor-pointer hover:text-gray-400 text-[13px] mb:text-base">
              Jordan
            </h1>
          </div>

          <hr className="border-gray-300 mt-3 mb-5" />

          {/* Results and Filter */}
          <div className="flex items-center justify-between pr-[20px] pl-[25px] mb-5">
            <h1 className=" font-medium  text-gray-400">
              {match?.length} Results
            </h1>
            <div
              className=" rounded-3xl flex items-center p-1 w-[100px] justify-center border border-gray-300 cursor-pointer hover:border-black"
              onClick={() => handleOpen()}
            >
              <h1>Filter</h1>
              <TuneIcon />
            </div>
          </div>

          {/* Data map */}
          <div className="w-full h-auto grid grid-cols-2 pb-20">
            {match?.map((item: any, index: any) => (
              <CategoryCard item={item} key={index} />
            ))}
          </div>

          {/* Modal */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <div className="w-full h-full bg-white overflow-y-auto">
              {/* Content */}
              <div className="w-full h-full flex flex-col relative p-8">
                <div
                  className=" absolute top-5 right-3 cursor-pointer"
                  onClick={() => handleCloseModal()}
                >
                  <CancelIcon className="text-[40px]" />
                </div>

                <h1 className="font-light my-10">Filter</h1>

                {/* Sort By Radio */}
                <h1 className="text-[17px] font-semibold mb-3">Sort By</h1>
                <FormControl className="mb-2">
                  <RadioGroup
                    value={sortByRedux}
                    onChange={handleMobileRadioBtn}
                  >
                    <FormControlLabel
                      value="Price: High-Low"
                      control={<Radio />}
                      label="Price: High-Low"
                    />
                    <FormControlLabel
                      value="Price: Low-High"
                      control={<Radio />}
                      label="Price: Low-High"
                    />
                  </RadioGroup>
                </FormControl>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Sales & Discounts */}
                <h1 className="text-[17px] font-semibold mb-3">
                  Sales & Offers
                </h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Up to 60% Off Select Styles"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Back to School"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Sale"
                    />
                  </FormGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Gender*/}
                <h1 className="text-[17px] font-semibold mb-3">
                  Gender
                </h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <FormGroup>
                    <FormControlLabel
                      checked={Men}
                      onChange={() => {
                        if (!Men) {
                          if (Women) {
                            navigate(`/category/men&women/${item}`);
                          } else {
                            navigate(`/category/men/${item}`);
                          }
                        }
                        if (Men) {
                          if (Women) {
                            navigate(`/category/women/${item}`);
                          } else {
                            navigate(`/category/All/${item}`);
                          }
                        }
                        dispatch(handleGender("Men"));
                      }}
                      control={<Checkbox />}
                      label={
                        <Typography className=" font-normal">Men</Typography>
                      }
                    />
                    <FormControlLabel
                      checked={Women}
                      onChange={() => {
                        // navigate(`/category/women/${item}`)
                        if (!Women) {
                          if (Men) {
                            navigate(`/category/men&women/${item}`);
                          } else {
                            navigate(`/category/women/${item}`);
                          }
                        }
                        if (Women) {
                          if (Men) {
                            navigate(`/category/men/${item}`);
                          } else {
                            navigate(`/category/All/${item}`);
                          }
                        }
                        dispatch(handleGender("Women"));
                      }}
                      control={<Checkbox />}
                      label={
                        <Typography className=" font-normal">Women</Typography>
                      }
                    />
                  </FormGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Sort By Price */}
                <h1 className="text-[17px] font-semibold mb-3">
                  Sort By Price
                </h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <RadioGroup onChange={handleRadioBtn} value={priceFilter}>
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label={
                        <Typography className=" font-normal">All</Typography>
                      }
                    />
                    <FormControlLabel
                      value="price_25_50"
                      control={<Radio />}
                      label={
                        <Typography className=" font-normal">
                          $25 - $50
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="price_50_100"
                      control={<Radio />}
                      label={
                        <Typography className=" font-normal">
                          $50 - $100
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="price_100_150"
                      control={<Radio />}
                      label={
                        <Typography className=" font-normal">
                          $100 - $150
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="price_150_plus"
                      control={<Radio />}
                      label={
                        <Typography className=" font-normal">
                          {" "}
                          Over $150
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Product Discounts */}
                <h1 className="text-[17px] font-semibold mb-3">
                  Product Discounts
                </h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="40% Off and Up"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="30% Off and Up"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="20% Off and Up"
                    />
                  </FormGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Shoe Height */}
                <h1 className="text-[17px] font-semibold mb-3">Shoe Height</h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Low Top"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Mid Top"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="High Top"
                    />
                  </FormGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Shoe Type */}
                <h1 className="text-[17px] font-semibold mb-3">Shoe Type</h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2">
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Air Force 1"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Air Max"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Blazer"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Cortez"
                    />
                  </FormGroup>
                </div>

                <hr className="border-gray-300 mt-3 mb-5" />

                {/* Shoe Icon */}
                <h1 className="text-[17px] font-semibold mb-3">Shoe Icon</h1>
                <div className="w-full h-auto flex flex-col transition-all ease-in-out delay-150 duration-300 mb-2 pb-10">
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Air Force 1"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Air Max"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Blazer"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Cortez"
                    />
                  </FormGroup>
                </div>
              </div>
              {/* Buttons At Bottom */}
              {priceFilter || sortByRedux ? (
                <div className="w-full bottom-0 h-[100px] fixed bg-white flex items-center px-4 border-t border-black">
                  <button
                    className="w-full h-[70px] bg-white rounded-3xl border border-gray-400 mr-1 hover:bg-gray-700 hover:text-white transition ease-in-out delay-150"
                    onClick={() => dispatch(setHandleShopByPrice())}
                  >
                    Clear
                  </button>
                  <button
                    className="w-full h-[70px] bg-black text-white rounded-3xl hover:bg-gray-400 hover:text-black transition ease-in-out delay-150"
                    onClick={handleCloseModal}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
