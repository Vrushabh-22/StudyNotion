import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseFullDetails } from '../services/operations/courseOperations'
import { setCompletedLectures, setCourseData, setSectionData, setTotalLectures } from '../redux/slices/viewCourseSlice'
import ViewCourseSideBar from '../components/core/ViewCourse/ViewCourseSideBar'

const ViewCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)

    useEffect( () => {
        const setViewCourseData = async () => {
            const result = await getCourseFullDetails(courseId, token)
            dispatch(setCourseData(result.course))
            dispatch(setSectionData(result.course?.courseContent))
            dispatch(setCompletedLectures(result.completedVideos))
            let lectures = 0;
            result.course?.courseContent.forEach((section) => lectures += section.subSections.length)
            dispatch(setTotalLectures(lectures))
        }
        setViewCourseData();
    }, [])

  return (
    <section className='relative flex flex-row h-[calc(100vh-4.125rem)] '>
     
        <div className='lg:w-[20%]'>
          <ViewCourseSideBar  />
        </div>

        <div className='flex-1 p-6 overflow-y-scroll'>
          <Outlet/>
        </div>
    </section>
  )
}

export default ViewCourse