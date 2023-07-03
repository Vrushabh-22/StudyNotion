import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillCaretDown} from "react-icons/ai"
import {VscSignOut, VscAccount} from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authOperations'


const ProfileDropDown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {profileImage} = useSelector((state) => state.profile)

  const [open, setOpen] = useState(false);



  return (
    <button onClick={() => setOpen((pre) => !pre)}
    className='relative flex flex-row items-center gap-x-2 text-richblack-300 '>
      <img className='w-[30px] h-[30px] rounded-full object-cover'  src={profileImage} alt='profileImg'/>
      <AiFillCaretDown />

      {
        open && 
        (<div  onClick={(e) => e.stopPropagation()} className='z-50 absolute top-[160%] -left-[140%] lg:top-[150%] lg:-left-[100%]  bg-richblack-800  rounded-lg overflow-hidden'>
          <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)} className='flex flex-row items-center gap-x-2 py-2 px-6 transition-all duration-200 hover:bg-richblack-700'>
            <VscAccount/>
              MyProfile
          </Link>
          <div  onClick={() => {
            dispatch(logout(navigate)) 
            setOpen(false)}} 
            className='flex flex-row items-center gap-x-2 py-3 px-6 transition-all duration-200 hover:bg-richblack-700'>
            <VscSignOut />
            LogOut
          </div>
        </div>)
      }
    </button>
  )
}

export default ProfileDropDown