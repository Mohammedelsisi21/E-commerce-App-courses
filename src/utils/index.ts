import type { ITruncateText } from "../interfaces";



export const truncateText = ({text, limmit= 10}: ITruncateText) : string=> {

    const wordArray = text.split(" ")
    
    return wordArray.length > limmit ? wordArray.slice(0, limmit).join(" ") + "..." : text
}