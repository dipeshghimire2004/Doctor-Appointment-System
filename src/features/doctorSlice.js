import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState={
    doctorsData:[],
}

const doctorSlice=createSlice({
    name:doctor,
    initialState,
    reducers:{
        addDoctor:(state,action)=>{
            const newDoctor={
                id:nanoid(),
                doctorName:action.payload.doctorName,
                specialization:action.payload.specialization,
                date:action.payload.date,
            };    
            state.doctorsData.push(doctor)
        },

        deleteDoctor:(state,action)=>{
            state.doctorsData=doctorsData.filter((doctor)=>doctor.id!==action.payload.id)
        },
    }
})


export const {addDoctor, deleteDoctor, updateDoctor}=doctorSlice.actions
export default doctorSlice.reducer
