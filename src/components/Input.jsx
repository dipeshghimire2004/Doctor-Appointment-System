import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    type="text",
    className="" ,
    ...props
},ref){
    const id=useId();
    return(
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}    
            </label>}
            <input 
            type={type} className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 
                px-3 py-2 rounded-lg bg-white text-black outline-none  duration-200
            ${className}`}
            ref={ref}
            {...props}
            id={id} />
        </div>
    )
}) 
export default Input