import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "@/pages/Layout";
import HomePage from "@/pages";
import ProductsPage from "@/pages/Products";
import Product from "@/pages/Product";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import ProtectedRout from "@/auth/ProtectedRout";
import CookiesServices from "@/Services"
import LayoutDashboard from "../pages/dashboard/LayoutDashboard";
import AdminDashboard from "@/pages/dashboard";
import ProductDashboard from "@/pages/dashboard/ProductDashboard";
import CategoryDashboard from "@/pages/dashboard/CategoryDashboard";
import Category from "@/pages/Category";

const token = CookiesServices.get("jwt")
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:documentId" element={<Product />} />
                <Route path="/categories/:documentId" element={<Category />} />
            </Route>

            <Route path="/dashboard" element={<LayoutDashboard />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/dashboard/products" element={<ProductDashboard />} />
                <Route path="/dashboard/Categories" element={<CategoryDashboard />} />
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