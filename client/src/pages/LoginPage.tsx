import React from 'react';


const LoginPage: React.FC = () => {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Simulate a login process
    if (username && password) {
      // Here you would typically handle the login logic, e.g., API call
      alert("Login successful!");
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/assets/DoodleNoodleLogo" alt="Doodle Noodle Logo" className="w-36 mx-auto" />
        </div>

        {/* Title and Description */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Let’s get you logged in
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            {/* Username Fieldset */}
            <fieldset className="border-none">
              <legend className="font-semibold text-lg text-gray-700">Username</legend>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </fieldset>
          </div>

          <div className="mb-4">
            {/* Password Fieldset */}
            <fieldset className="border-none">
              <legend className="font-semibold text-lg text-gray-700">Password</legend>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </fieldset>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login
          </button>
        </form>

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
