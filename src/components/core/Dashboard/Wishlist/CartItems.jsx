import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {BsStarFill} from "react-icons/bs"
import {BiTrash} from "react-icons/bi"
import Buynow from './Buynow';
import {removeFromCart } from '../../../../redux/slices/cartSlice';


const CartItems = () => {

    const dispatch = useDispatch();

    const {cartItems} = useSelector((state) => state.cart)


  return (
    <>
        {   
            cartItems.length <= 0 ? (
            <div className='text-center text-[1.125rem] font-medium tracking-wider'>No items in wishlist</div>
        ) : (
            <div className='grid lg:grid-cols-[1fr_0.5fr] gap-x-12'>
                <div>
                {
                    cartItems.map((course, index) => (
                        <div key={course._id} className='lg:flex flex-row gap-x-4 space-y-4 lg:space-y-0 border-b-[0.5px] border-richblack-400 py-4'>
                            <div className='lg:flex flex-row gap-x-3 space-y-4 lg:space-y-0'>
                                <img src={course.thumbnail} alt='courseThumb' className='lg:h-[150px]  rounded-lg'/>
                                <div className='flex flex-col justify-between'>
                                    <h2 className='text-richblack-5 text-[1.125rem] font-medium'>{course.courseName}</h2>
                                    <p className='text-richblack-300'>{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</p>
                                    <div className='flex flex-row items-center gap-x-3 text-yellow-100'>
                                        <p>{course?.avgRating || 0} </p>
                                        <ReactStars count={5} value={course?.avgRating} edit={false} activeColor={"#E7C009"} emptyIcon={<BsStarFill />} filledIcon={<BsStarFill />}/>
                                        <p className='text-richblack-400'>{course.ratingAndReviews.length} Reviews</p>
                                    </div>
                                    <p className='text-richblack-300 text-[0.875rem]'>Total Courses · Lessons · Beginner</p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse lg:flex-col gap-y-5 items-center justify-between lg:justify-start lg:items-start'>
                                <button className='p-3 rounded-md flex flex-row items-center gap-x-3 text-pink-200 bg-richblack-800'
                                onClick={() => dispatch(removeFromCart(course._id))}>
                                    <BiTrash />
                                    Remove
                                </button>
                                <p className='text-yellow-50 text-[1.5rem]'>₹ {course.price}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
                <Buynow/>
            </div>  
        ) 
        }

    </>
  )
}

export default CartItems