import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import CustomBtn from '../components/core/HomePage/CustomBtn'
import Banner2 from "../assets/Images/vadim-bozhko-lbO1iCnbTW0-unsplash.jpg"
//import Banner from "../assets/Images/banner.mp4"
import { TypeAnimation } from 'react-type-animation'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import know_your_progress from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../assets/Images/Plan_your_lessons.png"
import InstructorImg from "../assets/Images/Instructor.png"
import Footer from '../components/common/Footer'
import Explore from '../components/core/HomePage/Explore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {

    
    const codeBlock = `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh2><ahref="">Header<a>\n/h2>\nnav><ahref="one/">One</a><ahref="two/">Two</\na>sahref="three/">Three<a>\n/nav>`

  return (
    <div className=''>

        {/* section 1 */}
        <section>
            <div className="container mx-auto text-white flex flex-col items-center gap-y-9 pt-16 lg:pb-16">

                <Link to={"/signup"}>
                    <button className='flex flex-row items-center gap-x-3 border-b-[0.5px] border-richblack-200 text-richblack-200 font-medium rounded-full py-2 px-5 bg-richblack-800 transition-all duration-200 hover:scale-95'>
                        <span>Become an instructor</span>
                        <FaArrowRight className='text-[0.8rem] font-bold'/>
                    </button>
                </Link>

                <div className='text-center w-[90%] lg:w-[80%] lg:max-w-[65%] space-y-4'>
                    <h2 className='text-4xl font-semibold '>
                        Empower Your Future with  
                        <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> Coding Skills</span>
                    </h2>
                    <p className='text-[1rem] font-medium text-richblack-300'> 
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </p>
                </div>

                <div className='flex flex-row gap-x-6'>

                    <CustomBtn content={"Learn More"} active={true} linkto={"/signup"} icon={false} />

                    <CustomBtn content={"Book a Demo"} active={false} linkto={"/login"} icon={false} />

                </div>

                
                    <div className=' w-[80%] lg:w-[70%] rounded-3xl shadow-[-0px_-0px_30px] shadow-blue-200'>
                       <img src={Banner2} className='shadow-[15px_15px_0px_rgb(255,255,255)]' />
                        {/* <video className='shadow-[15px_15px_0px_rgb(255,255,255)]' muted autoPlay loop>
                            <source src={Banner}></source>
                        </video> */}
                    </div>
                
                

                {/* add gradint on video */}
            </div>
        </section>

        {/* section 2 */}
        <section>
            <div className="container mx-auto text-white space-y-28 pt-32 lg:py-32">

                <div className='w-[90%] lg:w-[80%] mx-auto  lg:flex flex-row items-center justify-between space-y-12 lg:space-y-0'>
                    
                    {/* info div */}
                    <div className='lg:w-[40%] space-y-16 '>
                        <div className='space-y-3'>
                            <h2 className='text-4xl font-semibold '>
                                Unlock your   
                                <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> coding potential</span>
                                with our online courses.
                            </h2>
                            <p className='text-[1rem] font-medium text-richblack-300'> 
                                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. 
                            </p>
                        </div>

                        <div className='flex flex-row gap-x-6'>
                            <CustomBtn content={"Try it Yourself"} active={true} linkto={"/signup"} icon={true} />

                            <CustomBtn content={"Learn More"} active={false} linkto={"/login"} icon={false} />
                        </div>
                    </div>

                    {/* type animation div */}
                    <div className='codeBlockStyle relative border-[0.5px] border-richblack-300 lg:w-[40%] flex flex-row p-2'>
                        <div className='px-2 text-richblack-400 font-bold text-[0.875rem]'>
                            <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
                        </div>
                        <div className='bg-gradient-to-br to-richblack-200 from-pink-700 bg-clip-text text-transparent'>
                            <TypeAnimation className=' font-bold text-[0.875rem]'
                            sequence={[
                                codeBlock, 1000, ""
                            ]} repeat={Infinity} omitDeletionAnimation={true} cursor={true} style={{display: "block", whiteSpace:"pre-line"}} />
                        </div>
                        <div className='absolute rounded-full skew-x-12 codeBlockBg1 w-[60%] aspect-square opacity-40 left-[20%]'></div>
                    </div>


                </div>

                <div className='w-[90%] lg:w-[80%] mx-auto lg:flex flex-row-reverse items-center justify-between space-y-12 lg:space-y-0'>
                    
                    {/* info div */}
                    <div className='lg:w-[40%] space-y-16'>
                        <div className='space-y-3'>
                            <h2 className='text-4xl font-semibold w-[60%]'>
                                Start   
                                <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> coding in seconds</span>
                            </h2>
                            <p className='text-[1rem] font-medium text-richblack-300'> 
                                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. 
                            </p>
                        </div>

                        <div className='flex flex-row gap-x-6 '>
                            <CustomBtn content={"Continue Lesson"} active={true} linkto={"/signup"} icon={true} />

                            <CustomBtn content={"Learn More"} active={false} linkto={"/login"} icon={false} />
                        </div>
                    </div>

                    {/* type animation div */}
                    <div className='codeBlockStyle relative border-[0.5px] border-richblack-300 lg:w-[40%] flex flex-row backdrop-filter  p-2'>
                        <div className='px-2 text-richblack-400 font-bold text-[0.875rem]'>
                            <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
                        </div>
                        <div className='bg-gradient-to-br from-richblack-200 to-pink-700 bg-clip-text text-transparent'>
                            <TypeAnimation className=' font-bold text-[0.875rem]'
                            sequence={[
                                codeBlock, 1000, ""
                            ]} repeat={Infinity} omitDeletionAnimation={true} cursor={true} style={{display: "block", whiteSpace:"pre-line"}} />
                        </div>
                        <div className='absolute rounded-full codeBlockBg2 w-[70%] aspect-video opacity-30 top-[-10%] '></div>
                    </div>

                </div>
            </div>
        </section>

        {/* section 3 */}
        <section className='relative'>
            <div className=" container mx-auto flex flex-col items-center gap-y-16 text-white py-32">

                <div className='text-center space-y-2'> 
                    <h2 className='text-4xl font-semibold '>
                        Unlock the 
                        <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> Power of Code</span>
                    </h2>
                    <p className='text-[1rem] font-medium text-richblack-300'> 
                        Learn to Build Anything You Can Imagine
                    </p>
                </div>

                {/* cards grid */}
                <Explore />
                
                <div className='flex flex-row gap-x-6 items-center justify-center z-50'>
                    <CustomBtn content={"Explore full catelog"} active={true} linkto={"/signup"} icon={true} />
                    <CustomBtn content={"Learn More"} active={false} linkto={"/signup"} icon={false} />
                </div>

            </div>

            <div className='absolute CustomBg w-[100%] min-h-[25%] lg:min-h-[35%] bottom-0 bg-white'></div>

        </section>

        {/* section 4 */}
        <section className="bg-pure-greys-5 ">
            
            <div className='container mx-auto py-24 space-y-14'>
                <div className='w-[90%] lg:w-[80%] mx-auto lg:grid grid-cols-2'>
                
                    <div className=''>
                        <h2 className='text-4xl font-semibold '>
                            Get the skills you need for a 
                            <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> job that is in demand.</span>
                        </h2>
                    </div>
                    <div className='space-y-12'>
                        <p className='text-[1rem] font-medium text-richblack-700'> 
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <div>
                            <CustomBtn content={"Learn More"} active={true} linkto={"/signup"} icon={false} />
                        </div>
                    </div>
                
                </div>

                <TimelineSection />
            </div>

            

        </section>

        {/* section 5 */}
        <section className="bg-pure-greys-5  ">

            <div className='container mx-auto flex flex-col items-center py-24 space-y-12'>

                <div className='text-center space-y-3'>
                    <h2 className='text-4xl font-semibold '>
                        Your swiss knife for   
                        <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent ">  learning any language</span>
                    </h2>
                    <p className='w-[90%] lg:w-[80%] lg:w-[60%] mx-auto text-center text-[1rem] font-medium text-richblack-700'> 
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more. 
                    </p>
                </div>

                <div className='w-[90%] lg:w-[80%] mx-auto lg:flex flex-row items-center justify-center overflow-x-hidden'>
                    <img src={know_your_progress} alt="know_your_progress" loading='lazy' className='lg:translate-x-48' />
                    <img src={compare_with_others} alt="compare_with_others" loading='lazy' className='lg:translate-x-10 z-20'/>
                    <img src={plan_your_lessons} alt="plan_your_lessons" loading='lazy' className='lg:-translate-x-40'/>
                </div>

                <CustomBtn content={"Learn More"} active={true} linkto={"/signup"} icon={false}/>
            </div>

        </section>

        {/* section 6 */}
        <section>
            <div className='container mx-auto py-24'>
                <div className='w-[90%] lg:w-[80%] mx-auto lg:flex flex-row gap-x-24 space-y-12 lg:space-y-0 items-center'>
                    <div className='lg:w-[50%]'>
                        <img src={InstructorImg} alt="InstructorImg" loading='lazy' className='shadow-[-15px_-15px_0px_rgb(255,255,255)]'/>
                    </div>
                    <div className='lg:w-[50%] space-y-16 '>
                        <div className='space-y-3'>
                            <h2 className='text-4xl font-semibold text-white w-[50%]'>
                                Become an  
                                <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> Instructor</span>
                            </h2>
                            <p className='text-[1rem] font-medium text-richblack-300'> 
                                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                            </p>
                        </div> 

                        <div>
                            <CustomBtn content={"Start Teaching Today"} active={true} linkto={"/signup"} icon={true} />
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* section 7 */}
        <ReviewSlider/>
        

        {/* footer section 7 */}
        <Footer />

        
    </div>
  )
}

export default Home
