import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import Input from './Input';
import {useDispatch} from "react-redux"
import { login } from '../features/authSlice';
import { Toaster,toast } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const onSubmit = async (data) => {
        const { name, email, phone, password } = data;

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                name,
                email,
                phone,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });


            if (response.status === 200) {
                dispatch(login(response.data))
                
                reset();  // Reset form after successful submission
                navigate('/login', { replace: true });
                toast.success('Registration successful! You can now log in.');
            } else {
                alert(response.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred during registration. Please try again later.");
        }
    };

    const password = watch('password');  // To watch the password field for confirming it
   
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Toaster/>
            <div className="bg-white p-8 m-5 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        
                        <Input
                            label="Name"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className='mb-4'>
                        <Input 
                            label="Email :"
                            type='email'
                            name="email"
                            placeholder="Your Email"
                            {...register('email', {required:"Email is required",
                                pattern:{
                                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message:"Pls enter a valid email address"
                                }
                            })}
                        />
                       {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="mb-4">
                       
                        <Input
                            label="Phone"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Phone number must contain only numbers',
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
                    </div>

                    <div className="mb-4">
                        
                        <Input
                            label="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                            })}
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className="mb-4">
                        
                        <Input
                            label="Confirm Password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match',
                            })}
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-full  hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                        >
                            Create 
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
