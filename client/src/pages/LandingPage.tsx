import React from 'react';

const LandingPage: React.FC = () => {
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
      <p className="text-lg text-gray-600 mb-8 text-center italic max-w-lg font-roboto">
        You’ve got 30 seconds to bring today’s prompt to life. <span className="font-bold text-black">No redos. No pressure.</span>
        Just draw, submit, and see how the world responded to the same idea.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
        <button className="bg-gray-400 text-white py-3 px-8 rounded-md text-lg hover:bg-black font-shadows hover:text-white hover:scale-105 transition-transform duration-300 mb-4 md:mb-0">
          <a href="/signup" className="text-white">
            Sign up
          </a>
        </button>
        <button className="bg-black  text-white py-3 px-8 rounded-md text-lg hover:bg-gray-600 hover:text-black font-shadows hover:scale-105 transition-transform duration-300">
          <a href="/login" className="text-white">
            Login to Play
          </a>
        </button>
      </div>

      {/* Team Members Section */}
      <div className="mt-8 text-center">
        <p className="mb-4 text-lg text-gray-800">By:</p>
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
