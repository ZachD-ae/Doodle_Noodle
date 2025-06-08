import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import auth from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrompt, useUser } from '../App';
import { GET_DAILY_PROMPT } from '../utils/queries';
import { GET_USER_DATA } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { UserData } from '../models/userData';

const GalleryPage: React.FC = () => {
    const [userDrawing, setUserDrawing] = useState<string>(); // Store User drawings
    const [allDrawings, setAllDrawings] = useState([]); // Store User drawings
    const {data, loading, error } = useQuery(GET_DAILY_PROMPT)
    const navigate = useNavigate();
    const { prompt } = usePrompt();
    const { user } = useUser();
    const drawings = data?.dailyPrompt?.drawings
    

    useEffect(() => {
        if (!auth.loggedIn()) {
            console.log("Please signin first")
            navigate('/');
        }
        

        if (drawings && user) {
            const userId = user?._id;
            const found = drawings.find(drawing => {
                if (!drawing.artist) return false;
                if (typeof drawing.artist === 'object') {
                    const userDrawing = drawing.artist._id === userId;
                    return userDrawing
                }
                
            });
            
            setUserDrawing(found ? found.imageUrl : null);
        }
        
        if (drawings && user) {
            const userId = user?._id;
            
            
            const filter = drawings.filter(drawing => {
                if (!drawing.artist) return true; // keep drawings with no artist just in case
                if (typeof drawing.artist === 'object') {
                    return drawing.artist._id !== userId;
                }
            });
            
            
            setAllDrawings(filter);
        }
        
        // Fetch the drawings from localStorage
        //get all user drawings
        //make sure to watch for user drawings 
    }, [data, navigate]);

    const downloadPendingDrawing = () => {
        const drawing = localStorage.getItem('drawing');
        if (!drawing) {
            console.warn("No pending drawing found in localStorage.");
            return;
        }


        // Create a temporary <a> tag to download the image
        const link = document.createElement('a');
        link.href = drawing;
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
                        <div className="w-full h-48 bg-gray-100 rounded-md flex flex-col justify-center items-center p-2">
                            <img
                                src={userDrawing}
                                alt="Your Drawing"
                                className="w-full h-full object-contain"
                            />
                              <p className="text-sm text-gray-600 mt-1">Your Drawing</p>
                        </div>
                    )}

                    {/* Render all other drawings */}
                    {allDrawings && allDrawings.length > 0 ? (
                        allDrawings.map((drawing, index) => (
                            <div
                                key={index}
                                className="w-full h-48 bg-gray-100 rounded-md flex flex-col justify-center items-center p-2"
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
                    className="py-2 px-6 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black shadow-md transition-colors duration-300 font-shadows"
                >
                    Download Today's Artwork
                </button>
            </div>
        </div>
    );
};

export default GalleryPage;

