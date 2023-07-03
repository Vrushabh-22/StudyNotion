import React from 'react'
import Template from '../components/common/Template'
import loginImage from "../assets/Images/login.webp"

const Login = () => {
  return (
    <section className='min-h-[calc(100vh-4.125rem)]  grid  place-items-center py-16'>
        <div className='container mx-auto'>
            <div className='w-[90%] lg:w-[80%] mx-auto '>
                <Template heading={"Welcome Back"} 
                description1={"Build skills for today, tomorrow, and beyond."}
                description2={"Education to future-proof your career."}
                image={loginImage}
                loginForm={true}
                />
            </div>
        </div>
    </section>
  )
}

export default Login