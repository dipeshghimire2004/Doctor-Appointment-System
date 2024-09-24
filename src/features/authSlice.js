import { createSlice } from "@reduxjs/toolkit";

const initialState={

    status:localStorage.getItem('authStatus')==='true' || false,
    userData:JSON.parse(localStorage.getItem('userData')) || null,
};

const authSlice=createSlice({
    name:'auth',        //user has beeb replaced by auth so I have to change it in everycomponent
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;

            //save to localstorage
            localStorage.setItem('authStatus', true);
            localStorage.setItem('userData', JSON.stringify(action.payload));
            localStorage.setItem('token', action.payload.token);
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;

            //Remove from localStorage
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
            localStorage.removeItem('token')
        }
    }
})

export const {login, logout}=authSlice.actions

export default authSlice.reducer