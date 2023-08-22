import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shoeApi = createApi({
    reducerPath:"shoeApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5001/data"}),
    endpoints: (builder) => ({
        getAllShoes: builder.query<any,void>({
            query: () => `/allShoes`
        })
    })
})

export const {useGetAllShoesQuery} = shoeApi