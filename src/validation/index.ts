import  * as yup from "yup"


export const loginSchema = yup.object({
    "identifier" : yup.string().required("E-mail is Required").matches(/^[a-zA-Z]{5,}@gmail\.com/,"Not a valid email address"),
    "password" : yup.string().required("Password is Required").min(5,"Password should be at least 6 charachters")
})

export const registerSchema = yup.object({
    "username": yup.string().required("userName is Required").min(5, "UserName should be at least 6 charachters").max(20, "UserName should be at long 20 charachters"),
    "email" : yup.string().required("E-mail is Required").matches(/^[a-zA-Z]{5,}@gmail\.com/,"Not a valid email address"),
    "password" : yup.string().required("Password is Required").min(5,"Password should be at least 6 charachters"),
})

