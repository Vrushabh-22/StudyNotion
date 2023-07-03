import React from 'react'

import {SlBadge,SlDiamond} from "react-icons/sl"
import {FaGraduationCap, FaCode} from "react-icons/fa"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const TimelineSection = () => {

    const timeline = [
        {
            logo:<SlBadge/>,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            logo:<FaGraduationCap/>,
            heading:"Responsibility",
            description:"Students will always be our top priority"
        },
        {
            logo:<SlDiamond/>,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            logo:<FaCode/>,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        }
    ]

  return (
    <div className='w-[90%] lg:w-[80%] mx-auto space-y-12 lg:space-y-0 lg:flex flex-row items-center '>

        <div className='lg:w-[40%] space-y-16 relative'>
            {
                timeline.map( (item, index) => (
                    <div className='flex flex-row items-center gap-x-6' key={index}>
                        <div className='w-[52px] h-[52px] rounded-full bg-white shadow-md grid place-items-center text-caribbeangreen-500 text-[1.5rem] z-10'>
                            {item.logo}
                        </div>
                        <div>
                            <h3 className='font-semibold text-[1.125rem] text-richblack-800'>{item.heading}</h3>
                            <p className='font-normal text-[0.875rem] text-richblack-700'>{item.description}</p>
                        </div>
                    </div>
                ))
            }
            <div className='absolute left-[7.5%] lg:left-[6%] -top-[16%] w-1 h-full border-l border-dashed border-richblack-400'></div>
        </div>

        

        <div className='lg:w-[60%] relative'>
            <img src={timelineImage} alt="timelineImage" loading='lazy' className='w-full h-full' />

            <div className='absolute left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] p-10 bg-caribbeangreen-700 lg:grid grid-cols-2 '>
                <div className='flex felx-row justify-center items-center gap-x-6 border-b lg:border-b-0 lg:border-r border-richblack-300 uppercase'>
                    <h3 className='text-white font-bold text-[2rem]'>10</h3>
                    <div className='text-caribbeangreen-300 font-medium text-[0.875rem]'>
                        <p>Years</p>
                        <p>Experience</p>
                    </div>
                </div>
                <div className='flex felx-row  justify-center items-center gap-x-6 uppercase'>
                    <h3 className='text-white font-bold text-[2rem]'>250</h3>
                    <div className='text-caribbeangreen-300 font-medium text-[0.875rem]'>
                        <p>Types</p>
                        <p>Of Courses</p>
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default TimelineSection