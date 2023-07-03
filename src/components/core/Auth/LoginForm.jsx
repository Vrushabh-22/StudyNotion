import React, { useState } from 'react'
import {BiShow, BiHide} from "react-icons/bi"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authOperations';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email : "", password : ""
    });

    const [showPass, setShowPass] = useState(false);


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value}) 
    }   



    //navigate ani dispatch ghen ahe
    //form data desruct karn ahe


    //onSubmit function banavn ahe -> 1. prevent default 2. dispatch login -> login madhi lagnara dat jo form destruct karu kadhla ani navigate

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData, navigate))
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
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
            placeholder='Enter email address'/>
        </label>

        {/* password */}
        <label className='space-y-2 relative'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Password <sup className='text-pink-200'>*</sup></p>
            <div>
            <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type={`${showPass ? "text" : "password"}`}
            id='password'
            name='password'
            value={formData.password}
            onChange={handleOnChange}
            required
            placeholder='Enter Password'/>
            </div>
            <span onClick={() => setShowPass((pre) => !pre)}
            className='absolute right-[5%] top-[36%] text-richblack-200  text-[1.2rem] cursor-pointer' >
                {
                    showPass ? (<BiHide/>) : (<BiShow/>)
                }
            </span>
            <div className='text-[0.75rem] text-blue-100 flex justify-end'>
                <Link to={"/forgot-Password"}>Forgot Password</Link>
            </div>
        </label>
        <button className='bg-yellow-50 rounded-md text-richblack-900 py-3'
        type='submit'>Sign In</button>
    </form>
  )
}

export default LoginForm