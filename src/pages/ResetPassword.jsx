import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import {BsArrowLeft} from "react-icons/bs"
import { resetPassword } from '../services/operations/authOperations';

const ResetPassword = () => {

    const [resetComplete, setResetComplete] = useState(false);

    const dispatch = useDispatch();

    const {token} = useParams();
    
    const {loading} = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        newPassword : "", confirmNewPassword : ""
    })

    const {newPassword, confirmNewPassword} = formData


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(newPassword, confirmNewPassword, token, setResetComplete))
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
                                        resetComplete ? ("Reset complete!") : ("Choose  new password")
                                    }
                                </h2>
                                <p className='text-[1.125rem] text-richblack-100'>
                                    {
                                        resetComplete ? ("All done! We have sent an email to ***********@gmail.com to confirm") : ("Almost done. Enter your new password and youre all set.")
                                    }
                                </p>
                            </div>
                            {
                                !resetComplete &&
                                <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
            
                                    <label htmlFor='newPassword' className='space-y-2'>
                                        <p className='text-richblack-5 text-[0.875rem] font-normal'>New Password <sup className='text-pink-200'>*</sup></p>
                                        <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                                        type='password'
                                        id='newPassword'
                                        name='newPassword'
                                        value={newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter Password'/>
                                    </label>

                                    <label htmlFor='confirmNewPassword' className='space-y-2'>
                                        <p className='text-richblack-5 text-[0.875rem] font-normal'>Confirm New Password <sup className='text-pink-200'>*</sup></p>
                                        <input className='w-[100%] text-richblack-200 bg-richblack-800 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                                        type='password'
                                        id='confirmNewPassword'
                                        name='confirmNewPassword'
                                        value={confirmNewPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter Password'/>
                                    </label>
                                
                                    <button type='submit'  className='bg-yellow-50 rounded-md text-richblack-900 py-3'>Reset Password</button>
                                
                                </form>
                            }

                            {
                                resetComplete &&
                                <button    className='w-[100%] text-center bg-yellow-50 rounded-md text-richblack-900 py-3'>
                                    <Link to={"/login"}>Return to login</Link>
                                </button>
                            }
                            <div className=' text-richblack-5 flex flex-row items-center gap-x-3'>
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

export default ResetPassword