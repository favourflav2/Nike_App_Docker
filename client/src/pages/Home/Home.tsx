import * as React from "react";
import FirstBox from "./Content/FirstBox";
import SecondBox from "./Content/SecondBox";
import ThirdBox from "./Content/ThirdBox";
import Trending from "./Content/Trending";
import Featured from "./Content/Featured";
import ShopSport from "./Content/ShopSport";
import LatestShoes from "./Content/LatestShoes";
import Membership from "./Content/Membership";
import FirstAccess from "./Content/FirstAccess";
import { Dispatch } from "../../redux/store";
import { setHandleShopByPrice } from "../../redux/features/categorySlice";

export interface IHomeProps {}

function Home(props: IHomeProps) {
  const dispatch = Dispatch()

  React.useEffect(()=>{
    dispatch(setHandleShopByPrice())
  },[])// eslint-disable-line
  return (
    <div className="w-full h-full flex flex-col">
      {/* Content */}

      <FirstBox />

      <SecondBox />

      <ThirdBox />

      <Trending />

      <Featured />

      <ShopSport />

      <LatestShoes />

      <Membership />

      <FirstAccess />
    </div>
  );
}

export default React.memo(Home);
