import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from '../features/appointmentSlice'
import authReducer from '../features/authSlice'


const store = configureStore({
    reducer:{
        appointment:appointmentReducer,
        auth:authReducer,
    }
})

export default store