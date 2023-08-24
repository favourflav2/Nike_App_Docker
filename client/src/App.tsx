import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Home from './pages/Home/Home';
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "./redux/features/authSlice";
import { Dispatch } from "./redux/store";
import PrivateRoute from "./components/redirects/PrivateRoute";
//import SuccessPage from "./pages/Stripe/Success";
//import ErrorPage from "./pages/Stripe/Error";
//import ProfilePage from "./pages/Profile/ProfilePage";
//import Login from "./pages/Auth/Login";
//import SignUp from "./pages/Auth/SignUp";
//import Cart from "./pages/Cart/Cart";
//import FilterPage from "./pages/FilterPage/FilterPage";
// import ItemDetails from "./pages/ItemDetails/ItemDetails";

const Home = lazy(() => import("./pages/Home/Home"));
const ItemDetails = lazy(() => import("./pages/ItemDetails/ItemDetails"));
const FilterPage = lazy(() => import("./pages/FilterPage/FilterPage"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const SuccessPage = lazy(() => import("./pages/Stripe/Success"));
const ErrorPage = lazy(() => import("./pages/Stripe/Error"));

function App() {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = Dispatch();

  React.useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />

          {/* Item Details Page */}
          <Route
            path="itemDetails/:name/:id"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <ItemDetails />
              </Suspense>
            }
          />

          {/* Categories Page */}
          <Route
            path="category/:gender/:item"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <FilterPage />
              </Suspense>
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Cart />
              </Suspense>
            }
          />

          {/* Sign Up */}
          <Route
            path="/signup"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <SignUp />
              </Suspense>
            }
          />

          {/* Log In */}
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Login />
              </Suspense>
            }
          />

          {/* Profile Page */}
          <Route
            path="/profile/:location"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              </Suspense>
            }
          />

          {/* Success Page Stripe Payment */}
          <Route
            path="/success"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <SuccessPage />
              </Suspense>
            }
          />

          {/* Error Page Stripe Payment */}
          <Route
            path="/error"
            element={
              <Suspense
                fallback={
                  <div className="sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[480px] bg-white sm:min-h-[500px] h-full">
                    <div>Loading...</div>
                  </div>
                }
              >
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

//lg:pr-[25px] lg:pb-[64px] lg:pl-[25px] pr-[10px] pl-[10px] pb-[20px]
