import { createSlice } from "@reduxjs/toolkit";
import { staleData } from "../../pages/ItemDetails/detailsData/detailsData";

  export interface StaleData {
    name:string,
    id:number,
    type: string,
    price:string,
    gender:string,
    desc: string,
    img: string,
    image1:string,
    image2:string,
    image3:string
  }

interface CheckBoxState {
    Men:boolean,
    Women:boolean,
    priceFilter:null | string
    staleData: Array<StaleData>
    loading:boolean
    sortByRedux:string
}

const initialState: CheckBoxState = {
    Men: false,
    Women: false,
    priceFilter:"",
    staleData: staleData,
    loading:false,
    sortByRedux:"",
    
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {
        handleGender: (state,action) => {
            if(action.payload === "Men"){
                state.Men = !state.Men
            }else if (action.payload === "Women"){
                state.Women = !state.Women
            }
        },
        handleShopByPrice: (state,action) => {
            state.priceFilter = action.payload
        },
        setHandleShopByPrice: (state) => {
            state.priceFilter = ""
            state.sortByRedux = ""
            state.staleData = staleData
            state.Men = false
            state.Women = false
        },
        handleSortBy: (state,action) => {
          state.sortByRedux = action.payload
          if(action.payload === 'Price: High-Low'){
            state.staleData = state.staleData.sort((a,b) => Number(b.price) - Number(a.price))
       
          }else{
            state.staleData = state.staleData.sort((a,b) => Number(a.price) - Number(b.price))
        
          }
          
        },
        setMenGender: (state) => {
          state.Men = true
        },
        setWomenGender: (state) => {
          state.Women = true
        }
    }
})

export default categorySlice.reducer

export const {handleGender, handleShopByPrice, setHandleShopByPrice,handleSortBy,setMenGender, setWomenGender} = categorySlice.actions