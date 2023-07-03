import React from 'react'
import StepsComponent from './AddCourse/StepsComponent'


const AddCourse = () => {

    

  return (
    <section>
        <div className='w-[90%] mx-auto px-4 space-y-14'>
            <h1 className=' text-[1.875rem] text-richblack-5 font-medium'>Add Course</h1>

            <div className='grid lg:grid-cols-[1fr_0.5fr] gap-y-12 lg:gap-x-6 lg:space-y-0'>

                {/* steps component */}
                <div className='order-2 lg:order-[-1]'>
                <StepsComponent />
                </div>
                

                {/* instructions div */}
                <div className='lg:sticky or self-start top-0 p-6 bg-richblack-800 border-[0.8px] border-richblack-700 rounded-lg space-y-5'>
                    <h2 className='text-[1.125rem] font-semibold text-richblack-5'>⚡️ Course Upload Tips</h2>
                    <ul className='text-[0.75rem] text-richblack-5 list-disc space-y-3'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>


            </div>
        </div>
    </section>
  )
}

export default AddCourse