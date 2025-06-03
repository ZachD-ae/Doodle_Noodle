import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const StartPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        // Navigate to the Start Drawing page
        navigate("/canvas");
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <div className="text-center mb-6">
                    <img
                        src="/DoodleNoodleLogo.svg"
                        alt="Doodle Noodle Logo"
                        className="w-36 mx-auto"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    Today's Drawing Prompt is ready, are you?
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    You’ve got 1:30 seconds to bring it to life! Remember: You only get one try each day. <strong>No redos!</strong>
                </p>

                {/* Start Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleStart}
                        className="py-3 px-6 bg-black text-white font-semibold rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Start Doodling!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
