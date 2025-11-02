import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import CookiesServices from "@/Services"
import ProtectedRout from "@/auth/ProtectedRout";
import { lazy } from "react";

import Layout from "@/pages/Layout";

const HomePage = lazy(() => import("@/pages"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const Product = lazy(() => import("@/pages/Product"));
const Signin = lazy(() => import("@/pages/auth/Signin"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Category = lazy(() => import("@/pages/Category"));

const LayoutDashboard = lazy(() => import("@/pages/dashboard/LayoutDashboard"));
const AdminDashboard = lazy(() => import("@/pages/dashboard"));
const ProductDashboard = lazy(() => import("@/pages/dashboard/ProductDashboard"));
const CategoryDashboard = lazy(() => import("@/pages/dashboard/CategoryDashboard"));
const LoginAdmin = lazy(() => import("@/pages/dashboard/auth/Signin"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const ErrorHandler = lazy(() => import("@/components/errors/ErrorHandler"));


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