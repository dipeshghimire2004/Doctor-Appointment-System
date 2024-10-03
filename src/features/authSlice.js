import { createSlice } from "@reduxjs/toolkit";

// Ensure valid fallback if no data exists in localStorage
const userDataFromStorage = localStorage.getItem('userData');
let parsedUserData = null;
console.log(userDataFromStorage)
try {
    if (userDataFromStorage && userDataFromStorage !== "undefined") {  // Check for undefined string
        parsedUserData = JSON.parse(userDataFromStorage);  // Only parse if valid string
        
    }
} catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    localStorage.removeItem('userData');  // Ensure invalid data is cleared
}

const initialState = {
    status: localStorage.getItem('authStatus') === 'true' || false,  // Default to false if not logged in
    userData: parsedUserData || null,  // Fallback to null if parsing fails
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;

            // Save to localStorage
            localStorage.setItem('authStatus', 'true');  // Store as string
            localStorage.setItem('userData', JSON.stringify(action.payload.userData));  // Save user data properly
            localStorage.setItem('token', action.payload.token);  // Store token
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;

            // Remove from localStorage
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
        },
        updateUserData:(state, action)=>{
            state.userData={
                ...state.userData,
                ...action.payload,
            }
            localStorage.setItem('userData', JSON.stringify(state.userData));
        }

    }
});

export const { login, logout,updateUserData } = authSlice.actions;
export default authSlice.reducer;
