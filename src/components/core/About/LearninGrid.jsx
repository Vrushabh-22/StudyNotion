import React from 'react'
import CustomBtn from "../HomePage/CustomBtn"



const LearninGrid = () => {

    const learningData = [
        {
            heading: "Curriculum Based on Industry Needs", 
            description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            heading: "Our Learning Methods", 
            description: "The learning process uses the namely online and offline."
        },
        {
            heading: "Certification", 
            description: "You will get a certificate that can be used as a certification during job hunting."
        },
        {
            heading: 'Rating "Auto-grading"', 
            description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            heading: "Ready to Work", 
            description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        },
    ]

  return (
    <section>
        <div className='container mx-auto py-20'>
            <div className='w-[90%] lg:w-[80%] mx-auto lg:grid grid-cols-4 space-y-12 lg:space-y-0'>
                <div className='col-span-2 space-y-6 lg:pr-8'>
                    <div className='space-y-3'>
                        <h2 className='text-4xl font-semibold text-white'>
                            <span className="bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent "> World-Class Learning for Anyone, Anywhere</span>
                        </h2>
                        <p className='text-[1rem] font-medium text-richblack-300'> 
                            Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                        </p>
                    </div> 

                    <div>
                        <CustomBtn content={"Learn More"} active={true} linkto={"/signup"} icon={false} />
                    </div>
                </div>
                {
                    learningData.map((data, index) => (
                        <div key={index} 
                        className={` text-richblack-5 p-8 space-y-8 ${index % 2 === 0 ? "bg-richblack-700" : "bg-richblack-800"} ${index === 2 && "col-start-2"}`}>
                            <h2 className='text-[1.125rem] font-semibold'>{data.heading}</h2>
                            <h3 className='text-[0.875rem] text-richblack-100'>{data.description}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default LearninGrid