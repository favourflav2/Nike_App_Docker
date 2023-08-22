import * as React from "react";
import { Tab, Tabs, useMediaQuery, IconButton, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import dayjs from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getAllOrders, getLikedShoes, setError } from "../../redux/features/authSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { toast } from "react-toastify";
import TrendingCard from "../../components/cards/TrendingCard";
import { staleData } from "../ItemDetails/detailsData/detailsData";
import { setTabValue } from "../../redux/features/cartSlice";
import OrdersCard from "../../components/cards/OrdersCard";
import OrderModal from "../../components/modal/OrderModal";

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
  const { location } = useParams();
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { user, likedShoes, orders, loading, error } = UseSelector((state) => state.auth);
  const { tabValue } = UseSelector((state) => state.cart);
  const User = user?.user;
  //const [tabValue, setTabValue] = React.useState(location);
  const reverseArr = staleData.slice();
  const dev = likedShoes?.slice();
  const [look, setLook] = React.useState([]);

  //const { data, isFetching, error, refetch } = useGetAllOrdersQuery();

  React.useEffect(() => {
    // @ts-ignore
    function getDifference(array1, array2) {
      // @ts-ignore
      return array1.filter((object1) => {
        // @ts-ignore
        return !array2.some((object2) => {
          // @ts-ignore
          return object1.name === object2.name;
        });
      });
    }
    if (look.length === 0) {
      setLook(getDifference(reverseArr, dev));
    }
  }, [likedShoes, dev, look.length, reverseArr]);

  React.useEffect(() => {
    if (!tabValue) {
      dispatch(setTabValue(location));
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    dispatch(setError());
  }, []); // eslint-disable-line
  React.useEffect(() => {
    dispatch(getAllOrders());
  }, []); // eslint-disable-line

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setTabValue(newValue));
    navigate(`/profile/${newValue}`);
  };

  // Similar / Trending Stuff
  const md = useMediaQuery("(min-width:900px)");
  const lg = useMediaQuery("(min-width:1300px)");

  const trending2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  React.useEffect(() => {
    if (likedShoes.length === 0) {
      dispatch(getLikedShoes());
    }
  }, []); // eslint-disable-line

  

  return (
    <div className="w-full h-full md:px-10 px-3 py-5">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Tabs */}
        <div className="flex  items-center justify-center mb-20">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: "black", color: "black" } }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="Profile" value="profile" className="md:text-base text-[12px]" />
            <Tab label="Inbox" value="inbox" className="md:text-base text-[12px]" />
            <Tab label="Orders" value="orders" className="md:text-base text-[12px]" />
            <Tab label="Favorites" value="favorites" className="md:text-base text-[12px]" />
            <Tab label="Settings" value="settings" className="md:text-base text-[12px]" />
          </Tabs>
        </div>

        {tabValue === "profile" && (
          <div className="w-full h-auto flex flex-col mt-5">
            {/* Welcome User */}
            <div className="w-full h-auto flex flex-col ">
              <h1 className="text-[25px] font-medium">
                Welcome, {User?.first_name.slice(0, 1).toUpperCase() + User?.first_name.slice(1, User?.first_name.length)}{" "}
                {User?.last_name.slice(0, 1).toUpperCase() + User?.last_name.slice(1, User?.last_name.length)}
              </h1>
              <h1 className="text-gray-400 font-medium ">Nike Member Since {dayjs(User?.joined).format("MM/DD/YYYY")}</h1>
            </div>

            {/* Interets */}
            <h1 className="text-[21px] font-semibold mt-10 mb-1">Interests</h1>
            <hr className="border-gray-400 mb-4" />

            {/* Add Interests */}
            <div className="w-full h-auto flex flex-col">
              <h1>Add your interests to shop a collection of products that are based on what you're into.</h1>

              {/* Grid Items */}
              <div className="w-full h-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 my-8">
                <div className="flex flex-col items-center justify-center bg-gray-200 h-[250px]">
                  <AddCircleOutlineIcon className="text-[35px] mb-2" />
                  <h1 className="md:text-[20px] text-sm font-semibold">Add Interests</h1>
                </div>
              </div>
            </div>
            
            <div className="w-full h-auto  my-20">
            <div className="w-full h-full flex flex-col">
              {/* Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-[25px] font-semibold my-2">Favorites</h1>
              </div>

              <div className="w-full h-auto justify-end flex">
                <IconButton onClick={sliderRef?.slickPrev} className=" mr-2">
                  <ArrowBackIosIcon />
                </IconButton>

                {/* Forward Button */}

                <IconButton onClick={sliderRef?.slickNext} className=" ">
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>

              {/* Slider */}
              <Slider {...trending2} ref={setSliderRef}>
                {likedShoes?.map((item: any, index: any) => (
                  <TrendingCard item={item} key={index} />
                ))}
              </Slider>
            </div>
          </div>

          </div>
        )}

        {tabValue === "inbox" && (
          <div className="w-full h-auto flex items-center justify-center flex-col pb-[400px] pt-[100px]">
            <h1 className="text-[20px] font-medium">No Messgaes</h1>
            <h1>Messages and notifications from Nike will show up here.</h1>
          </div>
        )}

        

        {tabValue === "favorites" && (
          <div className="w-full flex flex-col h-auto">
            <h1 className="text-[25px] font-semibold mb-10">Favorites</h1>

            {loading ? 
            (
              <div className="w-full h-auto grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 pb-[100px]">
                  {Array.from(Array(5).keys())?.map((item: any, index: any) => (
                    <Skeleton  variant="rectangular" key={index} className="h-[300px]"/>
                  ))}
                </div>
            )
            :
            (
              likedShoes?.length <= 0 ? (
                <div className="w-full h-auto flex">
                  <h1 className="font-bold">You Currently Dont Have Any Favorite Shoes</h1>
                </div>
              ) : (
                <div className="w-full h-auto grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 pb-[100px]">
                  {likedShoes?.map((item: any, index: any) => (
                    <TrendingCard item={item} key={index} />
                  ))}
                </div>
              )
            )
            }

            <div className="w-full h-auto  my-20">
              <div className="w-full h-full flex flex-col">
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h1 className="text-[25px] font-semibold my-2">You Might Also Like</h1>
                </div>

                <div className="w-full h-auto justify-end flex">
                  <IconButton onClick={sliderRef?.slickPrev} className=" mr-2">
                    <ArrowBackIosIcon />
                  </IconButton>

                  {/* Forward Button */}

                  <IconButton onClick={sliderRef?.slickNext} className=" ">
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>

                {/* Slider */}
                <Slider {...trending2} ref={setSliderRef}>
                  {look?.map((item: any, index: any) => (
                    <TrendingCard item={item} key={index} />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}

        {tabValue === "orders" && (
          <div className="w-full h-auto flex flex-col justify-center items-center">
            {loading ? 
            (
              <div className="2xl:w-[55%] xl:w-[60%] lg:w-[75%] md:w-[85%] sm:w-[95%] w-full h-auto flex flex-col ">
                  <Skeleton variant="rectangular" className="w-full h-[200px] my-2"/>
                  <Skeleton variant="rectangular"  className="w-full h-[200px] my-2"/>
              </div>
            )
            :
            (
              orders?.length <= 0 ? 
            (
              <div className="w-full h-[500px] flex flex-col">
                <h1 className="md:text-[30px] text-[20px] font-bold mb-8">Orders</h1>
                <h1 className="font-bold">You Haven't Ordered Any Shoes</h1>
              </div>
            )
            :
            (
              <div className="2xl:w-[55%] xl:w-[60%] lg:w-[75%] md:w-[85%] sm:w-[95%] w-full h-auto flex flex-col">
              {loading ? <Skeleton height={200} /> : orders?.map((item: any, index: any) => <OrdersCard item={item} key={index} />)}
            </div>
            )
            )
            }
          </div>
        )}
      </div>

      <OrderModal />
    </div>
  );
}
