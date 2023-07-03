import React from 'react'
import {HiUsers} from "react-icons/hi"
import {ImTree} from "react-icons/im"


const Card = ({course, active}) => {
  return (
    <div className={`border-richblack-200 ${active ? "shadow-[10px_10px_0px_rgb(255,232,61)]" : "" } ${active ? "bg-white" : "bg-richblack-800"} select-none`}>
        <div className='pt-8 pb-12 px-6 border-b border-dashed border-richblack-200'>
            <h2 className={`text-[1.25rem] ${active ?  "text-richblack-800" : "text-white"} font-semibold`}>{course.heading}</h2>
            <p className='text-[1rem] text-richblack-500 font-normal'>{course.description}</p>
        </div>
        <div className={`flex flex-row items-center justify-between py-4 px-6 ${active ? "text-blue-500" : "text-richblack-300" } `}>
            <div className=' flex flex-row items-center gap-x-2 font-medium '>
                <HiUsers />
                <p>{course.level}</p>
            </div>
            <div className=' flex flex-row items-center gap-x-2 font-medium '>
                <ImTree />
                <p>{course.lessionNumber}</p>
            </div>
        </div>
    </div>
  )
}

export default Card