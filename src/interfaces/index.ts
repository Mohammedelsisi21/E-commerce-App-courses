import type { AxiosRequestConfig } from "axios"

export interface IProduct {
    id?: number
    title: string
    description: string
    documentId: string
    price: number
    thumbnail: {
        url: string
    }
    category: {
        title: string
    }
}


// ** function text limet
export interface ITruncateText {
    text: string
    limmit?: number
}


export interface IAuthenticatedQuery {
    queryKey: string[]
    url: string
    config?: AxiosRequestConfig
    action: "get" | "post" | "delete" | "put"
}


// ** Login

export interface ILoginForm {
    identifier: string
    password: string
}