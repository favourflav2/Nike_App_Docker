import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const devEnv = process.env.NODE_ENV !== "production"

const API = axios.create({baseURL:`${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API }`})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") || '{}').token}`
    }
    return req
})

export function sign_Up(data:any){
    return API.post("/auth/signup",data)
}

export function sign_In(data:any){
    return API.post("/auth/signin",data)
}

export function like_Shoe(data:any){
    return API.post("/auth/likeShoe",data)
}

export function get_Liked_Shoes(){
    return API.get("/auth/getLikedShoes")
}

export function stripe_Payment_Guest(data:any){
    return API.post("/auth/checkoutGuest",data)
}

export function save_Order_To_Db(data:any){
    return API.post("/webhook",data)
}

export function get_All_Orders(){
    return API.get("/auth/allOrders")
}

export const cachedApiCalls = createApi({
    reducerPath:"cachedApiCalls",
    baseQuery: fetchBaseQuery({baseUrl:`${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API }`}),
    endpoints: (builder) => ({
        getAllOrders: builder.query<any,void>({
            query: () => ({
                url: `/auth/allOrders`,
                headers:{
                    Authorization: localStorage.getItem('profile') ? `Bearer ${JSON.parse(localStorage.getItem("profile") || '{}').token}` : ""
                }
            })
        })
    })
})

export const {useGetAllOrdersQuery} = cachedApiCalls


