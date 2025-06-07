import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const GalleryPage: React.FC = () => {
  const [savedDrawing, setSavedDrawing] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("An evil scientist bringing its creation to life"); // Drawing prompt

  useEffect(() => {
    // Retrieve the saved drawing from localStorage
    const drawing = localStorage.getItem('drawing');
    if (drawing) {
      setSavedDrawing(drawing); // Set the saved drawing to state
    }
  }, []);

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
                    {!savedDrawing ? (
                        <p className="text-center text-gray-500">No drawings available yet.</p>
                    ) : (
                        <div
                            className="w-full h-48 bg-gray-100 rounded-md flex justify-center items-center"
                        >
                            <img
                                src={savedDrawing}
                                alt="Saved Drawing"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Download Button */}
           
            </div>
        </div>
  );
};

export default GalleryPage;
