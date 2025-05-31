import React from 'react';


const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="mb-8">
        <img src="/DoodleNoodleLogo.svg" alt="Doodle Noodle Logo" className="w-36" />
      </div>

      {/* Title and Description */}
      <h1 className="text-4xl text-teal-500 mb-4 text-center">
        Daily Doodle Challenge
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        You’ve got 1:30 to bring today’s prompt to life. No redos. No pressure.
        Just draw, submit, and see how the world responded to the same idea.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mb-8">
        <button className="bg-teal-500 text-white py-2 px-6 rounded-md text-lg hover:bg-teal-600">
          Sign up
        </button>
        <button className="bg-teal-500 text-white py-2 px-6 rounded-md text-lg hover:bg-teal-600">
          Login to Play
        </button>
      </div>

      {/* Team Members Section */}
      <p className="mb-4 text-lg text-gray-800">By:</p>
      <div className="flex space-x-4 justify-center">
        <a href="https://github.com/meglanghoffdesign" target="_blank" rel="noopener noreferrer">
          <button className="text-teal-500 hover:text-teal-700">
           
          </button>
        </a>
        <a href="https://github.com/ZachD-ae" target="_blank" rel="noopener noreferrer">
          <button className="text-teal-500 hover:text-teal-700">
            
          </button>
        </a>
        <a href="https://github.com/justinvittitoe" target="_blank" rel="noopener noreferrer">
          <button className="text-teal-500 hover:text-teal-700">
          
          </button>
        </a>
      </div>

      {/* Placeholder for empty sections */}
      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <div className="w-48 h-48 bg-gray-200 rounded-md"></div>
        <div className="w-48 h-48 bg-gray-200 rounded-md"></div>
        <div className="w-48 h-48 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default LandingPage;
