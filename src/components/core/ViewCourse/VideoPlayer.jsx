import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import "video-react/dist/video-react.css"
import { updateProgress } from '../../../services/operations/courseOperations';
import {updateCompletedLectures} from "../../../redux/slices/viewCourseSlice.js"
import { CiGlass } from 'react-icons/ci';

const VideoPlayer = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const playerRef = useRef(); 

  const {courseId, sectionId, subSectionId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const {courseData, sectionData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false)

  const isFirstVideo = () => {

    const currentSectionIndex = sectionData.findIndex((section) => section._id === sectionId)

    const currentSubSectionIndex = sectionData?.[currentSectionIndex]?.subSections.findIndex((subSection) => subSection._id === subSectionId)

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }else{
      return false;
    }

  }

  const isLastVideo = () => {

    const currentSectionIndex = sectionData.findIndex((section) => section._id === sectionId)

    const totalSubSections = sectionData?.[currentSectionIndex]?.subSections.length

    const currentSubSectionIndex = sectionData?.[currentSectionIndex]?.subSections.findIndex((subSection) => subSection._id === subSectionId)

    if(currentSectionIndex === sectionData.length - 1 && currentSubSectionIndex === totalSubSections - 1){
      return true
    }else{
      return false
    }

  }

  const goToNextVideo = () => {

    const currentSectionIndex = sectionData.findIndex((section) => section._id === sectionId)

    const totalSubSections = sectionData?.[currentSectionIndex].subSections.length

    const currentSubSectionIndex = sectionData?.[currentSectionIndex].subSections.findIndex((subSection) => subSection._id === subSectionId)

    if(currentSubSectionIndex !== totalSubSections - 1){
      //same section next video
      const nextSubSectionId = sectionData?.[currentSectionIndex]?.subSections?.[currentSubSectionIndex + 1]?._id
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`)
    }else{
      const nextSectionId = sectionData?.[currentSectionIndex + 1]?._id
      const nextSubSectionId = sectionData?.[currentSectionIndex + 1]?.subSections?.[0]?._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`)
    }

  }

  const goToPrevVideo = () => {

    const currentSectionIndex = sectionData.findIndex((section) => section._id === sectionId)

    const currentSubSectionIndex = sectionData?.[currentSectionIndex].subSections.findIndex((subSection) => subSection._id === subSectionId)

    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = sectionData?.[currentSectionIndex]?.subSections?.[currentSubSectionIndex - 1]?._id
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`)
    }else{
      const prevSectionId = sectionData?.[currentSectionIndex - 1]?._id;
      const prevSubSectionLen = sectionData?.[currentSectionIndex - 1]?.subSections.length
      const prevSubSectionId = sectionData?.[currentSectionIndex - 1]?.subSections[prevSubSectionLen -1]?._id 
      navigate(`/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`)
    }
  }

  useEffect(() => {

    const setData = () => {
      const filterData = sectionData.filter((section) => section._id === sectionId)

      const filterVideo = filterData?.[0]?.subSections?.filter((subSection) => subSection._id === subSectionId)

      
      setVideoData(filterVideo?.[0])
      setVideoEnded(false)
    }

    setData();
  
  }, [courseId ,sectionId, subSectionId, courseData])

  const handleComplete = async () => {
      const result = await updateProgress({courseId:courseId, subSectionId:subSectionId}, token)
      if(result){
        dispatch(updateCompletedLectures(subSectionId))
      }
  } 

  return (
    <section >
      {
        !videoData ? (
          <p className='text-richblack-5 text-[1.125rem] '>No Data Found</p>
        ) : (
          <>
          <div className='relative grid place-items-center'>
            <Player 
            aspectRatio='16:9'
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
            ref={playerRef}
            >
              
            </Player>
            {
                videoEnded && 
                <div className='w-full h-full text-richblack-900 bg-transparent bg-gradient-to-t from-richblack-900 to-richblack-400 absolute  flex flex-col items-center justify-center gap-y-6 '>
                  <div className='flex flex-col gap-y-3'>
                    <button onClick={() => {
                        if(playerRef.current){
                          playerRef.current.seek(0)
                          setVideoEnded(false)
                        }
                      }}
                      className='bg-richblack-800 text-richblack-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                        Rewatch
                      </button>
                    {
                      !completedLectures.includes(subSectionId) && 
                      <button onClick={handleComplete}
                      className='bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                        Mark As Completed
                      </button>
                    }
                  </div>
                  <div className='z-[20] space-x-4'>
                    {
                      !isFirstVideo() && 
                      <button onClick={goToPrevVideo}
                      className='bg-richblack-200 py-2 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                        Prev
                      </button>
                    }
                    {
                      !isLastVideo() && 
                      <button onClick={goToNextVideo}
                      className='bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95'>
                        Next
                      </button>
                    }
                  </div>
              </div>
              }
          </div>
          <div>
            <h2 className='text-richblack-5 font-bold text-[1.875rem]'>{videoData?.title}</h2>
            <p className='text-richblack-300'>{videoData?.description}</p>
          </div>
        </>    
        )
      }
    </section>
  )
}

export default VideoPlayer