import * as React from "react";
import nike from "../../assets/nike.png";
import jordan from "../../assets/jordan.png";
import converse from "../../assets/converse.png";
import { Badge, Divider, Modal, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RerenderNav from "../re-renderNavbar/RerenderNav";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenDrawer from "../Drawers/MenDrawer";
import WomenDrawer from "../Drawers/WomenDrawer";
import KidDrawer from "../Drawers/KidDrawer";
import MobileDrawer from "../Drawers/MobileDrawer";
import SearchDrawer from "../Drawers/SearchDrawer";
import { useNavigate } from "react-router-dom";
import { staleData } from "../../pages/ItemDetails/detailsData/detailsData";
import SearchCard from "../cards/Searchcard";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch, UseSelector } from "../../redux/store";
import { useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { setLogout } from "../../redux/features/authSlice";
import jwt_decode from "jwt-decode";
import { setTabValue } from "../../redux/features/cartSlice";

export interface INavBarProps {}

function NavBar(props: INavBarProps) {
  const [inputVal, setInputVal] = React.useState("");
  const navigate = useNavigate();
  const { cart } = UseSelector((state) => state.cart);
  const dispatch = Dispatch();
  const { pathname } = useLocation();
  const { user } = UseSelector((state) => state.auth);
  const User = user?.user;

  if (user?.token) {
    const decoded: any = jwt_decode(user?.token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      console.log("jwt expired");
      dispatch(setLogout());
      navigate("/")
    }
  }

  // Logged in Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openLoggedMenu = Boolean(anchorEl);
  const handleClickOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Drawer State
  const [men, setMen] = React.useState(false);
  const [women, setWomen] = React.useState(false);
  const [kids, setKids] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);

  // Search Drawer State
  const [searchDrawer, setSearchDrawewr] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setInputVal(text);
    if (text) {
      setSearchDrawewr(true);
    }
  }

  // Modal for mobile users
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //const searchedData = inputVal ? data.filter((item:any) => item.name.toLowerCase().includes(inputVal.toLowerCase())) : null
  const searchedData = inputVal ? staleData.filter((item: any) => item.name.toLowerCase().includes(inputVal.toLowerCase())) : null;

  const totalItemCart = cart?.reduce((a, c) => {
    return a + c?.count;
  }, 0);

  if (pathname === "/signup" || pathname === "/login") {
    return null;
  }
  //console.log(totalItemCart)
  //console.log(user?.user)
  //console.log(searchedData)

  return (
    <div className=" h-[155px]  border-b ">
      {/* Search Drawer */}
      <SearchDrawer state={searchDrawer} change={setSearchDrawewr} searchState={inputVal} setSearchState={setInputVal} />

      {/* Desktop Contianer */}
      <div className="w-full h-full  lg:flex hidden flex-col ">
        {/* 1st Box Container */}
        <div className="flex w-full h-[25%] bg-gray-300/60 items-center justify-between px-10">
          {/* Left Side 1st Box */}
          <div className="flex">
            <img src={jordan} alt="jordan" className="h-[24px] w-[24px] mr-4" />
            <img src={converse} alt="" className="h-[24px] w-[24px]" />
          </div>

          {/* Right Side 1st Box */}
          <div className="flex items-center">
            <h6 className="mr-[8px] text-xs font-medium cursor-pointer hover:text-gray-500">Find a Store</h6>
            <Divider orientation="vertical" flexItem className="bg-black" />
            <h6 className="mx-[8px] text-xs font-medium cursor-pointer hover:text-gray-500">Help</h6>
            <Divider orientation="vertical" flexItem className="bg-black" />
            <h6 className="mx-[8px] text-xs font-medium cursor-pointer hover:text-gray-500">Join Us</h6>
            <Divider orientation="vertical" flexItem className="bg-black" />
            {user?.user?.id ? (
              <div className="flex items-center" onClick={handleClickOpenMenu}>
                <h1 className="mx-[8px] text-xs font-medium cursor-pointer hover:text-gray-500">
                  Hi, {User.first_name.slice(0, 1).toUpperCase() + User.first_name.slice(1, User.first_name.length)}
                </h1>
                <PersonIcon />
              </div>
            ) : (
              <h6 className="mx-[8px] text-xs font-medium cursor-pointer hover:text-gray-500" onClick={() => navigate("/signup")}>
                Sign In
              </h6>
            )}
          </div>
        </div>

        {/* Logged In Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openLoggedMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate(`/profile/profile`);
              dispatch(setTabValue('profile'))
            }}
            className="text-[16px]"
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate(`/profile/orders`);
              dispatch(setTabValue('orders'))
            }}
            className="text-[16px]"
          >
            Orders
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate(`/profile/favorites`);
              dispatch(setTabValue('favorites'))
            }}
            className="text-[16px]"
          >
            Favorites
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(setLogout());
              handleCloseMenu();
              navigate("/")
            }}
            className="text-[16px]"
          >
            Logout
          </MenuItem>
        </Menu>

        {/* 2nd Box Container */}
        <div className="flex justify-between items-center px-10 w-full h-[37.5%] relative">
          {/* Nike Image */}
          <div className="h-full w-[50%]">
            <img src={nike} alt="nike logo" className="h-full w-[60px] " onClick={() => navigate("/")} />
          </div>

          {/* Middle */}
          <div className="flex items-center justify-center px-5 h-full">
            <h2 className=" items-center justify-center font-medium cursor-pointer hover:underline" onMouseOver={() => setMen(true)}>
              Men
            </h2>
            <h2 className="mx-4 font-medium cursor-pointer hover:underline" onMouseOver={() => setWomen(true)}>
              Women
            </h2>
            <h2 className="font-medium cursor-pointer hover:underline" onMouseOver={() => setKids(true)}>
              Kids
            </h2>
          </div>

          {/* Drawers */}
          <MenDrawer state={men} change={setMen} />
          <WomenDrawer state={women} change={setWomen} />
          <KidDrawer state={kids} change={setKids} />

          {/* Right Side */}
          <div className="flex items-center w-[50%] justify-end">
            {/* Search Bar */}
            <div className="flex bg-gray-300 rounded-xl p-[6px] w-[160px] mx-2">
              <SearchIcon />
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                className=" bg-inherit w-full indent-1 outline-none"
                placeholder="Search"
                value={inputVal}
              />
            </div>

            <FavoriteBorderOutlinedIcon className="text-black mx-2" onClick={()=>{
              navigate(`/profile/favorites`);
              dispatch(setTabValue('favorites'))
            }}/>

            <Badge
              badgeContent={totalItemCart}
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
            >
              <ShoppingBagOutlinedIcon className="text-black cursor-pointer ml-2 hover:text-gray-500" onClick={() => navigate("/cart")} />
            </Badge>
          </div>
        </div>

        {/* 3rd Box Container */}
        <div className=" w-full h-[37.5%] items-center justify-center flex bg-gray-300/60">
          <RerenderNav />
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------- */}

      {/* Mobile Container  Padding so far is px-5*/}
      <div className="flex flex-col lg:hidden h-full w-full">
        {/* 1st Mobile Box */}
        <div className="h-[45%] w-full  px-5 flex justify-between items-center">
          {/* Nike Logo */}
          <div className="h-full w-full" onClick={() => navigate("/")}>
            <img src={nike} alt="nike logo" className="h-full w-[70px] " />
          </div>

          {/* Right Side */}
          <div className="flex items-center">
            <SearchIcon sx={{ fontSize: "24px" }} onClick={() => handleOpen()} className="mr-4" />

            <Badge
              badgeContent={totalItemCart}
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
            >
              <ShoppingBagOutlinedIcon className=" cursor-pointer hover:text-gray-600" sx={{ fontSize: "24px" }} onClick={() => navigate("/cart")} />
            </Badge>

            <MenuOutlinedIcon sx={{ fontSize: "27px" }} onClick={() => setMobile(true)} className="ml-4" />
          </div>
        </div>

        {/* Mobile Drawer */}
        <MobileDrawer state={mobile} change={setMobile} />

        {/* 2nd Mobile Box */}
        <div className="h-[55%] w-full  items-center justify-center flex flex-col bg-gray-300/60">
          <h1 className="font-bold">Shop All New Arrivals</h1>
          <h1 className="lg:text-sm text-xs underline">Shop Now</h1>
        </div>

        {/* Mobile Modal */}
        <Modal onClose={handleClose} open={open}>
          <div className="w-full h-full bg-white flex flex-col p-10 overflow-y-auto relative">
            <div className=" absolute top-2 right-5">
              <ClearIcon
                className="text-[35px]"
                onClick={() => {
                  handleClose();
                  setInputVal("");
                }}
              />
            </div>
            {/* Search Bar */}
            <div className="flex items-center bg-gray-200 rounded-2xl lg:w-[55%] xl:w-[45%] 2xl:w-[45%] h-[40px] hover:bg-gray-100 mt-5">
              <SearchIcon className="mx-2" />
              <input
                type="text"
                placeholder="Search"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
                className=" outline-none bg-inherit indent-1 w-full rounded-2xl "
              />
            </div>

            {/* Mapped Data */}
            <div className="w-full h-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 mt-5">
              {searchedData?.map((item: any, index: any) => (
                <SearchCard item={item} key={index} change={setOpen} setState={setInputVal} />
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default React.memo(NavBar);
