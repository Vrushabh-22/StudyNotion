import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StepsComponent from './AddCourse/StepsComponent';
import { getCourseDetails } from '../../../services/operations/courseOperations';
import { setCourse , setEditCourse} from '../../../redux/slices/courseSlice';
import Loader from '../../common/Loader';


const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true)
            const result = await getCourseDetails(courseId)
            if(result){
                dispatch(setCourse(result.course))
                dispatch(setEditCourse(true))
            }
            setLoading(false)
        }

        fetchCourseDetails();
    }, [])

    
  return (
    <section>
        <div className='w-[90%] mx-auto px-4 space-y-14'>
            <h1 className=' text-[1.875rem] text-richblack-5 font-medium'>Edit Course</h1>
            <div className='lg:w-[60%] mx-auto'>
                {   loading ?  (<Loader/>) :
                    course ? (<StepsComponent/>) : (<p className='text-richblack-5 text-center'>No Course Found</p>)
                }
            </div>
        </div>
    </section>        
  )
}

export default EditCourse