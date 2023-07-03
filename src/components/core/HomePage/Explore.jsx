import React, { useState } from 'react'

import HomePageExplore from "../../../data/homepage-explore"
import Card from "../HomePage/Card"

const Explore = () => {

    const tags = HomePageExplore.map((item) => item.tag)

    const [currentTag, setCurrentTag] = useState(tags[0]);

    const [courses, setCourses] = useState(HomePageExplore[0].courses)

    const[currentCourse, setCurrentCourse] = useState(HomePageExplore[0].courses[0].heading)


    const handleTag = (tag) => {
        setCurrentTag(tag)
        const filterData = HomePageExplore.filter((obj) => {
            return obj.tag === tag
        })
        setCourses(filterData[0].courses)
        setCurrentCourse(filterData[0].courses[0].heading)
    }

   


  return (
    <>
        <div className='hidden bg-richblack-700 py-1 px-1 rounded-full text-richblack-50 lg:flex flex-row'>
            {
                tags.map((tag, index) => (
                    <div key={index} onClick={() => handleTag(tag)}  className={`cursor-pointer py-2 px-6 rounded-full ${currentTag === tag ? "bg-richblack-900" : ""}`}>{tag}</div>
                ))
            }
        </div>
        <div className=' w-[80%] mx-auto space-y-6 lg:space-y-0 lg:grid grid-cols-3  gap-x-8 z-40'>
            {
                courses.map((course, index) => (
                    <div key={index} onClick={() => setCurrentCourse(course?.heading)} className='cursor-pointer' >
                        <Card  course={course} active={currentCourse === course.heading ? true : false} key={index}/>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default Explore