import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component

const ProfilePage: React.FC = () => {
    const [drawings, setDrawings] = useState<string[]>([]); // Store the user's drawings
    const [streak, setStreak] = useState<number>(0); // Store the user's streak
    const [prompt, setPrompt] = useState("An evil scientist bringing its creation to life"); // Drawing prompt

    // Fetch the saved drawings from localStorage
    useEffect(() => {
        const storedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        setDrawings(storedDrawings);

        // Calculate the streak based on how many consecutive drawings there are
        if (storedDrawings.length > 0) {
            const lastDrawingDate = new Date(storedDrawings[storedDrawings.length - 1].date);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - lastDrawingDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days

            setStreak(diffDays === 1 ? streak + 1 : 0); // Increment streak if drawn the next day
        }
    }, []);

    // Handle the download of the current drawing (if applicable)
    const handleDownload = () => {
        const latestDrawing = drawings[drawings.length - 1];
        const link = document.createElement('a');
        link.href = latestDrawing;
        link.download = 'todays_artwork.png'; // You can customize the file name
        link.click();
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
            <Navbar /> {/* Add the Navbar component here */}

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    My Profile:
                </h2>

                {/* Streak and Artwork Count */}
                <p className="text-center text-gray-500 mb-4">
                    You have {drawings.length} artworks! Keep it up!
                </p>
                <p className="text-center text-gray-500 mb-6">
                    Your daily streak is {streak} day(s)!
                </p>

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

               
                <button
                    onClick={handleDownload}
                    className="py-2 px-6 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Download Today's Artwork
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
