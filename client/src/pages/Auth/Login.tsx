import * as React from "react";
import nike from "../../assets/nike.png";
import { TextField, InputAdornment, FormControl, IconButton, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { setError, signIn } from "../../redux/features/authSlice";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [inputState, setInputState] = React.useState({
    password: "",
    email: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputState((item) => {
      return {
        ...item,
        [event.target.name]: event.target.value,
      };
    });
  }
  const [errorState, setErrorState] = React.useState({
    password: false,
    email: false,
    privacy: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const { error, loading } = UseSelector((state) => state.auth);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setError());

    if (inputState.email.length >= 1 && inputState.password.length >= 1) {
      if (!errorState.email && !errorState.password && !errorState.privacy) {
        dispatch(signIn({ formData: inputState, navigate }));
      } else {
        console.log("error state error");
        if (inputState.email.length === 0) {
          setErrorState((item) => {
            return {
              ...item,
              email: true,
            };
          });
        }
        if (errorState.password || inputState.password.length === 0) {
          setErrorState((item) => {
            return {
              ...item,
              password: true,
            };
          });
        }
      }
    } else {
      if (inputState.email.length === 0) {
        setErrorState((item) => {
          return {
            ...item,
            email: true,
          };
        });
      }
      if (errorState.password || inputState.password.length === 0) {
        setErrorState((item) => {
          return {
            ...item,
            password: true,
          };
        });
      }
    }
  }

  React.useEffect(() => {
    if (inputState.password.length >= 8 && inputState.password.match(/[A-Z]/g) && inputState.password.match(/[0-9]/g)) {
      setErrorState((item) => {
        return {
          ...item,
          password: false,
        };
      });
    }
  }, [inputState.password]);
  React.useEffect(() => {
    if (inputState.email.length) {
      setErrorState((item) => {
        return {
          ...item,
          email: false,
        };
      });
    }
  }, [inputState.email]);
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    dispatch(setError());
  }, []); // eslint-disable-line

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Content */}
      <form
        className="2xl:w-[40%] xl:w-[50%] lg:w-[60%] sm:w-[70%] w-[95%] h-full md:pb-20 pb-10 flex flex-col justify-center md:pt-0 pt-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Images */}
        <div className="w-full h-auto">
          <img src={nike} alt="" className="w-[60px]" />
        </div>
        {/* Now Lets Make */}
        <h1 className="text-[25px] font-medium mb-1">Sign In</h1>
        <h1 className="mb-5">
          Dont't Already Have An Account?{" "}
          <span className="font-semibold cursor-pointer underline hover:text-gray-600" onClick={() => dispatch(setError())}>
            <Link to="/signup">Sign Up</Link>
          </span>
        </h1>

        {/* Email */}
        <>
          <TextField
            id="outlined-basic3"
            label="Email"
            variant="outlined"
            sx={{
              fieldset: {
                borderColor: `${errorState.email ? "red" : "rgb(107 114 128)"}`,
              },
            }}
            InputProps={{ sx: { borderRadius: 2 } }}
            className="w-full my-3"
            autoComplete=""
            error={errorState.email}
            name="email"
            type="email"
            helperText={`${errorState.email ? "*Required" : ""}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (inputState.email.length < 1) {
                console.log("no");
                setErrorState((item) => {
                  return {
                    ...item,
                    email: true,
                  };
                });
              }
              handleChange(e);
            }}
            value={inputState.email}
            onFocus={() => {
              if (inputState.email.length < 1) {
                setErrorState((item) => {
                  return {
                    ...item,
                    email: true,
                  };
                });
              }
            }}
            onBlur={() => {
              if (inputState.email.length > 1) {
                setErrorState((item) => {
                  return {
                    ...item,
                    email: false,
                  };
                });
              } else if (inputState.email.length < 1) {
                setErrorState((item) => {
                  return {
                    ...item,
                    email: true,
                  };
                });
              }
            }}
          />
        </>
        {/* Password */}
        <div className="w-full h-auto flex flex-col my-3">
          <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(107 114 128)",
                },
              }}
              value={inputState.password}
              error={errorState.password}
              name="password"
              className="rounded-lg  "
              onChange={handleChange}
              onFocus={() => {
                if (inputState.password.length < 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      password: true,
                    };
                  });
                }
              }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              autoComplete=""
            />
          </FormControl>

          {/* Minimum of 8 characters */}
          <div className={`w-full flex items-center my-1 ${inputState.password.length >= 8 ? "text-green-500" : "text-red-500"}`}>
            <ClearIcon className="text-xs mr-[1px]" />
            <h1 className="text-xs">Minimum of 8 characters</h1>
          </div>

          {/* Uppercase, lowercase letters, and one number */}
          <div
            className={`w-full flex items-center my-1 ${
              inputState.password.length >= 8 && inputState.password.match(/[A-Z]/g) && inputState.password.match(/[0-9]/g)
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            <ClearIcon className="text-xs mr-[1px]" />
            <h1 className="text-xs">Uppercase, lowercase letters, and one number</h1>
          </div>
        </div>

        { loading &&
          <h1 className="mt-5 text-xs font-bold leading-5 ">
            My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
            minutes of inactivity. So, this will cause a delay in the response of the first request after signing up or logging in. This first request
            to my backend may take a minute or so.
          </h1>
        }

        {/* Buttons */}
        <div className="w-full justify-end flex mt-10">
          <button disabled={loading} className="p-3 bg-black text-white hover:bg-gray-700 cursor-pointer rounded-full font-semibold">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
