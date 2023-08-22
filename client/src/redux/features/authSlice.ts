import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_All_Orders, get_Liked_Shoes, like_Shoe, sign_In, sign_Up, stripe_Payment_Guest } from "../api/authApi";


interface User {
  id: number | string;
  [key: string]: any;
}

interface SelectedItemState {
  address: string;
  city: string;
  count: string;
  country: string;
  date: string;
  gender: string;
  img: string;
  name: string;
  order_id: number;
  price: string;
  size: string;
  state: string;
  type: string;
  who_ordered: string;
  who_ordered_name: string;
  zip_code: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
  likedShoes: Array<any>;
  orders: Array<any>;
  selectedItem: SelectedItemState | null
  openOrderModal:boolean
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  likedShoes: [],
  orders: [],
  selectedItem: null,
  openOrderModal: false
};

export const signUp = createAsyncThunk("signup", async ({ formData, navigate }: any, { rejectWithValue }) => {
  try {
    const res = await sign_Up(formData);
    navigate("/");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const signIn = createAsyncThunk("login", async ({ formData, navigate }: any, { rejectWithValue }) => {
  try {
    const res = await sign_In(formData);
    navigate("/");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const likeShoe = createAsyncThunk("likeShoe", async ({ shoeData }: any, { rejectWithValue }) => {
  try {
    const res = await like_Shoe(shoeData);
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const getLikedShoes = createAsyncThunk("getLike", async (_, { rejectWithValue }) => {
  try {
    const res = await get_Liked_Shoes();

    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const stripePaymentGuest = createAsyncThunk("stripe", async ({ date, cart, id }: any, { rejectWithValue }) => {
  try {
    const res = await stripe_Payment_Guest({ date, cart, id });
    window.location = res.data.url;
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const getAllOrders = createAsyncThunk("getOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await get_All_Orders();

    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("profile");
      state.user = null
      state.error = ""
      state.orders = []
      state.likedShoes = []
      state.selectedItem = null
      state.openOrderModal = false
    },
    setSelectedItem: (state) => {
      state.selectedItem = null
    },
    selectItem: (state, action) => {
      state.selectedItem = action.payload
    },
    handleOpenOrderModal: (state) => {
      state.openOrderModal = true
    },
    handleCloseOrderModal: (state) => {
      state.openOrderModal = false
    }
  },
  extraReducers(builder) {
    builder

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Like Shoe
      .addCase(likeShoe.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeShoe.fulfilled, (state, action) => {
        state.likedShoes = action.payload;
        state.loading = false;
      })
      .addCase(likeShoe.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Get Liked Shoes
      .addCase(getLikedShoes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedShoes.fulfilled, (state, action) => {
        state.likedShoes = action.payload;
        state.loading = false;
      })
      .addCase(getLikedShoes.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Stripe Payment
      .addCase(stripePaymentGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(stripePaymentGuest.fulfilled, (state, action) => {
        //state.likedShoes = action.payload
        state.loading = false;
      })
      .addCase(stripePaymentGuest.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload
        state.loading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
export const { setError, setUser, setLogout, setSelectedItem, selectItem, handleCloseOrderModal, handleOpenOrderModal} = authSlice.actions;
