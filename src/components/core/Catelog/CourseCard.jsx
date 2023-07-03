import React, {useEffect, useState} from 'react'
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


  return (
    <Link to={`/courses/${course._id}`}>
        <div  className='bg-richblack-600 rounded-lg overflow-hidden border-[0.3px] border-richblack-400 shadow-lg'>
          <img src={course?.thumbnail} alt='courseThumb' className='h-250px aspect-video' />
          <div className='text-richblack-25 p-6'>
              <h2 className='text-richblack-5'>{course?.courseName}</h2>
              <p className='text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
              <div className='flex flex-row items-center gap-x-3 text-yellow-50'>
                  <span>{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={16}/>
                  <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
              <p className='text-richblack-5 text-[1.25rem]'>₹ {course?.price}</p>
          </div>
        </div>
    </Link>
  )
}

export default CourseCard