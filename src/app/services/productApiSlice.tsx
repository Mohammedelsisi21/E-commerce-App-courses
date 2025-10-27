import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesServices from "@/Services"
import type { IProduct } from '@/interfaces'

export const productApiSlice = createApi({
    tagTypes: ["Products"],
    reducerPath: 'api',
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_API }),
    endpoints: (builder) => ({
        getProductList: builder.query({
            query: (page: number) =>
                `api/products?populate[0]=thumbnail&populate[1]=category&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=8`,
            providesTags: (result) =>
                result
                ? [...result.data.map(({ id }: IProduct) => ({ type: 'Products' as const, id })),
                {"type": "Products", id: "LIST"}]
                : [{"type": "Products", id: "LIST"}],
            }),
        // createProductList: builder.mutation({

        // }),
        updateProductList: builder.mutation({
            query: ({id, body}) => ({
                url: `api/products/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt")}`
                },
                body: {data: body},
            }),
                async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productApiSlice.util.updateQueryData('getProductList', id, (draft) => {
                    Object.assign(draft, patch)
                }))
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }},
                invalidatesTags: ({ id }) => [
                { type: 'Products', id },
                { type: 'Products', id: 'LIST' }],
        }),
        removeProductList: builder.mutation({
            query: (id: string) => ( {
                url: `api/products/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt")}`
                },
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        })
    }),
})


export const { useGetProductListQuery, useRemoveProductListMutation,useUpdateProductListMutation } = productApiSlice
