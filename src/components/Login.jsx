import React from 'react'
import {Button,Input} from './index'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'

const Login = () => {
  const {register, handleSubmit,}=useForm();
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onSubmit= async (data)=>{
    try{
      const response=await axios.post("http://localhost:8080/api/auth/login",
        {email,password}
      ,{
        headers:{
          'Content-Type':'application/json',
        }
      });
    
      if(response.status === 200){
        dispatch(login(response))
        alert("Login SUccessfully")
        navigate('/')
      }
    }
    catch(error){
      console.error("Invalid username or password")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
     <div className="bg-white p-8 m-5 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
          label="Email:"
          type="email"
            placeholder="Enter Your Email"
            {...register('email',{required:true,
              validate:{
                matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be valid",
              }
            })}
          />
          <Input 
          label="Password"
          type="password"
          placeholder="Password"
          {...register("Password", {required:true})}
          />
          <Button
              type="submit"
              className="w-full  hover:bg-blue-500 text-white font-bold py-3 px-4 mt-4 rounded-lg transition duration-300"
          >
              Login
          </Button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
    </div>
    </div>
  )
}

export default Login