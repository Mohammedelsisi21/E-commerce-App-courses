import type { AxiosRequestConfig } from "axios"

export interface IProduct {
    jwt?: string
    id?: number
    title: string
    description: string
    documentId: string
    price: number
    thumbnail: {
        url?: string | null
        id?: number | null
    }
    category: {
        title: string
    }
    stock?: number
    rating: number
    discount?: number
}
export interface ICartItem {
    qty: number
    jwt?: string
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
    rating: number
    discount?: number
}



// ** function text limet
export interface ITruncateText {
    text: string
    limmit?: number
}


// ** Custom Hook
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

// ** Register
export interface IRegisterForm {
    username: string
    email: string
    password: string
}

// ** User Data in Login && Register
export interface IUserData {
    jwt: string
    user: {
        id: number
        username: string
        email: string
    }
}

// ** Error
export interface IErrorResponse {
    error: {
        details?: {
            errors: {
            message: string;
        }[];
        };
        message?: string;
    };
}