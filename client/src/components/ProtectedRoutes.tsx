import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CanvasPage from "../pages/CanvasPage";
import GalleryPage from "../pages/GalleryPage";
import ProfilePage from "../pages/ProfilePage";
import Auth from "../utils/auth";

const ProtectedRoutes = () => {
    if (!Auth.loggedIn()) {
        return <Navigate to="/" replace />;
    }
    return (
        <Routes>
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add more protected routes as needed */}
        </Routes>
    );
};

export default ProtectedRoutes;