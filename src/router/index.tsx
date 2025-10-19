import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import HomePage from "../pages";
import AboutPage from "../pages/About";
import ProductsPage from "../pages/Products";
import Product from "../pages/Product";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

// const isAllowed = true

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:documentId" element={<Product />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </>
    )
)

export default router