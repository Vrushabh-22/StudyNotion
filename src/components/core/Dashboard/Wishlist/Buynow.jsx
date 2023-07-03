import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {buyCourse} from "../../../../services/operations/paymentOperations.js"
import { useNavigate } from 'react-router-dom'
import {resetCart} from "../../../../redux/slices/cartSlice.js"

const Buynow = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalCost, cartItems} = useSelector((state) => state.cart)
    const courses = cartItems.map((course) => course._id)
    const userData = {
      name : `${user?.firstName} ${user?.lastName}`,
      email : user?.email
    }
    
    const handleBuy = async () => {
      if(token){
        buyCourse(courses, token, userData, navigate, dispatch)
      }
    }

  return (
    <div className='fixed bottom-0 left-0 lg:relative w-full h-fit mx-auto space-y-4 p-6 border-[0.5px] border-richblack-700 bg-richblack-800 rounded-lg'>
        <div className='flex flex-row items-center justify-between'>
          <p className='text-[1.5rem]  text-richblack-200 '>Total : </p>
          <p className='text-[1.5rem] text-yellow-50'>₹ {totalCost}</p>
        </div>
        <button onClick={handleBuy}
        className='w-full px-6 py-3 rounded-md bg-yellow-50 text-black'>Buy Now</button>
    </div>
  )
}

export default Buynow