import React from 'react'
import LoginForm from '../core/Auth/LoginForm'
import SignUpForm from '../core/Auth/SignUpForm'
import coverImage from "../../assets/Images/frame.png"

const Template = ({heading, description1, description2, image, loginForm}) => {
  return (
    <div className='grid lg:grid-cols-2 place-items-center lg:place-items-start text-white'>
        {/* info div */}
        <div className='w-full lg:w-[80%] space-y-10 '>
            <div className='space-y-3'>
                <h2 className='text-richblack-5 font-semibold  text-[1.875rem] '>{heading}</h2>
                <h3 className='font-normal '>
                    <span className='text-richblack-100 '>{description1} </span>
                    <span className='text-blue-100 italic'>{description2}</span>
                </h3>
            </div>

            {
                loginForm ? (<LoginForm/>) : (<SignUpForm/>)
            }
        </div>
        {/* img div */}
        <div className='hidden lg:block relative'>
            <img src={image} alt="frontImage" className='absolute  z-10'/>
            <div className=''>
                <img src={coverImage} alt='coverImage' className='translate-y-[5%] translate-x-[5%]'/>
            </div>
        </div>
    </div>
  )
}

export default Template