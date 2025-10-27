import CookiesServices from "@/Services"
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


export const uploadImage = async (thumbnailFile: File) => {
    const uploadRes = await fetch(`${import.meta.env.VITE_LOCAL_API}/api/upload`, {
    method: 'POST',
    body: (() => {
    const fd = new FormData();
    fd.append('files', thumbnailFile);
    return fd;
    })(),
    headers: {
        Authorization: `Bearer ${CookiesServices.get("jwt")}`,
    },});
    return await uploadRes.json();
}
