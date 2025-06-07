import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import auth from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrompt, useUser } from '../App';
import { GET_DAILY_PROMPT } from '../utils/queries';
import { useQuery } from '@apollo/client';

const GalleryPage: React.FC = () => {
    const [userDrawing, setUserDrawing] = useState<string>(); // Store all the drawings
    const {data, loading, error } = useQuery(GET_DAILY_PROMPT)
    const navigate = useNavigate();
    const location = useLocation()
    const { prompt } = usePrompt();
    const { user } = useUser();
    const drawings = data?.dailyPrompt?.drawings
    console.log("success",drawings[0].imageUrl)
    console.log(user)

    useEffect(() => {
        if (!auth.loggedIn()) {
            console.log("Please signin first")
            navigate('/');
        }
        const storedUserDrawing = JSON.parse(localStorage.getItem('drawing') || '[]');
        setUserDrawing(storedUserDrawing);

        if (drawings && user) {
            const userId = user?._id;
            const found = drawings.find(drawing => {
                if (!drawing.artist) return false;
                if (typeof drawing.artist === 'object') {
                    return drawing.artist._id === userId;
                }
                return drawing.artist === userId;
            });
            setUserDrawing(found ? found.imageUrl : null);
        }
        
        // Fetch the drawings from localStorage
        //get all user drawings
        //make sure to watch for user drawings 
    }, [navigate]);

    const downloadPendingDrawing = () => {
        const pending = localStorage.getItem('pendingDrawing');
        if (!pending) {
            console.warn("No pending drawing found in localStorage.");
            return;
        }

        const { image } = JSON.parse(pending);

        // Create a temporary <a> tag to download the image
        const link = document.createElement('a');
        link.href = image;
        link.download = `doodle-noodle-${new Date().toISOString().slice(0, 10)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.dailyPrompt) return <div>No user data found.</div>;

    return (
        <div className="flex flex-col items-center justify-center p-6 max-h-screen bg-gray-50">
            <Navbar /> 

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4 font-roboto italic">
                    Today's Prompt:
                </h2>
                <p className="text-3xl text-center text-gray-500 mb-6 font-shadows">{prompt}</p>

                {/* Gallery Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Render user drawing first if it exists */}
                    {userDrawing && (
                        <div className="w-full h-48 bg-gray-100 rounded-md flex justify-center items-center">
                            <img
                                src={userDrawing}
                                alt="Your Drawing"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}

                    {/* Render all other drawings */}
                    {drawings && drawings.length > 0 ? (
                        drawings.map((drawing, index) => (
                            <div
                                key={index}
                                className="w-full h-48 bg-gray-100 rounded-md flex justify-center items-center"
                            >
                                <img
                                    src={drawing.imageUrl}
                                    alt={`Drawing ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">No drawings available yet.</p>
                    )}
                </div>

                {/* Download Button */}
                <button
                    onClick={downloadPendingDrawing}
                    className="py-2 px-6 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black shadow-md transition-colors duration-300"
                >
                    Download Today's Artwork
                </button>
            </div>
        </div>
    );
};

export default GalleryPage;
