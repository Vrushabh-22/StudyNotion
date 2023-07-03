import React, { useState } from 'react'
import {  useForm } from 'react-hook-form'
import {IoAddCircleOutline} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import {FaArrowRight} from "react-icons/fa"
import { setCourse, setEditCourse, setStep } from '../../../../../redux/slices/courseSlice'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseOperations'
import NestedView from './NestedView'


const CourseBuilderForm = () => {

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm()

    const handleEdit = (id, name) => {
        setEditId(id)
        setValue("sectionName", name)
    }

    const cancelEdit = () => {
        setEditId(null)
        setValue("sectionName", "")
    }

    const goBack = () => {
        dispatch(setEditCourse(true))
        dispatch(setStep(1))
    }
    const goNext = () => {
        if(course.courseContent.length === 0){
            toast.error("Add atleast one section")
            return
        }
        if(course.courseContent.some((section) => section.subSections.length === 0)){
            toast.error("Add atleast on subsection in each section")
            return
        }
        dispatch(setStep(3))
    }

    const onSubmit = async (data) => {

        setLoading(true)
        let result;

        if(editId){
            const formData = new FormData()
            formData.append("courseId", course._id)
            formData.append("sectionId", editId)
            formData.append("sectionName", data.sectionName)
            
            result = await dispatch(updateSection(formData, token))
        }else{
            const formData = new FormData();
            formData.append("courseId", course._id)
            formData.append("sectionName", data.sectionName)

            result = await dispatch(createSection(formData, token))
        }

        if(result){
            dispatch(setCourse(result))
            setEditId(null)
            setValue("sectionName", "" )
        }

        setLoading(false)
    }

  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 p-6 rounded-lg grid space-y-6'>
        <h2 className='text-[1.5rem] text-richblack-5 font-semibold'>Course Builder</h2>
        {/* section form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* courseName */}
            <label htmlFor='sectionName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Section Name <sup className='text-pink-200'>*</sup></p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='sectionName'
                name='sectionName'
                placeholder='Add a section'
                {...register("sectionName", {required:true})}
                />
                {
                errors.sectionName && (<span className='text-xs text-pink-500'>! Please Enter Section Name</span>)
                }
            </label>

            <div className='flex flex-row gap-x-6 items-end' >
                <button type='submit' className='flex flex-row items-center gap-x-2 text-yellow-50 border border-yellow-50 rounded-lg py-2 px-6'>
                    <IoAddCircleOutline className='text=[1.125rem]'/>
                    <span>{editId ? "Edit Section Name" : "Create Section"}</span>
                </button>
                {
                    editId && <button onClick={cancelEdit} type='button' className='text-richblack-200 underline'>Cancel Edit</button>
                }
            </div>
        </form>

        {/* nested view */}
        {
            course.courseContent.length > 0 &&
            <NestedView handleEdit={handleEdit}/>
        }
            
        {/*  back and next buttons */}
        <div className='place-self-end flex flex-row items-center gap-x-4 '>
            <button disabled={loading} onClick={goBack}
            className='bg-richblack-200 py-2 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                Back
            </button>
            <button disabled={loading} onClick={goNext} className='flex flex-row items-center gap-x-3 bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                Next
                <FaArrowRight />
            </button>
        </div>
    </div>
  )
}

export default CourseBuilderForm