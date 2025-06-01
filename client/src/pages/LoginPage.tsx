import React from 'react';
import LoginForm from '../components/loginForm';  
const LoginPage: React.FC = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/DoodleNoodleLogo.svg" alt="Doodle Noodle Logo" className="w-36 mx-auto" />
        </div>

        {/* Title and Description */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Let’s get you logged in
        </p>

        {/* LoginForm Component */}
        <LoginForm handleModalClose={() => { /* Close Modal Logic if needed */ }} />

        {/* Sign Up Link */}
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-teal-500 hover:underline font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
