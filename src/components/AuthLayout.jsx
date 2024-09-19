import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

// Protects routes based on user authentication and role-based authorization
const ProtectedRoute = ({children, requiredRole}) => {

    const navigate=useNavigate();
    const dispatch=useDispatch();

//Extract token and userrole from auth slice "redux state"
    const {token,userRole}=useSelector((state)=>state.auth)
    // const token=localStorage.getItem('AccessToken');
    // const userRole=localStorage.getItem('UserRole')

    useEffect(()=>{
        if(!token)(
            navigate('/login')
        )
        if(requiredRole && userRole!==requiredRole){
            return navigate('/unauthorized')
        }
        
    },[userRole, navigate,requiredRole,token,])
   
     // Render children components if authenticated and authorized
   
    return token && (!requiredRole || userRole === requiredRole) ? children : null;
};

export default ProtectedRoute;