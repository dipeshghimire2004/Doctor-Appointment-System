import React from 'react';
import { Button, Input } from './index';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
     
      // If login is successful
      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data;

        // Store tokens in localStorage for future requests
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userRole', user.role);

        // Dispatch login action with relevant user data
        dispatch(login({ userData: user }));

        localStorage.setItem('user',JSON.stringify(user));

        // Navigate to the appropriate dashboard based on user role
        switch (user.role) {
          case 'admin':
            navigate('/admin/dashboard', { replace: true });
            break;
          case 'doctor':
            navigate('/doctor/dashboard', { replace: true });
            break;
          default:
            navigate('/', { replace: true });
        }

        // Show success toast notification
        toast.success('Login successfully!');
      }
    } catch (error) {
      // Improved error handling
      toast.error(
        error.response?.data?.message || 'Invalid username or password'
      );
      console.error('Login error:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Toaster/>
      <div className='bg-white p-8 m-5 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>
          Log In to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Input
              label='Email'
              type='email'
              placeholder='Enter Your Email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email address must be valid',
                },
              })}
            />
            {errors.email && (
              <span className='text-red-600 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className='mb-4'>
            <Input
              label='Password'
              type='password'
              placeholder='Password'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <span className='text-red-600 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type='submit'
            onLogin={()=>navigate('/', {state:{selectedDoctor : doctor}})}
            className='w-full hover:bg-blue-500 text-white font-bold py-3 px-4 mt-4 rounded-lg transition duration-300'
          >
            Login
          </Button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-gray-600 text-sm'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
