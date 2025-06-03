import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/user';

const LoginForm = ({ }: { handleModalClose: () => void }) => {
    const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);

    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // check if form has everything
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({
                variables: { email: userFormData.email, password: userFormData.password }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Alert */}
            {showAlert && (
                <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
                    Something went wrong with your login credentials!
                </div>
            )}

            <form noValidate onSubmit={handleFormSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={handleInputChange}
                        value={userFormData.email || ''}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your password"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={handleInputChange}
                        value={userFormData.password || ''}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!(userFormData.email && userFormData.password)}
                    className="w-full py-2 mt-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
