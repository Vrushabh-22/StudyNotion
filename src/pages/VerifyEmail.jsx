import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader'
import {BsArrowLeft} from "react-icons/bs"
import {RxCountdownTimer} from "react-icons/rx"
import OTPInput from 'react-otp-input'
import { sendotp, signUp } from '../services/operations/authOperations'

const VerifyEmail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {signupData, loading} = useSelector((state) => state.auth)


    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({...signupData, otp}, navigate));
    }

    const handleResend = () => {
        setOtp("")
        dispatch(sendotp(signupData.email, navigate))
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
                                Verify email
                                </h2>
                                <p className='text-[1.125rem] text-richblack-100'>
                                A verification code has been sent to you. Enter the code below
                                </p>
                            </div>
                        
                            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-6 text-richblack-5'>
        
                                <OTPInput 
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} placeholder='0' 
                                    style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='w-[48px] text-center text-white bg-richblack-800 border-richblack-300 rounded-md mx-2 aspect-square  outline-none focus:outline-yellow-50' />}
                                />
                                
                            
                                <button type='submit'  className='w-[100%] bg-yellow-50 rounded-md text-richblack-900 py-3'>Verify Email</button>
                            
                            </form>
                            
                            <div className=' flex flex-row items-center justify-between'>
                                <div className='text-richblack-5 flex flex-row items-center gap-x-3'>
                                    <BsArrowLeft/>
                                    <Link to={"/login"}>
                                        Back to login
                                    </Link>
                                </div>
                                <button onClick={handleResend} className='text-blue-100 flex flex-row items-center gap-x-3'>
                                    <RxCountdownTimer/>
                                    <p>Resend otp</p>
                                </button>
                            </div>
                        </div>
                    ) 
                }
            </div>
        </div>
    </section>
  )
}

export default VerifyEmail