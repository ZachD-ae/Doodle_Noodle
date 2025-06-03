import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'; 
import StartPage from './pages/StartPage'; 
import CanvasPage from './pages/CanvasPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage'; 

const App: React.FC = () => {
  return (
   
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
  );
};

export default App;
