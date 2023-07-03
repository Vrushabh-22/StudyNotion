import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillEdit, AiFillDelete} from "react-icons/ai"
import { FaClock, FaCheckCircle} from 'react-icons/fa'
import {IoMdAddCircleOutline} from "react-icons/io"
import { COURSE_STATUS } from '../../../utils/constants'
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseOperations'
import Loader from "../../common/Loader"
import { useNavigate } from 'react-router-dom'
import CustomModal from '../../common/CustomModal'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../utils/DateFormatter'


const MyCourses = () => {

    const navigate = useNavigate();
    const [courses, setCourse] = useState([])
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(null)


    const getCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      if(result){
        setCourse(result)
      }
      
      setLoading(false)
    } 
    useEffect(() => {
      getCourses()
    },[])

    const handleDeleteCourse = async (courseId) => {
      setModal(null)
      const result = await deleteCourse(courseId, token)
      if(result){
        getCourses()
      }
      
    }

  return (
    <section>
      <div className='w-[90%] h-full mx-auto px-4 space-y-14'>
        <div className='flex flex-row items-center justify-between'>
            <h1 className='text-[1.875rem] text-richblack-5 font-medium'>My Courses</h1>
            <button onClick={() => navigate("/dashboard/add-course")} className='py-2 px-4 bg-yellow-50 rounded-lg flex flex-row items-center gap-x-2'>
                <IoMdAddCircleOutline className='text-[1.125rem]'/>
                <p>New</p>
            </button>
        </div>

        {
          loading ? (<Loader />) : (
            <div>

          {
            courses.length === 0 ? (
              <p className='text-richblack-5 text-center border-b border-richblack-400 pb-2'>You have not created any course yet</p>
              ) : (

                <div className="rounded-md border border-richblack-400 text-richblack-100 overflow-hidden">
                  <Table  >
                    <Thead className="border-b  border-richblack-400">
                      <Tr>
                        <Th  className="text-start bg-richblack-700 p-4">Courses</Th>
                        <Th  className="text-start bg-richblack-700 p-4">Duration</Th>
                        <Th  className="text-start bg-richblack-700 p-4">Price</Th>
                        <Th  className="text-start bg-richblack-700 p-4">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                      {
                        courses.map((course) => (
                          <Tr key={course._id}  >
                            <Td className="p-4">
                              <div className='flex flex-row gap-x-5'>
                                <img src={course.thumbnail} alt='courseThumb' className='h-[150px] rounded-lg'/>
                                <div className='flex flex-col justify-evenly'>
                                  <h2 className='font-medium text-richblack-5 '>{course.courseName}</h2>
                                  <p className='text-richblack-300 font-normal'>{course.courseDescription.slice(0, 40)}</p>
                                  <p className='text-richblack-300 font-normal'>{formatDate(course.createdAt)}</p>
                                  <div className={`w-fit flex flex-row items-center gap-x-1 text-[0.75rem] bg-richblack-700 py-[2px] px-2 rounded-full ${course.status === COURSE_STATUS.PUBLISHED ? "text-yellow-100" : "text-pink-100"}`}>
                                    {
                                      course.status === COURSE_STATUS.PUBLISHED ? (
                                        <>
                                          <FaCheckCircle />
                                          Published
                                        </>
                                      ) : (
                                        <>
                                          <FaClock />
                                          Drafted
                                        </>
                                      ) 
                                    }
                                  </div>
                                </div>
                              </div>
                            </Td>
                            <Td className="p-4">{course?.totalDuration}</Td>
                            <Td className="p-4"><p className='text-[0.875rem] text-richblack-50 '>₹ {course.price}</p></Td>
                            <Td className="p-4">
                              <div className='self-start flex flex-row items-center gap-x-3 text-[0.875rem]  text-richblack-50'>
                                  <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}>
                                    <AiFillEdit />
                                  </button>
                                  <button onClick={() => setModal({
                                    text1: "Are You Sure?", 
                                    text2: "Course will be deleted", 
                                    textBtn1: "Delete", 
                                    textBtn2: "Cancel",
                                    handler1: () => handleDeleteCourse(course._id), 
                                    handler2: () => setModal(null), 

                                  })}>
                                    <AiFillDelete />
                                  </button>
                              </div>
                            </Td>
                          </Tr>
                        ))
                      }
                    </Tbody>
                  </Table>
                </div>
                
              ) 
          }

        </div>
          ) 
        }


      </div>

      {
        modal && <CustomModal {...modal}/>
      }
    </section>   
  )
}

export default MyCourses