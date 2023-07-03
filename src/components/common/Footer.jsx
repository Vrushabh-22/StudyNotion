import React from 'react'
import { Link } from 'react-router-dom';
import { FooterLink1, FooterLink2 } from '../../data/footer-links'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {




  return (
    <section className='bg-richblack-800'>
        <div className='container mx-auto py-14 space-y-8'>
            <div className='w-[80%] mx-auto space-y-6 lg:space-y-0 lg:grid grid-cols-2'>

                <div className='lg:border-r-[0.5px] border-richblack-300 flex justify-between gap-x-6 pr-4'>
                    <div className='space-y-3 h-fit'>
                        <img src={logo} alt="NotionLogo" className='w-[130px] '/>
                        <div className='space-y-3'>
                            <h3 className='text-richblack-100 font-semibold'>Company</h3>
                            <div className='space-y-2 text-[0.875rem] font-normal text-richblack-400'>
                                <Link className='block' to={""}>About</Link>
                                <Link className='block' to={""}>Careers</Link>
                                <Link className='block' to={""}>Afiliates</Link>
                            </div>
                            <div className='flex flex-row items-center gap-x-4 text-richblack-400'>
                                <FaFacebook/>
                                <FaGoogle/>
                                <FaTwitter/>
                                <FaYoutube/>
                            </div>
                        </div>

                    </div>
                    <div className='lg:flex felx-row flex-wrap-reverse lg:gap-x-6 space-y-6 lg:space-y-0'>
                        {
                            FooterLink1.map((obj, index) => (
                                <div className='space-y-3' key={index}>
                                    <h3 className='text-richblack-100 font-semibold'>{obj.title}</h3>
                                    <div className='space-y-2 text-[0.875rem] font-normal text-richblack-400'>
                                        {
                                            obj.links.map((link, index) => (
                                                <Link key={index} className='block' to={`${link.title.split(" ").join("-").toLowerCase()}`}>{link.title}</Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='flex flex-row flex-wrap justify-between space-y-6 lg:space-y-0 lg:justify-around pr-4'>
                    {
                        FooterLink2.map((obj, index) => (
                            <div className='space-y-3' key={index}>
                                <h3 className='text-richblack-100 font-semibold'>{obj.title}</h3>
                                <div className='space-y-2 text-[0.875rem] font-normal text-richblack-400'>
                                    {
                                        obj.links.map((link, index) => (
                                            <Link key={index} className='block' to={`${link.link}`}>{link.title}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>

            <div className='w-[80%] mx-auto h-[1px] bg-richblack-400'></div>

            <div className='w-[80%] mx-auto text-richblack-300 text-[0.875rem] font-medium flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row justify-between'>
                <div className='flex flex-row'>
                    <p className='px-3 border-r'>Privacy Policy</p>
                    <p className='px-3 border-r'>Cookie Policy</p>
                    <p className='px-3 '>Terms</p>
                </div>
                <div>
                    <p>Made with <span className='text-pink-300'>♥</span> By Vrushabh © 2023 Studynotion</p>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Footer