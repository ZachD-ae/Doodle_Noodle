import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/loginForm';



const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if(!token) {
      return
    } else {
      navigate('/start')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="mb-12">
        <img src="/DoodleNoodleLogo.svg" alt="Doodle Noodle Logo" className="w-60" />
      </div>

      {/* Title and Description */}
      <h1 className="text-5xl font-bold text-black mb-4 text-center font-shadows">
        Daily Doodle <span className="text-black lg:text-6xl">Challenge</span>
      </h1>

      <p className="text-3xl text-gray-600 mb-6 py-10 text-center max-w-xl space-y-4 font-roboto italic">
        You’ve got 30 seconds to bring today’s prompt to life.
        <strong>No redos.</strong>
        No pressure.
        Just draw, submit, and see how the world responded to the same idea.
      </p>




      <div className="flex space-x-4 mb-8 py-20">
        <button
          className="bg-gray-200 text-black py-2 px-6 rounded-md text-lg hover:bg-black hover:text-white font-shadows hover:scale-110 transition-all duration-300 shadow-lg"
          onClick={() => {
            checkLoggedIn()
            setShowSignup(true)
            setShowLogin(false);}}
        >
          Sign up
        </button>
        <button
          className="bg-black text-white py-2 px-6 rounded-md text-lg hover:bg-white hover:text-black font-shadows hover:scale-110 transition-all duration-300"
          onClick={() => {
            setShowLogin(true)
            setShowSignup(false);
          }}
        >
          Login to Play
        </button>
      </div>


      {/* Modals */}
      {!auth.loggedIn() && showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoginForm handleModalClose={() => setShowLogin(false)}
            onLoginSuccess={() => {
              setShowLogin(false);}} />
        </div>)}
      {!auth.loggedIn() && showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupForm handleModalClose={() => setShowSignup(false)}
            onSignUpSuccess={() => {
              navigate('/start')}} />
        </div>
      )}

      <p className="text-sm text-gray-600 mb-6 text-center">
        You’ve got 1:30 to bring today’s prompt to life. No redos. No pressure.
        Just draw, submit, and see how the world responded to the same idea.
      </p>

      {/* Team Members Section */}
      <div className="mt-8 text-center">
        <p className="mb-4 text-lg text-gray-800 font-roboto font-bold">By:</p>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/meglanghoffdesign" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-500 font-bold hover:text-black font-roboto">
              Meg Langhoff
            </button>
          </a>
          <a href="https://github.com/ZachD-ae" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-500 font-bold hover:text-black font-roboto">
              Zachary Donels
            </button>
          </a>
          <a href="https://github.com/justinvittitoe" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-500 font-bold hover:text-black font-roboto">
              Justin Vittitoe
            </button>
          </a>
        </div>
      </div>

      {/* Placeholder for empty sections */}

    </div>
  );
};


export default LandingPage;
