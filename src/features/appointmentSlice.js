import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState={
    
    appointments:[],
}

const appointmentSlice=createSlice({
    name:'appointment',
    initialState,
    reducers:{
        addAppointment:(state,action)=>{
            const newAppointment={
               
                id:nanoid(),
                // appointment:action.payload.appointment,
                doctorName:action.payload.doctorName,
                specialization:action.payload.specialization,
                date:action.payload.date,
                startTime:action.payload.startTime,
                endTime:action.payload.endTime,

        };
        state.appointments.push(newAppointment);
        },
        cancelAppointment:(state,action)=>{
            state.appointments=state.appointments.filter((appointment)=>appointment.id!==action.payload.id)           
        },
    }
})

export const {addAppointment, cancelAppointment}=appointmentSlice.actions;
export default appointmentSlice.reducer