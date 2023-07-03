import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {CiMenuKebab} from "react-icons/ci"
import ProgressBar from "@ramonak/react-progress-bar";
import { getEnrolledCourses } from '../../../services/operations/profileOperations';
import Loader from '../../common/Loader';
import { setLoading } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const EnrolledCourses = () => {

  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true)
      const result = await getEnrolledCourses(token);
      if(result){
        setEnrolledCourses(result)
        setLoading(false)
      }
      
    }

    fetchEnrolledCourses();
  }, [])


  return (
    <section >
      <div className='w-[90%] mx-auto px-4 space-y-14'>
        <h1 className='text-[1.875rem] text-richblack-5 font-medium'>Enrolled Courses</h1>

        {
          loading ? (<Loader/>) : (
            <div>

              {
                enrolledCourses?.length === 0 ? (
                  <p>You have not enrolled in any course yet</p>
                  ) : (
                    <div className='select-none rounded-md border-[0.5px] border-richblack-300 overflow-hidden'>
                      <div className="rounded-md border border-richblack-400 text-richblack-100 overflow-hidden">
                        <Table  >
                          <Thead className="border-b  border-richblack-400">
                            <Tr>
                              <Th  className="text-start bg-richblack-700 p-4">Courses</Th>
                              <Th  className="text-start bg-richblack-700 p-4">Duration</Th>
                              <Th  className="text-start bg-richblack-700 p-4">Progress</Th>
                              <Th  className="text-start bg-richblack-700 p-4">Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody >
                            {
                              enrolledCourses?.map((course) => (
                                <Tr key={course._id}  >
                                  <Td className="p-4">
                                    <div onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent[0]._id}/subSection/${course.courseContent[0].subSections[0]._id}`)} className='flex flex-row gap-x-5'>
                                      <img src={course.thumbnail} alt='courseThumb' className='w-[50px] aspect-square rounded-md'/>
                                      <div>
                                        <h2 className='font-medium text-richblack-5 '>{course.courseName}</h2>
                                        <p className='text-richblack-300 font-normal'>{course.courseDescription.slice(0, 40)}</p>
                                      </div>
                                    </div>
                                  </Td>
                                  <Td className="p-4">{course?.totalDuration}</Td>
                                  <Td className="p-4">
                                    <p className='text-[0.75rem] text-richblack-50 pb-1'>Progress {course?.progressPercentage}%</p>
                                    <ProgressBar completed={course?.progressPercentage} height='8px' width='90%' bgColor='#47A5C5' baseBgColor='#2C333F' isLabelVisible={false} />
                                  </Td>
                                  <Td className="p-4">
                                    <CiMenuKebab fill='#999DAA' />
                                  </Td>
                                </Tr>
                              ))
                            }
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                  ) 
              } 

            </div>
          )
        }

      </div>
    </section>    
  )
}

export default EnrolledCourses