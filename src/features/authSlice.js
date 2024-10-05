import { createSlice } from "@reduxjs/toolkit";

// Retrieve user data and handle possible invalid entries
const userDataFromStorage = localStorage.getItem('userData');
let parsedUserData = null;

try {
    if (userDataFromStorage && userDataFromStorage !== "undefined") {
        parsedUserData = JSON.parse(userDataFromStorage); // Parse only valid data
    }
} catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    localStorage.removeItem('userData');  // Clear invalid data from localStorage
}

// Initial state setup
const initialState = {
    status: localStorage.getItem('authStatus') === 'true',  // Ensure proper boolean for login status
    userData: parsedUserData || null,  // Fallback to null if parsed data is invalid or missing
    token: localStorage.getItem('token') || null,  // Retrieve token from localStorage or fallback to null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // Set state when logging in
            state.status = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token;  // Store token in the state

            // Store user session info in localStorage
            localStorage.setItem('authStatus', 'true');  // Save login status as a string
            localStorage.setItem('userData', JSON.stringify(action.payload.userData));  // Save user data
            localStorage.setItem('token', action.payload.token);  // Save token in localStorage
        },
        logout: (state) => {
            // Clear state when logging out
            state.status = false;
            state.userData = null;
            state.token = null;  // Clear token in state as well

            // Remove session data from localStorage
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
            localStorage.removeItem('token');  // Ensure token is removed on logout
        },
        updateUserData: (state, action) => {
            // Update user data in the state by merging new data with existing data
            state.userData = {
                ...state.userData,  // Retain existing properties
                ...action.payload,  // Merge updated fields
            };

            // Update userData in localStorage to keep it in sync with state
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
    }
});

// Export actions for use in components
export const { login, logout, updateUserData } = authSlice.actions;
export default authSlice.reducer;
