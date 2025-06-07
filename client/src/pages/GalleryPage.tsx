import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import auth from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrompt } from '../App';

const GalleryPage: React.FC = () => {
    const [drawings, setDrawings] = useState<string[]>([]); // Store all the drawings
    const [savedDrawing, setSavedDrawing] = useState<string | null>(null); // Store the saved drawing
    const navigate = useNavigate();
    const location = useLocation()
    const { prompt } = usePrompt();
    
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
  {drawings.length === 0 ? (
    <p className="text-center text-gray-500 col-span-3">No drawings available yet.</p>
  ) : (
    drawings.map((drawing, idx) => (
      <div
        key={idx}
        className="w-full h-48 bg-gray-100 rounded-md flex justify-center items-center"
      >
        <img
          src={drawing}
          alt={`Drawing ${idx + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
    ))
  )}
</div>

                {/* Download Button */}
           
            </div>
        </div>
  );
};

export default GalleryPage;
