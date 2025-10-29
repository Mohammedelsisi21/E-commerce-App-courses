import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesServices from "@/Services"
import type { ICategory } from '@/interfaces'

export const categoryApiSlice = createApi({
    tagTypes: ["Categories"],
    reducerPath: 'apiCategory',
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_API }),
    endpoints: (builder) => ({
        getCategoryList: builder.query({
            query: ({page, pageSize}) =>
                `api/categories?populate[thumbnail]=true&populate[products][populate][thumbnail]=true&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            providesTags: (result) =>
                result
                ? [...result.data.map(({ id }: ICategory) => ({ type: 'Categories' as const, id })),
                {"type": "Categories", id: "LIST"}]
                : [{"type": "Categories", id: "LIST"}],
            }),
        createCategoryList: builder.mutation({
            query: (body) => ({
                url: `api/categories?populate[0]=thumbnail`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt")}`
                },
                body,
            }),
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoryApiSlice.util.updateQueryData('getCategoryList', id, (draft) => {
                    Object.assign(draft, patch)
                }))
                try {
                    await queryFulfilled
                } catch {
                patchResult.undo()
                }
            },
        }),
        updateCategoryList: builder.mutation({
            query: ({id, body}) => ({
                url: `api/categories/${id}`,
                method: "Put",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt")}`
                },
                body
            }),
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoryApiSlice.util.updateQueryData('getCategoryList', id, (draft) => {
                    Object.assign(draft, patch)
                })
            )
            try {
                await queryFulfilled
            } catch {
                patchResult.undo()
            }},
        }),
        removeCategoryList: builder.mutation({
            query: (id) => ({
                url: `api/categories/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt")}`
                },
            }),
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
        }),
    }),
})
export const { useGetCategoryListQuery, useCreateCategoryListMutation, useUpdateCategoryListMutation, useRemoveCategoryListMutation } = categoryApiSlice
