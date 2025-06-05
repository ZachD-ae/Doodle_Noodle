import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout functionality here (e.g., clear session, JWT token)
        auth.logout()
        navigate('/'); // Redirect to the login page or home page after logout
    };

    return (
        <nav className="bg-black p-4 w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              
                {/* Centered Logo */}
                <div className="flex-grow flex justify-center">
                    <img
                        src="/DoodleWhite.svg" // Path to your SVG logo
                        alt="Doodle Noodle Logo"
                        className="w-30 h-auto" // You can adjust the width and height here
                    />
                </div>

                {/* Right side for logout button */}
                <div>
                    <button
                        onClick={() => navigate('/gallery')}
                        className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md focus:outline-none font-shadows"
                    >
                        View Gallery
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md focus:outline-none font-shadows"
                    >
                        My Profile
                    </button>
                    
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md focus:outline-none font-shadows"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
