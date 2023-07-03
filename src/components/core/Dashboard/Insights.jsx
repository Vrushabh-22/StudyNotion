import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorDashboardData } from '../../../services/operations/profileOperations'
import Loader from '../../common/Loader'
import { useNavigate } from 'react-router-dom'
import {IoMdAddCircleOutline} from "react-icons/io"
import InstructorChart from './InstructorChart'

const Insights = () => {

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)
            const result = await getInstructorDashboardData(token)
            setData(result)
            console.log(result)
            setLoading(false)
        }
        fetchDashboardData();
    }, [])

    let totalAmount
    let totalStudents

    if(data){
        totalAmount = data?.reduce((acc, curr) => acc + curr.totalAmount, 0)
        totalStudents = data?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)
    }
        
    


  return (
    <section >
      <div className='w-[90%] mx-auto px-4 space-y-14'>
        <div>
            <h1 className='text-[1.875rem] text-richblack-5 font-medium'>Hey {user?.firstName} 👋</h1>
            <p className='text-richblack-500'>Let's start something new</p>
        </div>

        {
            loading ? (
                <Loader/>
            ) : (
                <>
                    {
                        data?.length === 0 ? (
                        <div className=' grid place-items-center gap-y-4'>
                            <p className='text-richblack-5'>You Have Not Created Any Course</p>
                            <button className='py-2 px-4 bg-yellow-50 rounded-lg flex flex-row items-center gap-x-2 text-richblack-900'
                            onClick={() => navigate("/dashboard/add-course")}
                            >Create Course
                            <IoMdAddCircleOutline className='text-[1.125rem]'/>
                            </button>
                        </div>
                        ) : (
                            <div className='lg:grid grid-cols-[1fr_0.5fr] gap-6 space-y-6 lg:space-y-0'>
                                <div >
                                    <InstructorChart data={data}/>
                                </div>
                                <div className='bg-richblack-800 p-6 rounded-lg h-full'>
                                    <h2 className='text-richblack-5 font-semibold text-[1.125rem] pb-2'>Statistics</h2>
                                    <div>
                                        <p className='text-richblack-500 text-[1.125rem] font-medium'>Total Courses</p>
                                        <p className='text-[1.5rem] text-richblack-5 font-semibold'>{data?.length}</p>
                                    </div>
                                    <div>
                                        <p className='text-richblack-500'>Total Students</p>
                                        <p className='text-[1.5rem] text-richblack-5 font-semibold'>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className='text-richblack-500'>Total Income</p>
                                        <p className='text-[1.5rem] text-richblack-5 font-semibold'>Rs. {totalAmount}</p>
                                    </div>
                                </div>
                                <div className='col-span-2  bg-richblack-800 p-6 rounded-lg space-y-6'>
                                    <div className='flex flex-row items-center justify-between'>
                                        <h2 className='text-richblack-5 font-semibold text-[1.125rem]'>Your Courses</h2>
                                        <button className='text-yellow-200' onClick={() => navigate("/dashboard/my-courses")}>View All</button>
                                    </div>
                                    <div className=' grid grid-cols-1  lg:grid-cols-3 gap-6 '>
                                        {
                                            data?.slice(0, 3).map((course) => (
                                                <div key={course._id} className='rounded-lg overflow-hidden bg-richblack-700'>
                                                    <img src={course?.thumbnail} alt='thumbnail' />
                                                    <div className='py-4 px-2'>
                                                        <p className='text-richblack-5'>{course?.courseName}</p>
                                                        <div className='text-richblack-400 '>
                                                            <span>{course?.totalStudentsEnrolled} Students</span>
                                                            <span> | </span>
                                                            <span>Rs. {course?.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                </>
            )
        }

       
      </div>
    </section>  
  )
}

export default Insights