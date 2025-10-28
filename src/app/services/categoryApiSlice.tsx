import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import CookiesServices from "@/Services"
import type { ICategory } from '@/interfaces'

export const categoryApiSlice = createApi({
    tagTypes: ["Categories"],
    reducerPath: 'apiCategory',
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_API }),
    endpoints: (builder) => ({
        getCategoryList: builder.query({
            query: (page: number) =>
                `api/categories?populate[0]=thumbnail&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=10`,
            providesTags: (result) =>
                result
                ? [...result.data.map(({ id }: ICategory) => ({ type: 'Categories' as const, id })),
                {"type": "Categories", id: "LIST"}]
                : [{"type": "Categories", id: "LIST"}],
            }),
    }),
})


export const { useGetCategoryListQuery } = categoryApiSlice
