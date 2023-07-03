import React, { useEffect, useState } from 'react'
import {RxCross2} from "react-icons/rx"
import { useForm } from 'react-hook-form'
import VideoUploader from './VideoUploader'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseOperations'
import { setCourse } from '../../../../../redux/slices/courseSlice'
import { toast } from 'react-hot-toast'
import {FaArrowRight} from "react-icons/fa"

const SubSectionModal = ({modalData, setModalData, add = false, view = false, edit = false}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)
    const {handleSubmit, register, setValue, getValues, formState: {errors}} = useForm();

    useEffect(() => {
        if(view || edit){
            setValue("title", modalData.title);
            setValue("description", modalData.description)
            setValue("video", modalData.videoUrl)
        }
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if(
            currentValues.title !== modalData.title ||
            currentValues.video !== modalData.videoUrl ||
            currentValues.description !== modalData.description
        ){
            return true;
        }else{
            return false
        }
    }

    const onSubmit = async (data) => {
        let result;
        setLoading(true)
        if(edit){

            if(isFormUpdated()){
                const currentValues = getValues()

                const formData = new FormData()
                formData.append("courseId", course._id)
                formData.append("sectionId", modalData.sectionId)
                formData.append("subSectionId", modalData._id)

                if(currentValues.title !== modalData.title){
                    formData.append("title", data.title)
                }
                if(currentValues.video !== modalData.videoUrl){
                    formData.append("title", data.videoUrl)
                }
                if(currentValues.description !== modalData.description){
                    formData.append("description", data.description)
                }

                result = await updateSubSection(formData, token);
                console.log(result)
                if(result){
                    dispatch(setCourse(result))
                    setModalData(null)
                }

            }else{
                toast.error("No changes found")
                return
            }
        }else{
                const formData = new FormData()
            formData.append("courseId", course._id)
            formData.append("sectionId", modalData)
            formData.append("video", data.video)
            formData.append("title", data.title)
            formData.append("description", data.description)

            result = await dispatch(createSubSection(formData, token))
            
            if(result){
                dispatch(setCourse(result))
                setModalData(null)
            }
        }

        setLoading(false)

    }
  return (
    <div className='z-[1000] fixed w-[100vw] min-h-[100vh] lg:py-20 left-0 top-0 grid place-items-center  bg-white/10 backdrop-filter backdrop-blur'>
        <div className='w-[90%] lg:w-[60%] rounded-lg border-[1px] border-richblack-600 overflow-hidden'>
            <div className='text-[1.125rem] font-semibold text-white bg-richblack-700 py-4 px-6 flex flex-row items-center justify-between '>
                <h2>{view && "View"}{edit && "Edit"}{add && "Add"} Lecture</h2>
                <button onClick={() => setModalData(null)}>
                    <RxCross2 />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='p-8 grid space-y-5 bg-richblack-800 '>
            
                <div className='grid lg:grid-cols-2 gap-x-4 gap-y-6 lg:gap-y-0'>
                    <label htmlFor='video' className=' space-y-2'>
                        <p className='text-richblack-5 text-[0.875rem] font-normal'>Lecture Video <sup className='text-pink-200'>*</sup></p>
                        <VideoUploader register={register} setValue={setValue} errors={errors} edit={edit} view={view} url={modalData?.videoUrl}/>
                    </label>
                    <div className='w-full grid space-y-6 place-self-start'>
                        <label htmlFor='title' className=' space-y-2'>
                            <p className='text-richblack-5 text-[0.875rem] font-normal'>Lecture Title <sup className='text-pink-200'>*</sup></p>
                            <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                            type='text'
                            id='title'
                            name='title'
                            placeholder='Enter Lecture Title'
                            {...register("title", {required:true})}
                            />
                            {
                            errors.title && (<span className='text-xs text-pink-500'>! Please Enter Lecture Title</span>)
                            }
                        </label>
                        {/* LectureDescription */}
                        <label htmlFor='description' className='space-y-2'>
                            <p className='text-richblack-5 text-[0.875rem] font-normal'>Lecture Description <sup className='text-pink-200'>*</sup></p>
                            <textarea className='w-[100%] h-[110px] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                            id='description'
                            name='description'
                            placeholder='Enter Lecture Description'
                            {...register("description", {required:true})}>
                            </textarea>
                            {
                                errors.description && (<span className='text-xs text-pink-500'>! Please Enter Lecture Description</span>)
                            }
                        </label>
                    </div>
                </div>

                {
                    !view && 
                    <button disabled={loading} className='place-self-end flex flex-row items-center gap-x-3 text-richblack-900 bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                        {edit ? "Save Changes" : "Save"}
                        <FaArrowRight />
                    </button>
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal