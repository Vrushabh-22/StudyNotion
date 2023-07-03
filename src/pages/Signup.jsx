import React from 'react'
import Template from '../components/common/Template'
import signupImage from "../assets/Images/signup.webp"
import Loader from '../components/common/Loader'
import { useSelector } from 'react-redux'

const Signup = () => {

  const loading = useSelector((state) => state.auth.loading);

  return (
    <section className='min-h-[calc(100vh-4.125rem)]  grid  place-items-center py-16'>
      <div className='container mx-auto'>
        <div className='w-[90%] lg:w-[80%] mx-auto'>
            <Template heading={"Join the millions learning to code with StudyNotion for free"} 
            description1={"Build skills for today, tomorrow, and beyond."}
            description2={"Education to future-proof your career."}
            image={signupImage}
            loginForm={false}
            />
        </div>
      </div>
    </section>
  )
}

export default Signup