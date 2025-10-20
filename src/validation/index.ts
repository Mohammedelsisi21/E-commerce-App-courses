import  * as yup from "yup"


export const loginSchema = yup.object({
    "identifier" : yup.string().required("E-mail is Required").matches(/^[a-zA-Z]{5,}@gmail\.com/,"Not a valid email address"),
    "password" : yup.string().required("Password is Required").min(5,"Password should be at least 6 charachters")
})

