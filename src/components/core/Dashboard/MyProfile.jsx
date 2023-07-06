import React from 'react'
import { useSelector } from 'react-redux'
import {FaEdit} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {

    const navigate = useNavigate();

    const {user} = useSelector((state) => state.profile)

    const {profileImage} = useSelector((state) => state.profile)
    
    
  return (
    <section>
        <div className='w-[90%] lg:w-[60%] mx-auto px-4 space-y-14'>

            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-[1.875rem] text-richblack-5 font-medium'>My Profile</h1>
                <button onClick={() => navigate("/dashboard/settings")} className='py-2 px-5 bg-yellow-50 rounded-lg flex flex-row items-center gap-x-3'>
                    <p>Edit</p>
                    <FaEdit/>
                </button>
            </div>

            <div className='space-y-12'>

                <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6' >
                    <div className='flex flex-col items-center lg:flex-row gap-x-6 gap-y-4 lg:gap-y-0'>
                        <img src={profileImage} alt='userImage' className='w-[70px] object-cover aspect-square rounded-full'/>
                        <div className='text-center lg:text-left'>
                            <p className='text-[1.125rem] font-semibold text-richblack-5 pb-1'>{user.firstName} {user.lastName}</p>
                            <p className='text-[0.875rem] text-richblack-300'>{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6 '>
                    <div className='space-y-8'>
                        <h1 className='text-richblack-5 text-[1.125rem] font-semibold '>About</h1>
                        <p className='text-[0.875rem] text-richblack-300'>{user?.profile?.about ?  `${user?.profile?.about}` : "Enter your bio"}</p>
                    </div>
                </div>

                <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6 space-y-8' >
                    
                    <h1 className='text-richblack-5 text-[1.125rem] font-semibold '>Personal Details</h1>
                    
                    <div className='grid lg:grid-cols-2 gap-5'>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">First Name</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user.firstName}</p>
                            </div>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">Last Name</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user.lastName}</p>
                            </div>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">Email</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user.email}</p>
                            </div>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">Phone Number</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user?.profile?.phoneNo ? `${user?.profile?.phoneNo}` : "Add Phone Number"}</p>
                            </div>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">Gender</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user?.profile?.gender ?  `${user?.profile?.gender}` : "Add Gender"}</p>
                            </div>

                            <div>
                                <p className="text-[0.875rem] text-richblack-5 pb-1">Date Of Birth</p>
                                <p className='text-[0.875rem] text-richblack-600'>{user?.profile?.dateOfBirth ? `${user?.profile?.dateOfBirth}` : "Add Date Of Birth"}</p>
                            </div>
                    
                    </div>
                        
                    
                </div>

            </div>
        </div>
        
    </section>
  )
}

export default MyProfile
