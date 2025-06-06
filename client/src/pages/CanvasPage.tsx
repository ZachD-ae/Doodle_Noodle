import React, { useState, useEffect, useRef } from 'react';
import Canvas from '../components/ui/Canvas'; 
import { useNavigate } from 'react-router-dom'; 
import { useQuery } from '@apollo/client';
import auth from '../utils/auth';

import { GET_DAILY_PROMPT } from '../utils/queries';
import { usePrompt } from '../App';

const CanvasPage: React.FC = () => {
    const [timer, setTimer] = useState(15); 
    const navigate = useNavigate(); 
    
    const { data, loading, error } = useQuery(GET_DAILY_PROMPT)

    const { prompt } = usePrompt()
    

    useEffect(() => {
        if (!auth.loggedIn()) {
            navigate('/')
        }

        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            
            navigate("/gallery", {state: { prompt }});
        }

        return () => clearInterval(interval); 
    }, [ timer, data, loading, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading prompt.</div>;

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
                    Today's Prompt:
                </h2>
                <p className="text-center text-gray-500 mb-6">{prompt}</p>

                <div className="flex justify-between w-full mb-6">
                    {/* Timer display */}
                    <p className="text-xl font-bold">
                        {timer}s
                    </p>
                </div>

                {/* Canvas Component */}
                <Canvas />

                <div className="flex justify-center space-x-4 mt-6">
                   
                </div>
            </div>
        </div>
    );
};

export default CanvasPage;
