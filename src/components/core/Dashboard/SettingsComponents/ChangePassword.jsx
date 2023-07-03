import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { BiHide, BiShow} from "react-icons/bi"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changepassword } from '../../../../services/operations/profileOperations';

const ChangePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)

    const {reset, handleSubmit, register, formState: {isSubmitSuccessful} } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset (
                {
                    oldPassword: "",
                    newPassword: ""
                }
            )
        }
    }, [reset, isSubmitSuccessful]);

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false)


    const changepass = (data) => {
        console.log(data);
        dispatch(changepassword(data, token))
    }

  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6 space-y-6'>
        <h1 className='text-[1.125rem] font-semibold text-richblack-5'>Change Password</h1>
        <form onSubmit={handleSubmit(changepass)}  className='space-y-4'>
            <div  className='flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row gap-x-4 justify-between'>

                {/* password */}
                <label htmlFor='currentPassword' className='lg:w-[50%] space-y-2 relative '>
                    <p className='text-richblack-5 text-[0.875rem] font-normal'>Current Password</p>

                    <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                    type={`${showCurrentPass ? "text" : "password"}`}
                    id='currentPassword'
                    name='oldPassword'
                    placeholder='Enter Current Password'
                        {...register("oldPassword", {required:true})}
                    />

                    <span onClick={() => setShowCurrentPass((pre) => !pre)}
                    className='absolute  right-[5%] top-[46%] text-richblack-200  text-[1.2rem] cursor-pointer' >
                        {
                            showCurrentPass ? (<BiHide/>) : (<BiShow/>)
                        }
                    </span>

                </label>

                {/* confirm password */}
                <label htmlFor='newPassword' className='lg:w-[50%] space-y-2 relative'>
                    <p className='text-richblack-5 text-[0.875rem] font-normal'>New Password</p>
                    
                    <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                    type={`${showNewPass ? "text" : "password"}`}
                    id='newPassword'
                    name='newPassword'
                    placeholder='Enter New Password'
                        {...register("newPassword", {required:true})}
                    />
                    
                    <span onClick={() => setShowNewPass((pre) => !pre)}
                    className='absolute right-[5%] top-[46%] text-richblack-200  text-[1.2rem] cursor-pointer' >
                        {
                            showNewPass ? (<BiHide/>) : (<BiShow/>)
                        }
                    </span>
                </label>
            </div>
            <div className='flex flex-row items-center gap-x-6 pt-6'>
                <button className='text-richblack-200 bg-richblack-700 rounded-md py-2 px-6 font-medium transition-all duration-200 hover:scale-95' type='submit'>Save</button>
                <button onClick={() => navigate("/dashboard/my-profile")} className=' py-2 px-6 rounded-md font-medium transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900' type='button'>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword