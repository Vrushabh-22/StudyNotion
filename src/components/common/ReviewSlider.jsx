import React, { useEffect, useState } from 'react'
import { getAllRatingData } from '../../services/operations/courseOperations'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import ReactStars from "react-rating-stars-component"

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const fetchRatings = async () => {
            const result = await getAllRatingData();
            setReviews(result)
        }
        fetchRatings();
    }, [])
  return (
    <section className=''>
        <div className='container mx-auto py-20'>
            <div className='w-[90%] lg:w-[80%] mx-auto space-y-12' >
                <h2 className='text-[2.25rem] font-semibold text-richblack-5 text-center'>Reviews From Other Learners</h2>
                <div>
                    {
                        reviews?.length === 0 ? (
                            <p className='text-center text-richblack-5'>No Reviews Found</p>
                        ) : (
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                spaceBetween={24}
                                modules={[Autoplay,Navigation]}
                                className="mySwiper"
                                freeMode={true}
                                navigation={true}
                                autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    1024:{slidesPerView:3,}
                                }}
                            >

                                {
                                    reviews?.map((review, index) => (
                                        <SwiperSlide className=''  key={index}>
                                            <div className='space-y-3 bg-richblack-800 p-4 rounded-lg'>

                                                <div className='flex flex-row items-center gap-x-3'>
                                                    <img src={review?.user?.profileImage} alt='profileImage' className='w-[45px] aspect-square rounded-full object-cover'/>
                                                    <div>
                                                        <p className='text-richblack-5'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                                        <p className='text-richblack-500'>{review?.user?.email}</p>
                                                    </div>
                                                </div>
                                                <p className='text-richblack-5 h-[50px] overflow-hidden'>{review?.review.slice(0, 60)}...</p>
                                                <div className='text-yellow-50 flex flex-row items-center gap-x-3'>
                                                    <p >{review?.rating}</p>
                                                    <ReactStars value={review?.rating} count={5} edit={false} activeColor={"#E7C009"} />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper> 
                        )
                        
                    }
                </div>
            </div>
        </div>

    </section>
  )
}

export default ReviewSlider