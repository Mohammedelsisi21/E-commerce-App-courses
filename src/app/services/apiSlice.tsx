import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    tagTypes: ["Products"],
    reducerPath: 'api',
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_API }),
    endpoints: (builder) => ({
        getProductList: builder.query({
            query: (page: number) =>
                `api/products?populate[0]=thumbnail&populate[1]=category&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=7`,
        }),
    }),
})


export const { useGetProductListQuery } = apiSlice
