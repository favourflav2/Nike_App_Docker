import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const devEnv = process.env.NODE_ENV !== "production"

export const shoeApi = createApi({
    reducerPath:"shoeApi",
    baseQuery: fetchBaseQuery({baseUrl:`${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API }`}),
    endpoints: (builder) => ({
        getAllShoes: builder.query<any,void>({
            query: () => `/data/allShoes`
        })
    })
})

export const {useGetAllShoesQuery} = shoeApi