import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '../utils/queries';
import auth from '../utils/auth';
import { useUser } from '../App';


const StartPage = () => {
    const { setUser } = useUser()
    const { data, loading, error } = useQuery(GET_USER_DATA);
    const user = data?.getUserData;
    const navigate = useNavigate();
    
    const getUser = async () => {
        
        const today = new Date().toISOString().split('T')[0]
        const token = auth.loggedIn() ? auth.getToken() : null;

        if (!token) { return false; }

        const submissionDate = user?.submissionDate || '';
        
        if (today === submissionDate) {
            navigate('/gallery');
        }

        setUser(user)
        
    }
    
    useEffect(() => {
        getUser()
    }, [user])

    const handleStart = async () => {
        //get user
        const token = auth.loggedIn() ? auth.getToken() : null;
        if (!token) {return false;}
        try {
            if (!user) {
                console.log("No user data returned");
                throw new Error('No user Data returned');
            }
            navigate("/canvas");
        } catch (err) {
            console.log(err)
        }
    };
    
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.getUserData) return <div>No user data found.</div>;

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
