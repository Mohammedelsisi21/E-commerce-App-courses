
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
