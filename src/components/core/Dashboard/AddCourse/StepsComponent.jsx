import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInfoForm from './CourseInfo/CourseInfoForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'

const StepsComponent = () => {

    const states = [
        {
            id:1,
            title:"Course Info"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },

    ]

    const {step} = useSelector((state) => state.course)


  return (
    <div className='space-y-8 select-none '>
        <div className='grid grid-cols-3'>
            {
                states.map((item) => (
                    <div key={item.id} className='relative grid place-items-center gap-y-3'>
                        <div className={`z-10 w-[30px] aspect-square grid place-items-center rounded-full ${step === item.id ? "text-yellow-50 bg-yellow-900 border border-yellow-50" : "text-richblack-300 bg-richblack-800 border border-richblack-700"} ${step > item.id && "bg-yellow-50"}`}>
                            { step > item.id ? <FaCheck className=' text-black'/>  : item.id }
                        </div>
                        <p className={`text-center ${step === item.id || step > item.id ? "text-richblack-5" : "text-richblack-500"}`}>{item.title}</p>
                        {
                            item.id !== 3 && 
                            <div className={`absolute left-[50%] bottom-[75%] w-full h-[0.1px] border-dashed border-[1px] ${step > item.id ? "border-yellow-50" : "border-richblack-100 "}`}></div>
                        }
                    </div>
                ))
            }
        </div>
        
        {
            step === 1 && <CourseInfoForm/>
        }
        {
            step === 2 && <CourseBuilderForm/>
        }
        {
            step === 3 && <PublishCourse/>
        }

    </div>
  )
}

export default StepsComponent