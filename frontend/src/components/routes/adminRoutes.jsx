 import React from "react";
 import {Route} from "react-router-dom";
 import ProtectedRoute from "../auth/ProtectedRoute";
 import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProducts from "../admin/NewProducts";
import UpdateProduct from "../admin/UpdateProduct";
import UpdateImages from "../admin/UploadImages";

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
        </>
    );
};

export default AdminRoutes;