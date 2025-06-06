import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const GalleryPage: React.FC = () => {
    const [drawings, setDrawings] = useState<string[]>([]); // Store all the drawings
    const [prompt, setPrompt] = useState("An evil scientist bringing its creation to life"); // Drawing prompt
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!auth.loggedIn()) {
            console.log("Please signin first")
            navigate('/');
        }
        const storedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        setDrawings(storedDrawings);
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
                    {drawings.length === 0 ? (
                        <p className="text-center text-gray-500">No drawings available yet.</p>
                    ) : (
                        drawings.map((drawing, index) => (
                            <div
                                key={index}
                                className="w-full h-48 bg-gray-100 rounded-md flex justify-center items-center"
                            >
                                <img
                                    src={drawing}
                                    alt={`Drawing ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))
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
