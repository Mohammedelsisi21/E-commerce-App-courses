import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "@/pages/Layout";
import HomePage from "@/pages";
import ProductsPage from "@/pages/Products";
import Product from "@/pages/Product";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import ProtectedRout from "@/auth/ProtectedRout";
import CookiesServices from "@/Services"
import LayoutDashboard from "../pages/dashboard/LayoutDashboard";
import AdminDashboard from "@/pages/dashboard";
import ProductDashboard from "@/pages/dashboard/ProductDashboard";
import CategoryDashboard from "@/pages/dashboard/CategoryDashboard";
import Category from "@/pages/Category";
import LoginAdmin from "@/pages/dashboard/auth/Signin";
import PageNotFound from "@/pages/PageNotFound";
import ErrorHandler from "@/components/errors/ErrorHandler";

const token = CookiesServices.get("jwt")
const tokenAdmin = CookiesServices.get("jwt_Admin")
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} errorElement={<ErrorHandler/>}/>
                <Route path="/products" element={<ProductsPage />} errorElement={<ErrorHandler/>}/>
                <Route path="/product/:documentId" element={<Product />} errorElement={<ErrorHandler/>}/>
                <Route path="/categories/:documentId" element={<Category />} errorElement={<ErrorHandler/>}/>
            </Route>

            <Route path="/dashboard" element={<ProtectedRout
            redirectPath="login"
            isAllowed={tokenAdmin}
            children={<LayoutDashboard />}></ProtectedRout>}>
                <Route index element={<AdminDashboard />} />
                <Route path="/dashboard/products" element={<ProductDashboard />} errorElement={<ErrorHandler/>}/>
                <Route path="/dashboard/Categories" element={<CategoryDashboard />} errorElement={<ErrorHandler/>}/>
            </Route>
            <Route path="/dashboard/login" element={
                <ProtectedRout isAllowed={!tokenAdmin} redirectPath="/dashboard" children={<LoginAdmin />}/>
                } errorElement={<ErrorHandler/>}/>

            <Route path="signin" element={
                    <ProtectedRout isAllowed={!token} redirectPath="/" children={<Signin/>} />
            }errorElement={<ErrorHandler/>}/>

            <Route path="signup" element={
                <ProtectedRout isAllowed={!token} redirectPath="/" children={<Signup/>} />
            }errorElement={<ErrorHandler/>}/>

            <Route path="*" element={<PageNotFound />} />
        </>
    )
)

export default router