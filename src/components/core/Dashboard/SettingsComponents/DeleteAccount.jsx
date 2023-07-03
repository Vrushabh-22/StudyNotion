import React from 'react'
import {BiTrash} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { accountDelete } from '../../../../services/operations/profileOperations'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../services/operations/authOperations'

const DeleteAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state) => state.auth)

    const handleClick = () => {
        dispatch(accountDelete(token, navigate))
        dispatch(logout())
    }

  return (
    <div className='bg-pink-900 border-[1px] border-pink-700 rounded-md p-6 space-y-6'>
        <div className='flex flex-row gap-x-6'>
            <div className='w-[70px] aspect-square grid place-items-center bg-pink-700 rounded-full text-pink-200 text-4xl self-start'>
                <BiTrash />
            </div>
            <div className='space-y-2'>
                <h2 className='text-[1.125rem] text-pink-5 font-bold'>Delete Account</h2>
                <div className='text-[0.875rem] text-pink-25 space-y-1'>
                    <p>Would you like to delete account?</p>
                    <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <button onClick={handleClick} className='text-pink-300 italic'>I want to delete my account.</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteAccount