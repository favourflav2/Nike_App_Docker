import * as React from "react";
import nike from "../../assets/nike.png";
import {
  TextField,
  InputAdornment,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch, UseSelector } from "../../redux/store";
import { setError, signUp } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ISignUpProps {}

export default function SignUp(props: ISignUpProps) {
  const [inputState, setInputState] = React.useState({
    firstName: "",
    lastName: "",
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
    firstName: false,
    lastName: false,
    password: false,
    email: false,
    privacy: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const { error, loading } = UseSelector((state) => state.auth);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setError());

    if (inputState.firstName.length >= 1 && inputState.lastName.length >= 1 && inputState.email.length >= 1 && inputState.password.length >= 1) {
      if (!errorState.firstName && !errorState.lastName && !errorState.email && !errorState.password && !errorState.privacy) {
        if (checked) {
          dispatch(signUp({ formData: inputState, navigate }));
        } else {
          setErrorState((item) => {
            return {
              ...item,
              privacy: true,
            };
          });
        }
      } else {
        console.log("error state error");
        if (inputState.firstName.length === 0) {
          setErrorState((item) => {
            return {
              ...item,
              firstName: true,
            };
          });
        }
        if (inputState.lastName.length === 0) {
          setErrorState((item) => {
            return {
              ...item,
              lastName: true,
            };
          });
        }
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
        if (!checked) {
          setErrorState((item) => {
            return {
              ...item,
              privacy: true,
            };
          });
        }
      }
    } else {
      if (inputState.firstName.length === 0) {
        setErrorState((item) => {
          return {
            ...item,
            firstName: true,
          };
        });
      }
      if (inputState.lastName.length === 0) {
        setErrorState((item) => {
          return {
            ...item,
            lastName: true,
          };
        });
      }
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
      if (!checked) {
        setErrorState((item) => {
          return {
            ...item,
            privacy: true,
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
    if (inputState.firstName.length) {
      setErrorState((item) => {
        return {
          ...item,
          firstName: false,
        };
      });
    }
    if (inputState.lastName.length) {
      setErrorState((item) => {
        return {
          ...item,
          lastName: false,
        };
      });
    }
  }, [inputState.email, inputState.firstName, inputState.lastName]);
  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setInputState((item) => {
        return {
          ...item,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        };
      });
      setChecked(false);
    }
  }, [error]);
  React.useEffect(() => {
    dispatch(setError());
  }, []); // eslint-disable-line

  return (
    <div className="w-full h-full md:h-screen p-5 flex  ">
      {/* Content */}
      <div className="w-full flex flex-col items-center justify-center">
        <form className="max-w-[470px] h-full md:pb-20  pb-5 flex flex-col justify-center" onSubmit={(e) => handleSubmit(e)}>
          {/* Images */}
          <div className="w-full h-auto">
            <img src={nike} alt="" className="w-[60px]" onClick={()=>{
            navigate("/")
          }}/>
          </div>
          {/* Now Lets Make */}
          <h1 className="text-[25px] font-medium mb-1">Now Lets's make you a Nike Member.</h1>
          <h1 className="mb-8">
            Already Have An Account?{" "}
            <span className="font-semibold cursor-pointer underline hover:text-gray-600" onClick={() => dispatch(setError())}>
              <Link to="/login">Login</Link>
            </span>
          </h1>
          {/* First and Last Name */}
          <div className="my-3 w-full flex justify-between">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              sx={{
                fieldset: {
                  borderColor: `${errorState.firstName ? "red" : "rgb(107 114 128)"}`,
                },
              }}
              InputProps={{ sx: { borderRadius: 2 } }}
              className="w-full mr-2"
              autoComplete=""
              error={errorState.firstName}
              name="firstName"
              helperText={`${errorState.firstName ? "*Required" : ""}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                if (inputState.firstName.length < 1) {
                  console.log("no");
                  setErrorState((item) => {
                    return {
                      ...item,
                      firstName: true,
                    };
                  });
                }
              }}
              value={inputState.firstName}
              onFocus={() => {
                if (inputState.firstName.length < 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      firstName: true,
                    };
                  });
                }
              }}
              onBlur={() => {
                if (inputState.firstName.length > 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      firstName: false,
                    };
                  });
                } else if (inputState.firstName.length < 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      firstName: true,
                    };
                  });
                }
              }}
            />
            <TextField
              id="outlined-basic2"
              label="Last Name"
              name="lastName"
              InputProps={{ sx: { borderRadius: 2 } }}
              value={inputState.lastName}
              variant="outlined"
              helperText={`${errorState.lastName ? "*Required" : ""}`}
              sx={{ fieldset: { borderColor: "rgb(107 114 128)" } }}
              className="ml-2 w-full"
              error={errorState.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                if (inputState.lastName.length < 1) {
                  console.log("no");
                  setErrorState((item) => {
                    return {
                      ...item,
                      lastName: true,
                    };
                  });
                }
              }}
              onFocus={() => {
                if (inputState.lastName.length < 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      lastName: true,
                    };
                  });
                }
              }}
              onBlur={() => {
                if (inputState.lastName.length >= 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      lastName: false,
                    };
                  });
                } else if (inputState.lastName.length < 1) {
                  setErrorState((item) => {
                    return {
                      ...item,
                      lastName: true,
                    };
                  });
                }
              }}
            />
            {/* <input type="text" className='w-full outline-none border border-gray-500  rounded-md p-[14px] mr-2'/>
            <input type="text" className='w-full outline-none border border-gray-500  rounded-md p-[14px] ml-2'/> */}
          </div>

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
          {/* Checkboxkes */}
          <FormGroup className="w-full">
            <FormControlLabel
              className="mt-10 mb-5 w-full"
              control={<Checkbox />}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              label={
                <Typography className="text-[15px]">
                  Sign us for emails to get updates from Nike on products, offers and your Member benefits.
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setErrorState((item) => {
                      return {
                        ...item,
                        privacy: false,
                      };
                    });
                    handleChangeCheckBox(e);
                  }}
                  checked={checked}
                />
              }
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              label={
                <Typography className={`text-[15px] ${errorState.privacy ? "text-red-500" : "text-black"}`}>
                  I agree to Nike's <span className="font-medium underline cursor-pointer">Privacy Policy</span> and{" "}
                  <span className="font-medium underline cursor-pointer">Terms of Use.</span>
                </Typography>
              }
            />
          </FormGroup>

          { loading &&
          <h1 className="mt-5 text-xs font-bold leading-5 text-red-400">
            My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15
            minutes of inactivity. So, this will cause a delay in the response of the first request after signing up or logging in. This first request
            to my backend may take a minute or so.
          </h1>
        }

          {/* Buttons */}
          <div className="w-full justify-end flex mt-10">
            <button disabled={loading} className="p-3 bg-black text-white hover:bg-gray-700 cursor-pointer rounded-full font-semibold">
              {loading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
