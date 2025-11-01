import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesServices from '@/Services'
import type { IUser } from "@/interfaces";


export const userApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_LOCAL_API }),
    tagTypes: ["users"],
    reducerPath: "userapi",
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getUser: builder.query({
            query:() => ({
                url: "/api/users",
                headers: {
                    Authorization: `Bearer ${CookiesServices.get("jwt_Admin")}`
                },
            }),
            providesTags: (result) =>
            result
            ? [
                ...result.map(({ id }: IUser) => ({ type: 'users' as const, id })),
                { type: 'users', id: 'LIST' },
            ]
            : [{ type: 'users', id: 'LIST' }],
        })
    })
})



export const { useGetUserQuery } = userApi