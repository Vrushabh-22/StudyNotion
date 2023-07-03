import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import {BsCart3} from "react-icons/bs"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {FiChevronDown } from "react-icons/fi"
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from "react-icons/ai"

import { getAllCategories } from '../../services/operations/courseOperations'
import NavSideBar from './NavSideBar'




const Navbar = () => {

    

    const {totalItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const [sideBar, setSideBar] = useState(false)
    const [catelogLinks, setCatelogLinks] = useState([]);

    
    async function getCategories () {
        const resp = await getAllCategories()
        setCatelogLinks(resp)   
    }

    useEffect(()=> {
        getCategories()
    }, [])




    return (
    <nav className='border-b-[1px] border-richblack-700'>
        
        <NavSideBar catelogLinks={catelogLinks} setSideBar={setSideBar} sideBar={sideBar}/>
        
        <div className='container mx-auto '>
            <div className='w-[90%] lg:w-[80%] h-[4.125rem] mx-auto flex flex-row items-center justify-between'>

                <div className='lg:hidden text-white flex flex-row items-center gap-x-2'>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        setSideBar((pre) => !pre)
                    }} className='text-[1.75rem]'>
                        {sideBar ? (<AiOutlineMenuFold />) : (<AiOutlineMenuUnfold/>)}
                    </button>
                    <Link to={"/"}>
                        <img src={Logo} alt='MobileLogo' className='h-[30px]'/>
                    </Link>
                </div>
                <Link to={"/"}>
                    <img src={Logo} alt='Logo' className='hidden lg:block h-[30px]'/>
                </Link>

                <div className='hidden h-full  lg:flex flex-row items-center text-richblack-25 gap-x-6'>
                    {
                        NavbarLinks.map((link, index) => (
                            <div key={index} className=' '>
                                {
                                    link.title === "Catalog" ? 
                                    (<div className='relative group  cursor-pointer  '>
                                        <div className=' flex flex-row items-center gap-x-1'>
                                            <div>{link.title}</div>
                                            <div><FiChevronDown /></div>
                                        </div>
                                        <div className='hidden lg:inline-block absolute rotate-45 top-[110%] -right-[17%] w-[40px] h-[40px] bg-white rounded-sm  transition-all duration-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-40'></div>

                                        <div className='hidden lg:inline-block p-2 absolute top-[180%] left-[-60%]  w-[300px] font-semibold text-[0.875rem]  text-richblack-700 bg-white rounded-lg z-50 transition-all duration-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible overflow-hidden'>
                                            {
                                                catelogLinks.length ? (catelogLinks.map((category, index) => (
                                                    <Link key={index}  className='block cursor-pointer py-4 px-6 rounded-lg transition-all duration-200 hover:bg-richblack-100' to={`/catelog/${category.name.split(" ").join("-").toLowerCase()}`}>{category.name}</Link>
                                                ))) : (<div className='py-4 px-6'>No Categories Found</div>)
                                            }
                                        </div>
                                        
                                    </div>)
                                    :(<div className='navbarLinks'><NavLink to={link?.path}>{link.title}</NavLink></div>)
                                }
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-row gap-x-6 items-center'>
                    {
                        user && user.role !== "Instructor" && (
                            <NavLink to={"/dashboard/cart"} className='relative text-richblack-5'>
                                
                                <BsCart3 fontSize={18}/>
                                
                                {
                                    totalItems > 0 && (
                                        <span className='absolute top-[50%] -right-[100%] text-yellow-300 bg-richblack-700 w-[20px] aspect-square text-sm rounded-full grid place-items-center animate-bounce' >{totalItems}</span>
                                    )
                                }
                            </NavLink>
                        )
                    }

                    {
                        token ? (<ProfileDropDown/>) : (<div className='flex flex-row gap-x-3 lg:gap-x-5'>
                            <Link to={"/login"}>
                                <button className='text-richblack-100 font-medium py-2 px-3 rounded-md border border-richblack-700'>LogIn</button>
                            </Link>
                            <Link to={"/signup"}>
                                <button className='text-richblack-100 font-medium py-2 px-3 rounded-md border border-richblack-700'>SignUp</button>
                            </Link>
                        </div>)
                    }
                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar