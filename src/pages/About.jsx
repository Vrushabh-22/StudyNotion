import React from 'react'

import {ImQuotesLeft, ImQuotesRight} from "react-icons/im"

import about1 from "../assets/Images/aboutus1.webp"
import about2 from "../assets/Images/aboutus2.webp"
import about3 from "../assets/Images/aboutus3.webp"

import fondingStoryImg from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/About/StatsComponent'
import LearninGrid from '../components/core/About/LearninGrid'
import Footer from "../components/common/Footer" 
import ContactUsForm from '../components/common/ContactUsForm'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className=''>

      {/* section 1 */}
      <section className='border-b-[1px] border-richblack-700 relative z-20'>
        

        <div className='container mx-auto py-20 '>
          <div className='w-[90%] lg:w-[80%] mx-auto space-y-14 '>
            
              {/* headings div */}
              <div className='lg:w-[80%] mx-auto text-center space-y-12 '>
                <h1 className='text-richblack-200 '>About Us</h1>
                <div className='space-y-4 '>
                  <h2 className='text-richblack-5 text-4xl font-semibold '>
                    Driving Innovation in Online Education for a   
                      <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> Brighter Future</span>
                  </h2>
                  <p className='text-[1rem] font-medium text-richblack-300'> 
                  Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                  </p>
                </div>
              </div>

              {/* img grid div */}
              <div className='grid grid-cols-3 gap-x-6 z-10'>
                <img src={about1} alt='about1' loading='lazy'/>
                <img src={about2} alt='about2' loading='lazy'/>
                <img src={about3} alt='about3' loading='lazy'/>
              </div>

              {/* qoute text div */}
              <div className='text-center '>
                <h2 className='text-richblack-100 text-2xl lg:text-4xl font-semibold '>
                  <sup><ImQuotesLeft className='inline-block'/></sup> We are passionate about     revolutionizing the way we learn. Our innovative platform   
                    <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> combines technology</span>,
                    <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent "> expertise</span>,
                    and community to create an
                    <span className="bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent "> unparalleled educational experience. </span>
                    <sup><ImQuotesRight className='inline-block'/></sup>
                </h2>
              </div>          
          </div>
        </div>

        <div className='absolute w-[100%] h-[60%] bg-richblack-800 top-0 -z-10'></div>
      </section>

      {/* section 2 */}
      <section>
        <div className='container mx-auto py-20'>
          <div className='w-[90%] lg:w-[80%] mx-auto space-y-20'>
            
            <div className='lg:grid grid-cols-2 gap-x-32  space-y-12 lg:space-y-0'>
              <div className='text-richblack-300 font-medium space-y-4'>
                <h2 className='text-[2.250rem] font-semibold bg-gradient-to-br from-[#833AB4] to-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'>Our Founding Story </h2>
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
              <div className='place-self-center shadow-[#EC008C] shadow-[-0px_-0px_20px] rounded-3xl'>
                <img src={fondingStoryImg} alt='fondingStoryImg' loading='lazy'/>
              </div>

            </div>

            <div className='lg:grid grid-cols-2 gap-x-32 space-y-12 lg:space-y-0'>
              <div className='text-richblack-300 font-medium space-y-4'>
                <h2 className='text-[2.250rem] font-semibold bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>Our Vision</h2>
                <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
              </div>
              <div className='text-richblack-300 font-medium space-y-4'>
                <h2 className='text-[2.250rem] font-semibold bg-gradient-to-br from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</h2>
                <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* section 3 */}
      <StatsComponent/>

      {/* section 4 */}
      <LearninGrid />

      {/* section 5 */}
      <section>
        <div className='container mx-auto py-20'>
          <div className='lg:w-[50%] mx-auto space-y-6'>
            <div className='space-y-2 text-center'>
              <h2 className='text-richblack-5 font-semibold text-[2rem] '>Get in Touch</h2>
              <p className='text-richblack-300 font-medium'>We’d love to here for you, Please fill out this form.</p>
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>

      {/* section 6 */}
      <ReviewSlider/>

      {/* footer */}
      <Footer/>


    </div>
  )
}

export default About