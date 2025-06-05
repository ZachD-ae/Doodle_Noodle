
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";

import StartPage from "./pages/StartPage";
import CanvasPage from "./pages/CanvasPage";
import GalleryPage from "./pages/GalleryPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/start',
        element: <StartPage />
      },
      {
        path: '/canvas',
        element: <CanvasPage />
      },
      {
        path: '/gallery',
        element: <GalleryPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);