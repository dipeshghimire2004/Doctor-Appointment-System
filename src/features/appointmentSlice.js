import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState={
    
    appointment:'',
    id:'',
}

const appointmentSlice=createSlice({
    name:'appointment',
    initialState,
    reducers:{
        addAppointment:(state,action)=>{
            const newAppointment={
               
                id:nanoid(),
                appointment:action.payload.appointment,
        };
        state.appointment.push(newAppointment);
        },
        cancelAppointment:(state)=>{
            state.appointment=state.appointment.filter((todo)=>todo.id!==id)           
        },
    }
})

export const {addAppointment, cancelAppointment}=appointmentSlice.actions
export default appointmentSlice.reducer