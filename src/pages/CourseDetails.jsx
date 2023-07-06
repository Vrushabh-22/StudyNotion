import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/paymentOperations'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/courseOperations'
import GetAvgRating from '../utils/avgRating'
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../utils/DateFormatter'
import {AiOutlineInfoCircle , AiOutlineDown} from "react-icons/ai"
import {BsGlobe , BsCameraVideo} from "react-icons/bs"
import {FaShareSquare} from "react-icons/fa"
import Footer from '../components/common/Footer'
import {addTocart} from "../redux/slices/cartSlice.js"
import Loader from '../components/common/Loader'
import CustomModal from "../components/common/CustomModal"
import { toast } from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import {ACCOUNT_TYPE} from "../utils/constants"
import ReviewSlider from "../components/common/ReviewSlider"
const CourseDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(null)


    const userData = {
        name : `${user?.firstName} ${user?.lastName}`,
        email : user?.email
    }


    useEffect(() => {
      const fetchCourseData = async () => {
        setLoading(true)
        const result = await getCourseDetails(courseId)
        setCourseData(result.course)
        setTotalDuration(result.totalDuration)
        setLoading(false)
      } 

      fetchCourseData();
    }, [courseId])


    

    useEffect(()=> {
        const count = GetAvgRating(courseData?.ratingAndReviews)
        setAvgReviewCount(count);
    },[courseData]);


    useEffect(() => {
      let lectures = 0;
      courseData?.courseContent?.forEach((section) => lectures += section?.subSections?.length || 0)
      setTotalLectures(lectures)
    }, [courseData])

    const handleBuy = () => {
        if(token){
          buyCourse( [courseId], token, userData, navigate, dispatch)
        }else{
          setModal({
            text1:"You Are Not Logged In",
            text2:"Please Login to purchase course",
            textBtn1:"Login",
            textBtn2:"Cancel",
            handler1:() => navigate("/login"),
            handler2:() => setModal(null)
          })
        }
    }

    const handleCart = () => {
      if(user && user.role === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an instructor");
        return;
      }
      if(token) {
        courseData.avgRating = avgReviewCount
        dispatch(addTocart(courseData))
      }
    }

    const handleShare = () => {
      copy(window.location.href)
      toast.success("Link copied to clipboard")
    }


  return (
    <section  >
        {
          loading ? (<div className="min-h-[calc(100vh-4.125rem)] grid place-items-center"><Loader/></div>) : (
            <div className='space-y-12'>
              {/* header */}
              <div className='bg-richblack-800 py-8'>

                <div className='constainer mx-auto'>
                    <div className=' relative w-[90%] lg:w-[80%] mx-auto grid lg:grid-cols-[1fr_0.5fr]'>
                      
                      <div className='hidden lg:block space-y-3 pr-5 border-r-[0.5px] border-richblack-400'>
                        <p className='text-richblack-300 text-[0.875rem]'>Home / Learning / <span className='text-yellow-50'>{courseData?.category?.name}</span></p>
                        <div>
                          <h2 className='text-richblack-5 text-[1.875rem] font-medium'>{courseData?.courseName}</h2>
                          <p className='text-richblack-200 text-[0.875rem]'>{courseData?.courseDescription}</p>
                        </div>
                        <div className='flex flex-row items-center gap-x-3'>
                          <p className='text-yellow-100'>{avgReviewCount || 0}</p>
                          <RatingStars Review_Count={avgReviewCount} Star_Size={16}></RatingStars>
                          <p className='text-richblack-25'>({courseData?.ratingAndReviews.length} Ratings)</p>
                          <p className='text-richblack-25'>{courseData?.studentsEnrolled?.length} Student(s) Enrolled</p>
                        </div>
                        <p className='text-richblack-25'>Created By {`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}</p>
                        <div className='flex flex-row items-center gap-x-6 text-richblack-25'>
                          <p className='flex flex-row items-center gap-x-2'><AiOutlineInfoCircle/> Created At : {formatDate(courseData?.createdAt)}</p>
                          <p className='flex flex-row items-center gap-x-2'><BsGlobe className='text-[0.875rem]'/> English</p>
                        </div>
                      </div>

                      <div className='w-[100%] lg:w-[30%] lg:absolute right-0  rounded-lg bg-richblack-700 overflow-hidden'>
                        <img src={courseData?.thumbnail} alt='thumbanail' className=''/>
                        <div className='lg:hidden p-6 space-y-3 flex flex-col items-center border-b-[0.5px] border-richblack-400'>
                          <div className='text-center'>
                            <h2 className='text-richblack-5 text-[1.875rem] font-medium'>{courseData?.courseName}</h2>
                            <p className='text-richblack-200 text-[0.875rem]'>{courseData?.courseDescription}</p>
                          </div>
                          <div className='flex flex-row items-center gap-x-3'>
                            <p className='text-yellow-100'>{avgReviewCount || 0}</p>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={16}></RatingStars>
                            <p className='text-richblack-25'>({courseData?.ratingAndReviews.length} Ratings)</p>
                          </div>
                            <p className='text-richblack-25'>{courseData?.studentsEnrolled?.length} Student(s) Enrolled</p>
                          <p className='text-richblack-25'>Craeted By {`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}</p>
                          
                            <p className='flex flex-row items-center gap-x-2 text-richblack-5'><AiOutlineInfoCircle/> Craeted At : {formatDate(courseData?.createdAt)}</p>
                            <p className='flex flex-row items-center gap-x-2 text-richblack-5'><BsGlobe className='text-[0.875rem]'/> English</p>
                          
                        </div>
                        <div className='p-6 space-y-3'>
                          <p className='text-richblack-5 text-[1.875rem] font-semibold'>₹ {courseData?.price}</p>
                          <div className='flex flex-col gap-y-4'>
                            {
                              user?.role !== ACCOUNT_TYPE.INSTRUCTOR && 
                              <button onClick={user && courseData?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuy}
                                className='py-3 px-6 bg-yellow-50 rounded-md'>
                                { user && courseData?.studentsEnrolled.includes(user?._id) ? "Go To Courses" : "Buy Now"}
                              </button>
                            }
                            {
                              (!user || !courseData?.studentsEnrolled.includes(user?._id)) &&
                              <button onClick={handleCart}
                              className='py-3 px-6 bg-richblack-800 rounded-md text-richblack-5'>Add To Cart</button>
                            }
                          </div>
                          <p className='text-richblack-25 text-[0.875rem] text-center'>30-days Money-Back Guarantee</p>
                          <button onClick={handleShare}
                          className='text-yellow-100 py-3 px-6 w-full flex flex-row items-center gap-x-3 justify-center'>
                            Share
                            <FaShareSquare/>
                          </button>
                        </div>


                      </div>

                    </div>
                </div>

              </div>

              <div className='constainer mx-auto'>
                <div className='w-[90%] lg:w-[80%]  mx-auto  grid lg:grid-cols-[1fr_0.5fr] '>

                  <div className='space-y-12'>
                    {/* whatYouWillLearn */}
                    <div className='p-8 border-[0.5px] border-richblack-400  rounded-lg'>
                      <h2 className='text-richblack-5 text-[1.875rem] font-medium'>What You Will Learn</h2>
                      <p className='text-richblack-50 text-[0.875rem]'>{courseData?.whatYouWillLearn}</p>
                    </div>

                    {/* courseContent */}
                    <div className='space-y-6'>

                      <div>
                        <h2 className='text-richblack-5 text-[1.875rem] font-medium'>Course Content</h2>
                        <p className='text-richblack-50 text-[0.875rem]'>{courseData?.courseContent.length} Sections · {totalLectures} Lectures · {totalDuration} Total Length</p>
                      </div>

                      <div className='text-white border-[0.5px] border-richblack-400'>
                        {
                          courseData?.courseContent.map((section) => (
                            <details key={section._id} >

                              <summary className=' flex flex-row items-center justify-between py-4 px-8 bg-richblack-700 border-[0.5px] border-richblack-400'>
                                <div className='flex flex-row items-center gap-x-2'>
                                  <AiOutlineDown/>
                                  <p>{section?.sectionName}</p>
                                </div>
                                <div className='flex flex-row items-center gap-x-6'>
                                  <p className='text-yellow-50'>{section?.subSections?.length} Lecture(s)</p>
                                  <p>{totalDuration}</p>
                                </div>
                              </summary>

                              {
                                section?.subSections !== 0 &&
                                section?.subSections.map((subSection) => (
                                  <div key={subSection._id} className='px-8 py-4 flex flex-row items-center  gap-x-2'>
                                    <BsCameraVideo/>
                                    <p>{subSection?.title}</p>
                                  </div>
                                ))
                              }

                            </details>
                          ))
                        }
                      </div>

                    </div>
                    
                    {/* author */}
                    <div className='space-y-4 p-8 border-[0.5px] border-richblack-400 rounded-lg'>
                        <h2 className='text-richblack-5 text-[1.5rem] font-semibold'>Author</h2>
                        <div className='flex flex-row items-center gap-x-6'>
                          <img src={courseData?.instructor?.profileImage} alt='profileImage' className='w-[52px] aspect-square rounded-full'/>
                          <p className='text-richblack-5'>{`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}</p>
                        </div>
                          <p className='text-[0.875rem] font-normal text-richblack-50'>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</p>
                    </div>
                  </div>

                </div>
              </div>

              <ReviewSlider/>

            </div>
          ) 
        }
        <Footer/> 
        {
          modal && <CustomModal {...modal}/>
        }
        
    </section>
  )
}

export default CourseDetails
