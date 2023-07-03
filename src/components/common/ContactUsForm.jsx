import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { contact } from '../../services/operations/authOperations';
import countryCodes from "../../data/countrycode.json"

const ContactUsForm = () => {

    const dispatch = useDispatch();

    const {
        reset, handleSubmit, register, formState : {errors, isSubmitSuccessful}, 
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset(
                {
                    email:"",
                    firstName:"",
                    lastName:"",
                    message:"",
                    phoneNo:"",
                    countryCode:"+91"
                }
            )
        }
    }, [reset, isSubmitSuccessful]);

    const submitForm = async (data) => {
        dispatch(contact(data))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-y-6 p-8'>
        {/* first name last name div */}
        <div className='grid grid-cols-2 gap-x-6 justify-between'>

            {/* firstname */}
            <label htmlFor='firstName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>First Name</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='Enter first Name'
                    {...register("firstName", {required:true})}
                />
                {
                errors.firstName && (<span className='text-xs text-pink-500'>! Please Enter First Name</span>)
                }
            </label>

            {/* lastname */}
            <label htmlFor='lastName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Last Name</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='lastName'
                name='lastName'
                placeholder='Enter last Name'
                {...register("lastName")}
                />
            </label>

        </div>  

        {/* email */}
        <label htmlFor='email' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Email Adress</p>
            <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type='email'
            id='email'
            name='email'
            placeholder='Enter email adress'
            {...register("email", {required:true})}
            />
            {
                errors.email && (<span className='text-xs text-pink-500'>! Please Enter Email Adress</span>)
            }
        </label>


        {/* Phone Number */}
        <label htmlFor='phoneNo' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Phone Number</p>
            <div className='flex flex-row gap-x-6'>

                <select {...register("countryCode", {required:true})}
                name='countryCode' id='countryCode' className='w-[60px] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '>
                    {
                        countryCodes.map((country, index) => (
                            <option key={index} value={country.code}>{country.code} - {country.country}</option>
                        ))
                    }
                </select>

                <input className='flex-1 text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='phoneNo'
                name='phoneNo'
                placeholder='123 456 7890'
                {...register("phoneNo", {required:true})}
                />
            </div>
        </label>

        {/* feedback textarea */}
        <label htmlFor='message' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Message</p>
            <textarea className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            id='message'
            name='message'
            cols={30}
            placeholder='Enter your message'
            {...register("message", {required:true})}>
            
            </textarea>
            {
                errors.message && (<span className='text-xs text-pink-500'>! Please Enter Message</span>)
            }
        </label>

        <button className='bg-yellow-50 rounded-md text-richblack-900 py-3'
        type='submit'>Send Message</button>

    </form>
  )
}

export default ContactUsForm