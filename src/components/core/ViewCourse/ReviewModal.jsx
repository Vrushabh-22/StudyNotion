import React, { useEffect } from 'react'
import {RxCross2} from "react-icons/rx"
import {BsStarFill} from "react-icons/bs"
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { createRating } from '../../../services/operations/courseOperations';

const ReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const {courseData} = useSelector((state) => state.viewCourse)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm();

    useEffect(() => {
        setValue("review", "")
        setValue("rating", 0)
    },[])

    const ratingChange = (newrating) => {
        setValue("rating", newrating )
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("rating", data?.rating)
        formData.append("review", data?.review)
        formData.append("courseId", courseData._id)
        await createRating(formData, token)
        setReviewModal(false)
    }

  return (
    <div className=' z-[1000] fixed w-[100vw] min-h-[100vh] lg:py-20 left-0 top-0 grid place-items-center  bg-white/10 backdrop-filter backdrop-blur'>
        <div className='w-[90%] lg:w-[60%] rounded-lg border-[1px] border-richblack-600 overflow-hidden'>
            <div className='text-[1.125rem] font-semibold text-white bg-richblack-700 py-4 px-6 flex flex-row items-center justify-between '>
                <h2>Add Review</h2>
                <button onClick={() => setReviewModal(null)}>
                    <RxCross2 />
                </button>
            </div>
            <div className='p-8 grid space-y-8 bg-richblack-800 '>
                <div className='w-fit mx-auto flex flex-row items-center gap-x-3 '>
                    <img src={user?.profileImage} alt='profileImg' className='w-[50px] aspect-square rounded-full'/>
                    <div className='text-richblack-25'>
                        <p className='font-semibold '>{`${user?.firstName} ${user?.lastName}`}</p>
                        <p>Posting Publically</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-y-6'>
                    
                    <ReactStars count={5} size={24}  activeColor="#FFF970" onChange={ratingChange} />
                    
                    <label htmlFor='review' className='space-y-2 w-full'>
                        <p className='text-richblack-5 text-[0.875rem] font-normal'>Add Your Experience <sup className='text-pink-200'>*</sup></p>
                        <textarea className='w-[100%] min-h-[130px] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                        id='review'
                        name='review'
                        cols={30}
                        placeholder='Add Your Experience'
                        {...register("review", {required:true})}>
                        
                        </textarea>
                        {
                            errors.review && (<span className='text-xs text-pink-500'>! Please Enter Review</span>)
                        }
                    </label>

                    <div className='lg:place-self-end space-x-6'>
                        <button onClick={() => setReviewModal(false)} type='button' className='bg-richblack-200 py-2 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-95'>Cancel</button>
                        <button type='submit' className='bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>Save</button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default ReviewModal