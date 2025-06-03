import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout functionality here (e.g., clear session, JWT token)
        navigate('/'); // Redirect to the login page or home page after logout
    };

    return (
        <nav className="bg-teal-500 p-4 w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left side for navigation buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/gallery')}
                        className="text-white hover:bg-teal-600 px-4 py-2 rounded-md focus:outline-none"
                    >
                        View Gallery
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className="text-white hover:bg-teal-600 px-4 py-2 rounded-md focus:outline-none"
                    >
                        My Profile
                    </button>
                </div>

                {/* Centered Logo */}
                <div className="flex-grow flex justify-center">
                    <img
                        src="/DoodleNoodleLogo.svg" // Path to your SVG logo
                        alt="Doodle Noodle Logo"
                        className="w-24 h-auto" // You can adjust the width and height here
                    />
                </div>

                {/* Right side for logout button */}
                <div>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
