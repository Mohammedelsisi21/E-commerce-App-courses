import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import HomePage from "../pages";
import AboutPage from "../pages/About";
import ProductsPage from "../pages/Products";
import Product from "../pages/Product";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProtectedRout from "@/auth/ProtectedRout";
import CookiesServices from "@/Services"

const token = CookiesServices.get("jwt")
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={
                <ProtectedRout isAllowed={token} redirectPath="/signin" children={<Layout />}></ProtectedRout>
            }>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:documentId" element={<Product />} />
            </Route>

                <Route path="signin" element={
                    <ProtectedRout isAllowed={!token} redirectPath="/" children={<Signin/>} />
                }/>
                
                <Route path="signup" element={
                    <ProtectedRout isAllowed={!token} redirectPath="/" children={<Signup/>} />
                }/>
        </>
    )
)

export default router