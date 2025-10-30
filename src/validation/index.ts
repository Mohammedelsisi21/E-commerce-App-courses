import  * as yup from "yup"


export const loginSchema = yup.object({
    "identifier" : yup.string().required("E-mail is Required").matches(/^[a-zA-Z]{5,}[0-9]{0,}@gmail\.com/,"Not a valid email address"),
    "password" : yup.string().required("Password is Required").min(5,"Password should be at least 6 charachters")
})

export const registerSchema = yup.object({
    "username": yup.string().required("userName is Required").min(5, "UserName should be at least 6 charachters").max(20, "UserName should be at long 20 charachters"),
    "email" : yup.string().required("E-mail is Required").matches(/^[a-zA-Z]{5,}@gmail\.com/,"Not a valid email address"),
    "password" : yup.string().required("Password is Required").min(5,"Password should be at least 6 charachters"),
})


export const createProduct = yup.object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters").max(1000, "Description must not exceed 1000 characters"),
    price: yup.number().typeError("Price must be a number").required("Price is required").min(0, "Price cannot be negative"),
    stock: yup.number().typeError("Stock must be a number").required("Stock is required").min(0, "Stock cannot be negative"),
    thumbnail: yup.mixed().nullable().test("fileRequired", "Thumbnail is required", function (value) {if (!value) return false;return true;}),
});

export const categorySchema = yup.object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),
    thumbnail: yup.mixed<FileList>()
    .required("Thumbnail is required")
    .test("fileRequired", "Thumbnail is required", (value) => {
        return value && value.length > 0;
    }),
});

