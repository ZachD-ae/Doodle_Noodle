import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const StartPage = ({ handleModalClose }: { handleModalClose: () => void }) => {
    const navigate = useNavigate();

    const handleStart = () => {
        // Navigate to the Start Drawing page
        //add submission date logic
        //query user 
        //check if submissiondate is true
        
        navigate("/canvas");
        handleModalClose();
    };

    return (
        
           
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <div className="text-center mb-6">
                    <img
                        src="/DoodleNoodleLogo.svg"
                        alt="Doodle Noodle Logo"
                        className="w-36 mx-auto"
                    />
                </div>
                   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
                className="absolute top-2 right-2 text-gray-500 text-2xl"
                onClick={handleModalClose}
                aria-label="Close"
            >
                ×
            </button>

                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4 font-shadows">
                    Today's Drawing Prompt is ready, are you?
                </h2>
                <p className="text-center text-gray-500 mb-6 font-roboto">
                    You’ve got 1:30 seconds to bring it to life! Remember: You only get one try each day. <strong className=' text-black text-2xl italic'>No redos!</strong>
                </p>

                {/* Start Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleStart}
                        className="py-3 px-6 bg-black text-white font-semibold rounded-md shadow-md font-shadows "
                    >
                        START DOODLING!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
