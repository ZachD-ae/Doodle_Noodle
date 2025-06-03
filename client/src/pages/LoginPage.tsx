 

import React from 'react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/user';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginPage = ({ handleModalClose }: { handleModalClose: () => void }) => {
    const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: ''});
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
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
            handleModalClose();
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
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email || ''}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password || ''}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>

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

