import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import {sendresetpasstoken} from "../services/operations/authOperations"
import Loader from '../components/common/Loader';

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(sendresetpasstoken(email, setEmailSent))

    }


  return (
    <section className='min-h-[calc(100vh-4.125rem)] grid place-items-center'>
        <div className='container mx-auto '>
            <div className='w-[80%] lg:w-[40%] mx-auto grid place-items-center'>
                {
                    loading ? (
                        <Loader></Loader>
                    ) : (
                        <div className='w-[100%] space-y-6'>
                            <div>
                                <h2 className='text-[1.875rem] text-richblack-5 font-bold'>
                                    {
                                        emailSent ? ("Check Mail") : ("Reset your password") 
                                    }
                                </h2>
                                <p className='text-[1.125rem] text-richblack-100'>
                                    {
                                        emailSent ? (
                                            <>
                                                <span className='block'>We have sent the reset email to </span>
                                                <span>{email}</span>
                                            </>
                                            
                                        ) : (
                                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        )
                                    }
                                </p>
                            </div>
                            {
                                !emailSent && 
                                <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
                                
                                    <label htmlFor='email' className='space-y-2'>
                                        <p className='text-richblack-5 text-[0.875rem] font-normal'>Email Adress <sup className='text-pink-200'>*</sup></p>
                                        <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter email address'/>
                                    </label>

                                    <button type='submit' className='bg-yellow-50 rounded-md text-richblack-900 py-3'>Reset Password</button>
                                    
                                </form>
                            }
                            {
                                emailSent &&    <button type='button' onClick={() => setEmailSent(false)} className='w-[100%] bg-yellow-50 rounded-md text-richblack-900 py-3'>Resend Email</button>
                            }
                            <div className='text-richblack-5 flex flex-row items-center gap-x-3'>
                                <BsArrowLeft/>
                                <Link to={"/login"}>
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    ) 
                }
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword