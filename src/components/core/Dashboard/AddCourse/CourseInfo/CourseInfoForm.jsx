import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import CourseThumbnail from './CourseThumbnail';
import ChipInput from './ChipInput';
import InstructionsField from './InstructionsField';
import { createCourse, editCourseDetails, getAllCategories } from '../../../../../services/operations/courseOperations';
import { useDispatch, useSelector } from 'react-redux';
import {COURSE_STATUS} from "../../../../../utils/constants"
import { setStep ,setCourse } from '../../../../../redux/slices/courseSlice';
import { toast } from 'react-hot-toast';
import {FaArrowRight} from "react-icons/fa"




const CourseInfoForm = () => {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, setValue, getValues, reset,  formState : {errors}} = useForm();

    const {course, editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    
    useEffect(()=> {
        async function getCategories () {
            const resp = await getAllCategories()
            if(resp.length > 0 ){
                setCategories(resp) 
            }
        }
        if(editCourse){
            setValue("courseName", course.courseName)
            setValue("tags", course.tags)
            setValue("price", course.price)
            setValue("courseDescription", course.courseDescription)
            setValue("instructions", course.instructions)
            setValue("thumbnail", course.thumbnail)
            setValue("whatYouWillLearn", course.whatYouWillLearn)
            setValue("category", course.category._id)

        }
        getCategories(); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const isFormUpdated = () => {

        const currentValues = getValues()

        if( 
            currentValues.courseName !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.tags.toString() !== course.tags.toString() ||
            currentValues.instructions.toString() !== course.instructions.toString() ||
            currentValues.thumbnail !== course.thumbnail ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.category !== course.category._id
        ){
            return true
        }else{
            return false
        }
    }

    const onSubmit = async (data) => {
        
        if(editCourse){
            
            if(isFormUpdated()){

                const currentValues = getValues();


                const formData = new FormData()

                formData.append("courseId" , course._id)

                if(currentValues.courseName !== course.courseName){
                    formData.append("courseName", data.courseName)
                }
                if(currentValues.courseDescription !== course.courseDescription){
                    formData.append("courseDescription", data.courseDescription)
                }
                if(currentValues.price !== course.price){
                    formData.append("price", data.price)
                }
                if(currentValues.category !== course.category._id){
                    formData.append("category", data.category)
                }
                if(currentValues.tags.toString() !== course.tags.toString()){
                    formData.append("tags", JSON.stringify(data.tags))
                }
                if(currentValues.thumbnail !== course.thumbnail){
                    formData.append("thumbnail", data.thumbnail)
                }
                if(currentValues.whatYouWillLearn !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.whatYouWillLearn)
                }
                if(currentValues.instructions.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.instructions))
                }
                setLoading(true)
                const result = await editCourseDetails(formData, token)
                
                if(result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
                setLoading(false)

            }else{
                toast.error("No Changes Found")
                return
            }
        }else{
            const formData = new FormData();
        
            formData.append("courseName", data.courseName)
            formData.append("courseDescription", data.courseDescription)
            formData.append("price", data.price)
            formData.append("category", data.category)
            formData.append("tags", JSON.stringify(data.tags))
            formData.append("thumbnail", data.thumbnail)
            formData.append("whatYouWillLearn", data.whatYouWillLearn)
            formData.append("instructions", JSON.stringify(data.instructions))
            formData.append("status", COURSE_STATUS.DRAFT)

            setLoading(true)
            const result = await dispatch(createCourse(formData, token))
            if(result){
                dispatch(setStep(2))
                dispatch(setCourse(result))
            }
            setLoading(false)
        }
        
    }
    

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className='bg-richblack-800 border-[1px] border-richblack-700 p-6 rounded-lg grid space-y-6'>

        {/* courseName */}
        <label htmlFor='courseName' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Course Title <sup className='text-pink-200'>*</sup></p>
            <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type='text'
            id='courseName'
            name='courseName'
            placeholder='Enter Course Name'
            {...register("courseName", {required:true})}
            />
            {
            errors.courseName && (<span className='text-xs text-pink-500'>! Please Enter Course Title</span>)
            }
        </label>

        {/* courseDescription */}
        <label htmlFor='courseDescription' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Course Short Description <sup className='text-pink-200'>*</sup></p>
            <textarea className='w-[100%] h-[130px] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            id='courseDescription'
            name='courseDescription'
            placeholder='Enter Short Course Description'
            {...register("courseDescription", {required:true})}>
            </textarea>
            {
                errors.courseDescription && (<span className='text-xs text-pink-500'>! Please Enter Short Course Description</span>)
            }
        </label>

        {/* price */}
        <label htmlFor='price' className='relative space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Course Price <sup className='text-pink-200'>*</sup></p>
            <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md py-3 px-12 appearance-none outline-none '
            type='number'
            id='price'
            name='price'
            placeholder='Enter Course Price'
            {...register("price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            />
            {
            errors.price && (<span className='text-xs text-pink-500'>! Please Enter Course Price</span>)
            }
            <HiOutlineCurrencyRupee className={`absolute left-[2%]  text-richblack-500 text-[1.5rem] ${errors.price ? "top-[33%]" : "top-[42%]"}`}/>
        </label>

        {/* category */}
        <label htmlFor='category' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Category <sup className='text-pink-200'>*</sup></p>

                <select name='category' id='category' defaultValue=""
                 {...register("category", { required: true })}   className='form-style w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '>
                    <option value="" disabled>Choose a Category</option>
                    {
                        
                        categories?.map((item, index) => (
                            <option key={index} value={item?._id} selected={item?._id === course?.category?._id}>
                                {item?.name}
                            </option>
                        ))
                    }
                </select>

                {
                errors.category && (<span className='text-xs text-pink-500'>! Category is required</span>)
                }
            
        </label>

        {/* tags */}
        <ChipInput setValue={setValue} getValues={getValues} register={register} errors={errors}/>

        {/* course thumbnail */}
        <label htmlFor='thumbnail' className='relative space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Course Thumbnail <sup className='text-pink-200'>*</sup></p>
            <CourseThumbnail register={register} setValue={setValue} errors={errors} getValues={getValues}/>
        </label>

        {/* whatYouWillLearn */}
        <label htmlFor='whatYouWillLearn' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Benefits of the course <sup className='text-pink-200'>*</sup></p>
            <textarea className='w-[100%] h-[130px] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            id='whatYouWillLearn'
            name='whatYouWillLearn'
            placeholder='Enter Benefits of the course'
            {...register("whatYouWillLearn", {required:true})}>
            </textarea>
            {
                errors.courseDescription && (<span className='text-xs text-pink-500'>! Please Enter Short Course Description</span>)
            }
        </label>

        {/* instructions */}
        <InstructionsField setValue={setValue} getValues={getValues} register={register} errors={errors}/>

            <div className='place-self-end flex flex-row items-center gap-x-4 pt-4'> 
                <button disabled={loading} className='bg-richblack-200 py-2 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-95'
                type='button' onClick={() => dispatch(setStep(2))}>
                    Continue Without Saving
                </button>
                <button disabled={loading} className='flex flex-row items-center gap-x-3 bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'
                type='submit'>
                    {
                        editCourse ? "Save Changes" : "Next"
                    }
                    <FaArrowRight />
                </button>
            </div>
    </form>
  )
}

export default CourseInfoForm