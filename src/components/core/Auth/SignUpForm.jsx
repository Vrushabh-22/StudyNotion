import React, { useState }  from 'react'
import {BiShow, BiHide} from "react-icons/bi"
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendotp } from '../../../services/operations/authOperations';
import { setSignupData } from '../../../redux/slices/authSlice';

const SignUpForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName : "", lastName : "", email : "", password : "", confirmPassword: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [role, setRole] = useState(ACCOUNT_TYPE.STUDENT);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value}) 
    }

    const {password, confirmPassword} = formData

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {...formData, role}

        dispatch(setSignupData(signupData))

        dispatch(sendotp(formData.email, navigate))

        setFormData({
            firstName : "", lastName : "", email : "", password : "", confirmPassword: "",
        });
        setRole(ACCOUNT_TYPE.STUDENT);
    }

  return (
    

    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>

        {/* role div */}
        <div className='bg-richblack-700 py-1 px-1 rounded-full text-richblack-50 flex flex-row items-center w-fit'> 
            <div onClick={() => setRole("Student")}
            className={`cursor-pointer py-2 px-6 rounded-full ${role === ACCOUNT_TYPE.STUDENT ?  "bg-richblack-900" : ""}`}>Student</div>
            <div onClick={() => setRole("Instructor")}
            className={`cursor-pointer py-2 px-6 rounded-full ${role === ACCOUNT_TYPE.INSTRUCTOR ?  "bg-richblack-900" : ""}`}>Instructor</div>
        </div>

        {/* first name last name div */}
        <div className='flex flex-row gap-x-4 justify-between'>

            {/* firstname */}
            <label htmlFor='firstName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>First Name <sup className='text-pink-200'>*</sup></p>
                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleOnChange}
                required
                placeholder='Enter first Name'/>
            </label>

            {/* lastname */}
            <label htmlFor='lastName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Last Name <sup className='text-pink-200'>*</sup></p>
                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleOnChange}
                required
                placeholder='Enter last Name'/>
            </label>

        </div>  

        {/* email */}
        <label htmlFor='email' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Email Adress <sup className='text-pink-200'>*</sup></p>
            <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleOnChange}
            required
            placeholder='Enter email adress'/>
        </label>
        
        {/* password confirm password div */}
        <div className='flex flex-row gap-x-4 justify-between'>

            {/* password */}
            <label htmlFor='password' className='w-[50%] space-y-2 relative'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Create Password <sup className='text-pink-200'>*</sup></p>

                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type={`${showPass ? "text" : "password"}`}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleOnChange}
                required
                placeholder='Enter Password'/>
            
                <span onClick={() => setShowPass((pre) => !pre)}
                className='absolute right-[5%] top-[46%] text-richblack-200  text-[1.2rem] cursor-pointer' >
                    {
                        showPass ? (<BiHide/>) : (<BiShow/>)
                    }
                </span>

            </label>

            {/* confirm password */}
            <label htmlFor='confirmPassword' className='w-[50%] space-y-2 relative'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Confirm Password <sup className='text-pink-200'>*</sup></p>
                
                <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type={`${showConfirmPass ? "text" : "password"}`}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleOnChange}
                required
                placeholder='Enter Password'/>
                
                <span onClick={() => setShowConfirmPass((pre) => !pre)}
                className='absolute right-[5%] top-[46%] text-richblack-200  text-[1.2rem] cursor-pointer' >
                    {
                        showConfirmPass ? (<BiHide/>) : (<BiShow/>)
                    }
                </span>
            </label>
        </div>
        
        {/* submit button */}
        <button className='bg-yellow-50 rounded-md text-richblack-900 py-3'
        type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUpForm