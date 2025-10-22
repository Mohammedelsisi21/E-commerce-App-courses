import type { ICartItem, ITruncateText } from "../interfaces";



export const truncateText = ({text, limmit= 10}: ITruncateText) : string=> {

    const wordArray = text.split(" ")
    return wordArray.length > limmit ? wordArray.slice(0, limmit).join(" ") + "..." : text
}


export const addCartDrawerQuantity = (cartItems : ICartItem[], cartProduct: ICartItem) => {
    const extinting = cartItems.find(item => item.id === cartProduct.id)

    if(extinting){
        return cartItems.map((item) => item.id === cartProduct.id ? {...item, qty: item.qty + 1} : item)
    }
    return [...cartItems, {...cartProduct, qty: 1}]
}
