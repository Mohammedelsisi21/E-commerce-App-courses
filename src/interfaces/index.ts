
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