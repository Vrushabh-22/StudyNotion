import React, { useEffect, useState } from 'react'
import {FaLessThan} from "react-icons/fa"
import {AiOutlinePlus, AiOutlineDown, AiOutlineUp} from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReviewModal from './ReviewModal'

const ViewCourseSideBar = () => {

    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("")
    const [activeSubSection, setActiveSubSection] = useState("")
    const [reviewModal, setReviewModal] = useState(false)

    const {sectionId, subSectionId} = useParams();

    const {courseData, sectionData, completedLectures, totalLectures} = useSelector((state) => state.viewCourse)

    useEffect(() => {
        const setActiveFlags = () => {
            setActiveSection(sectionId);
            setActiveSubSection(subSectionId)
        }
        setActiveFlags();
    }, [sectionId, subSectionId])


  return (
    <div  className='hidden  lg:block min-h-[calc(100vh-4.125rem)] bg-richblack-800 border-r-[0.5px] border-richblack-700'>

       <div className='flex flex-row items-center justify-between  px-4 py-6  border-b-[0.5px] border-richblack-700 '>
            <button onClick={() => navigate("/dashboard/enrolled-courses")}  
            className='w-[30px] aspect-square rounded-full bg-richblack-700 text-richblack-50 grid place-items-center'>
                <FaLessThan/>
            </button>
            <button onClick={() => setReviewModal(true)}
            className='bg-yellow-50 px-3 py-2 rounded-md flex flex-row items-center gap-x-2'>
                Add Review
                <AiOutlinePlus/>
            </button>
       </div>

       <div className=' px-4 py-6  border-b-[0.5px] border-richblack-700 '>
            <p className='text-richblack-25  text-[1.125rem] font-semibold'>{courseData?.courseName}</p>
            <p className='text-richblack-500'>{completedLectures.length} / {totalLectures}</p>
        </div>

       

       <div className=''>
            {
                sectionData.map((section) => (
                    <div key={section._id} className=''>
                        <div onClick={() => setActiveSection(section._id)} className='bg-richblack-700 py-3 px-4 text-richblack-50 flex flex-row items-center justify-between'>
                            <p>
                                {section.sectionName}
                            </p>
                            {
                                activeSection === section._id ? (<AiOutlineUp/>) : (<AiOutlineDown />)
                            }
                            
                        </div>
                        {
                            activeSection === section._id && 
                            <div >
                                {
                                    section.subSections.map((subSection) => (
                                        <div onClick={() => {
                                                    setActiveSubSection(subSection._id)
                                                    navigate(`/view-course/${courseData._id}/section/${section._id}/subSection/${subSection._id}`)
                                                }}
                                        key={subSection._id} className={`px-4 py-3  text-richblack-50  ${activeSubSection === subSection._id ? "bg-yellow-600" : "bg-richblack-800 transition-all duration-300 hover:bg-black"}` }>
                                            <label htmlFor='lecture' className='flex flex-row items-center gap-x-3'>
                                                <input 
                                                onChange={() => {}}
                                                type='checkbox'
                                                checked={completedLectures.includes(subSection._id)}
                                                />
                                                <p>{subSection.title}</p>
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                ))
            }
       </div>


       {
        reviewModal && <ReviewModal setReviewModal={setReviewModal}/>
       }

    </div>
  )
}

export default ViewCourseSideBar