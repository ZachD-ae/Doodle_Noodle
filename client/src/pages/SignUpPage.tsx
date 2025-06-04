import React, { useState } from 'react';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    // Example API request
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Account created successfully');
      } else {
        alert('Error creating account');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/DoodleNoodleLogo.svg" alt="Doodle Noodle Logo" className="w-36 mx-auto" />
        </div>

        <h2 className="text-3xl  font-roboto font-semibold text-left text-gray-700 mb-1">Welcome!</h2>
        <p className="text-2xl text-left text-gray-500 mb-6 italic font-roboto">Let’s get you set up</p>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 font-roboto font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="mb-5 w-full p-3 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-roboto font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="mb-5 w-full p-3 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-roboto font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="mb-5 w-full p-3 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-roboto font-bold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className="mb-5 w-full p-3 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-md hover:bg-white hover:text-black  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300 font-shadows font-light"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-4  text-center text-gray-600 font-roboto font-bold">
          Already have an account?{' '}
          <a href="/login" className="text-black hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
