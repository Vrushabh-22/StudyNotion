import React, { useEffect } from 'react'
import {FaArrowRight} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { resetCourseState, setCourse, setStep } from '../../../../redux/slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useForm } from 'react-hook-form';
import { editCourseDetails } from '../../../../services/operations/courseOperations';



const PublishCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)

    const {register, handleSubmit, setValue, getValues} = useForm();

    useEffect(() => {
        if(course.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[])

    const onSubmit = async (data) => {



        if((course.status === COURSE_STATUS.PUBLISHED  && getValues("public") === true)
            || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ){
            goNext()
            return
        }

        const formData = new FormData();

        formData.append("courseId", course._id)
        const status = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", status)
        const result = await editCourseDetails(formData, token) 
        
        if(result){
            goNext();
        }
    }


    const goBack = () => {
        dispatch(setStep(2))
    }

    const goNext = () => {
        navigate("/dashboard/my-courses")
        dispatch(resetCourseState())
    }

  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 p-6 rounded-lg  space-y-6'>
        <h2 className='text-[1.5rem] text-richblack-5 font-semibold'>Publish Course</h2>
        <form  onSubmit={handleSubmit(onSubmit)} className='grid space-y-6 '>
            <label htmlFor='public' className='flex flex-row items-center gap-x-3'>
                <input type='checkbox' id='public' name='public' {...register("public")} />
                <p className='text-richblack-400'>Make this course public</p>
            </label>

            <div className='place-self-end flex flex-row items-center gap-x-4 '>
                <button onClick={goBack} type='button'
                className='bg-richblack-200 py-2 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                    Back
                </button>
                <button type='submit'  className='flex flex-row items-center gap-x-3 bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                    Save
                    <FaArrowRight />
                </button>
        </div>
        </form>
    </div>
  )
}

export default PublishCourse