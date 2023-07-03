import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import CourseCard from './CourseCard'

const Crousel = ({courses}) => {
  return (
    <div>
        {
            courses?.length === 0 ? (
                <p className='text-center text-richblack-5'>No Courses Found</p>
            ) : (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={50}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    freeMode={true}
                    autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}
                >

                    {
                        courses?.map((course, index) => (
                            <SwiperSlide className=''  key={index}>
                                <div>
                                <CourseCard course={course}/>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper> 
            )
            
        }
    </div>
  )
}

export default Crousel