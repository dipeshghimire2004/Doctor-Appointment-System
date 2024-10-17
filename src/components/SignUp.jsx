import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';  // Icons for hide/show password

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const password = watch('password');

  // State to toggle visibility of passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        dispatch(login(response.data));
        reset();
        navigate('/login', { replace: true });
        toast.success('Registration successful! You can now log in.');
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 m-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-4">
            <Input
              label="Name"
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your name"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <Input
              label="Phone"
              placeholder="Enter your phone number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Phone number must contain only numbers',
                },
              })}
            />
            {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}  // Toggle type between text and password
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
              placeholder="Confirm your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
            {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Create Account
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
