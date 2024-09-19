import React from 'react'

const Button = ({
    children,
    type='submit',
    bgColor="bg-orange-400 ",
    textColor="text-white",
    className="",
    ...props
}) => {
  return (
  <button className={`px-5 py-2 rounded-full hover:to-blue-500 ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button