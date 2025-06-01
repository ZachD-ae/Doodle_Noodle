import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component

const GalleryPage: React.FC = () => {
    const [drawings, setDrawings] = useState<string[]>([]); // Store all the drawings
    const [prompt, setPrompt] = useState("An evil scientist bringing its creation to life"); // Drawing prompt

    // Fetch the drawings from localStorage
    useEffect(() => {
        const storedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        setDrawings(storedDrawings);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
            <Navbar /> 

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    Today's Prompt:
                </h2>
                <p className="text-center text-gray-500 mb-6">{prompt}</p>

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
                    className="py-2 px-6 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Download Today's Artwork
                </button>
            </div>
        </div>
    );
};

export default GalleryPage;
