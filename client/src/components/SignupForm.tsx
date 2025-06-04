import React from 'react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/user';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
    // set initial form state
    const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [addUser] = useMutation(ADD_USER);

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
            const { data } = await addUser({
                variables: {
                    username: userFormData.username,
                    email: userFormData.email,
                    password: userFormData.password,
                },
            });


            Auth.login(data.createUser.token);
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
                className="absolute top-2 right-2 text-gray-500 text-2xl"
                onClick={handleModalClose}
                aria-label="Close"
            >
                ×
            </button>

             <div className="text-center mb-6">
                <img src="/DoodleNoodleLogo.svg" alt="Doodle Noodle Logo" className="w-36 mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-center text-black mb-6 font-shadows">Sign Up</h2>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your signup!
                </Alert>
            
                <Form.Group className=' flex mb-3 p-1 font-roboto font-bold'>
                    <div>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    </div>
                    <Form.Control className='mb-3 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto rounded-md'
                        type='text'
                        placeholder='Your username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username || ''}
                        required
                    />
                    <Form.Control.Feedback className='font-roboto italic font-light text-gray-200 hover:text-red-400' type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 p-1 font-roboto font-bold'> 
                    <div>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    </div>
                    <Form.Control className='mb-3 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto rounded-md'
                        type='email'
                        placeholder='Your email address'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email || ''}
                        required
                    />
                    <Form.Control.Feedback className='font-roboto italic font-light text-gray-200 hover:text-red-400' type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 p-1 font-roboto font-bold'>
                    <div>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    </div>
                    <Form.Control className='mb-3 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-roboto rounded-md'
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password || ''}
                        required
                    />
                    <Form.Control.Feedback className='font-roboto italic font-light text-gray-200 hover:text-red-400' type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                
                <Button className='w-full py-2 font-shadows text-white bg-black hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300 rounded-md'
                    onClick={handleModalClose}
                    disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default SignupForm;
