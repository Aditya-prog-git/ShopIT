import React from "react";
import {Route} from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProducts from "../admin/NewProducts";
import UpdateProduct from "../admin/UpdateProduct";
import UpdateImages from "../admin/UploadImages";
import ListOrders from "../admin/ListOrders";
import ProcessOrders from "../admin/ProcessOrders";
import ListUsers from "../admin/ListUsers";
import UpdateUser from "../admin/UpdateUser";
import ProductReviews from "../admin/ProductReviews";

 const AdminRoutes = () => {
  return (
        <>
        <Route path="/admin/dashboard" element={
            <ProtectedRoute admin={true}>
            <Dashboard />
            </ProtectedRoute>
        }/>
        <Route path="/admin/products" element={
            <ProtectedRoute admin={true}>
            <ListProducts />
            </ProtectedRoute>
        }/>
        <Route path="/admin/product/new" element={
            <ProtectedRoute admin={true}>
            <NewProducts />
            </ProtectedRoute>
        }/>
        <Route path="/admin/products/admin/products/:id" element={
            <ProtectedRoute admin={true}>
            <UpdateProduct />
            </ProtectedRoute>
        }/>
        <Route path="/admin/products/admin/products/:id/upload_images" element={
            <ProtectedRoute admin={true}>
            <UpdateImages />
            </ProtectedRoute>
        }/>
        <Route path="/admin/orders" element={
            <ProtectedRoute admin={true}>
            <ListOrders />
            </ProtectedRoute>
        }/>
        <Route path="/admin/orders/admin/orders/:id" element={
            <ProtectedRoute admin={true}>
            <ProcessOrders />
            </ProtectedRoute>
        }/>
        <Route path="/admin/users" element={
            <ProtectedRoute admin={true}>
            <ListUsers />
            </ProtectedRoute>
        }/>
        <Route path="/admin/users/admin/users/:id" element={
            <ProtectedRoute admin={true}>
            <UpdateUser />
            </ProtectedRoute>
        }/>
        <Route path="/admin/reviews" element={
            <ProtectedRoute admin={true}>
            <ProductReviews />
            </ProtectedRoute>
        }/>
        </>
    );
};

export default AdminRoutes;