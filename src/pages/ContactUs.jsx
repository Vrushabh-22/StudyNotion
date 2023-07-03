import React from 'react'

import {HiChatBubbleLeftRight} from "react-icons/hi2"
import {BsGlobeAsiaAustralia} from "react-icons/bs"
import {IoCall} from "react-icons/io5"

import ContactUsForm from '../components/common/ContactUsForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'


const ContactUs = () => {

    const data = [
        {
            logo: <HiChatBubbleLeftRight/>,
            heading: "Chat Us",
            description1: "Our friendly team is here to help.",
            description2: "projectsmail0799@mail address"
        },
        {
            logo: <BsGlobeAsiaAustralia/>,
            heading: "Visit Us",
            description1: "Come and say hello at our office HQ.",
            description2: "Here is the location/ address"
        },
        {
            logo: <IoCall/>,
            heading: "Call Us",
            description1: "Mon - Fri From 8am to 5pm.",
            description2: "+123 456 7890"
        }
    ]

  return (
    <div>
        <div className='container mx-auto py-20 text-richblack-5'>
            <div className='w-[90%] lg:w-[80%] mx-auto lg:grid grid-cols-2 space-y-12 lg:space-y-0'>

                {/* first part */}
                <div className='w-fit p-14 rounded-xl bg-richblack-800 space-y-8 place-self-start'>
                    {
                        data.map((item, index) => (
                            <div key={index} className='flex felx-row gap-x-4 text-[1.125rem]'>
                                <div className='pt-1 text-richblack-100'>{item.logo}</div>
                                <div >
                                    <h2 className='text-richblack-5 font-semibold'>{item.heading}</h2>
                                    <div className='text-richblack-200 text-[0.875rem]'>
                                        <p>{item.description1}</p>
                                        <p>{item.description2}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='border-[0.5px] border-richblack-500 rounded-xl'>
                    <div className='space-y-2 p-8 pb-0'>
                        <h2 className='text-richblack-5 font-semibold text-[2rem] '>Got a Idea? We’ve got the skills. Let’s team up</h2>
                        <p className='text-richblack-300 font-medium'>Tall us more about yourself and what you’re got in mind.</p>
                    </div>
                    <ContactUsForm/>
                </div>

            </div>
        </div>
        
        {/* review slider */}
        <ReviewSlider/>

        {/* footer */}
        <Footer />
    </div>
  )
}

export default ContactUs