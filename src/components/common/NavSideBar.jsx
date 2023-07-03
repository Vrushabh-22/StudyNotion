import React, { useEffect, useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants'
import {VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory, VscArchive, VscSettingsGear, VscSignOut} from "react-icons/vsc"
import { NavLink, useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/operations/authOperations'
import CustomModal from '../common/CustomModal'
import { NavbarLinks } from '../../data/navbar-links'
import {FiChevronDown} from "react-icons/fi"

const NavSideBar = ({catelogLinks, sideBar, setSideBar}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openCatelog, setOpenCatelog] = useState(false)

    const {user} = useSelector((state) => state.profile)


    const sideBarData = [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard/insights",
            type: ACCOUNT_TYPE.INSTRUCTOR,
            icon: <VscDashboard />,
        },
        {    
            id: 2,
            name: "My Profile",
            path: "/dashboard/my-profile",
            type: ACCOUNT_TYPE.STUDENT,
            icon: <VscAccount />,
        },
        {    
            id: 3,
            name: "My Profile",
            path: "/dashboard/my-profile",
            type: ACCOUNT_TYPE.INSTRUCTOR,
            icon: <VscAccount />,
        },
        {
            id: 4,
            name: "Enrolled Courses",
            path: "/dashboard/enrolled-courses",
            type: ACCOUNT_TYPE.STUDENT,
            icon: <VscMortarBoard />,
        },
        {
            id: 5,
            name: "Wishlist",
            path: "/dashboard/cart",
            type: ACCOUNT_TYPE.STUDENT,
            icon: <VscArchive />,
        },
        {
            id: 6,
            name: "My Courses",
            path: "/dashboard/my-courses",
            type: ACCOUNT_TYPE.INSTRUCTOR,
            icon: <VscVm />,
        },
        {
            id: 7,
            name: "Purchase History",
            path: "/dashboard/purchase-history",
            type: ACCOUNT_TYPE.STUDENT,
            icon: <VscHistory />,
        },
        {
            id: 8,
            name: "Add Course",
            path: "/dashboard/add-course",
            type: ACCOUNT_TYPE.INSTRUCTOR,
            icon: <VscAdd />,
        },
        
    ]


  return (
    <div  className={` ${sideBar ? "left-0" : "-left-[100%]"} lg:hidden fixed top-[4.125rem] min-h-[calc(100vh-4.125rem)] z-[10000] w-full transition-all duration-300 bg-richblack-800 py-3 border-r-[0.5px] border-richblack-700`}>

        <div  className='text-richblack-300 text-[0.875rem] font-medium '>
            <div className='border-b-[0.5px] border-richblack-600 text-richblack-300 text-[0.875rem] font-medium py-4'>
                {
                    NavbarLinks.map((link, index) => (
                        <div key={index}   className=' '>
                            {
                                link.title === "Catalog" ?
                                (<div  className='py-2 px-6 '>
                                    <div onClick={(e) => {
                            e.stopPropagation();
                            setOpenCatelog((pre) => !pre)
                        }} className=' flex flex-row items-center gap-x-1'>
                                        <div>{link.title}</div>
                                        <div className={`${openCatelog ? "rotate-180 transition-all duration-300" : ""}`}><FiChevronDown /></div>
                                    </div>
                                   

                                    <div className={`sideBar text-[0.875rem] transition-all duration-300 overflow-hidden ${openCatelog ? "h-fit mt-2" : "h-0"}`}>
                                        {
                                            catelogLinks.length ? 
                                            (
                                                catelogLinks.map((category, index) => (
                                                    <div onClick={(e) => {
                                                        e.stopPropagation()
                                                        setOpenCatelog(false)
                                                        setSideBar(false)
                                                    }} key={index} className='cursor-pointer py-1 px-3 rounded-lg transition-all duration-200' >
                                                        <NavLink to={`/catelog/${category.name.split(" ").join("-").toLowerCase()}`}>
                                                            {category.name}
                                                        </NavLink>
                                                    </div>))
                                            ) : (
                                                <div>No Categories Found</div>
                                            )
                                        }
                                    </div>
                                    
                                </div>
                                ):(
                                    <div className='sideBar'>
                                        <NavLink onClick={(e) => {
                                        e.stopPropagation()
                                        setSideBar(false)
                                    }} className="flex flex-row items-center gap-x-3 py-2 px-6 " to={link?.path}>
                                            {link.title}
                                        </NavLink>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            {
                user &&
                <div className='border-b-[0.5px] border-richblack-600 text-richblack-300 py-4'>
                {   
                    sideBarData.map((link, item) => (
                        user.role === link.type  &&
                                <div onClick={(e) => {
                                        e.stopPropagation()
                                        setSideBar(false)
                                    }}  key={link.id} className='sideBar'>
                                    <NavLink to={link.path} className="flex flex-row items-center gap-x-3 py-2 px-6 ">
                                        <p className='text-[1.125rem]'>{link.icon}</p>
                                        <p>{link.name}</p>
                                    </NavLink>
                                </div>
                    ))
                }
            </div>
            }
            {
                user &&
                <div className='text-[0.875rem] font-medium py-4'>
                
                    <div onClick={(e) => {
                                            e.stopPropagation()
                                            setSideBar(false)
                                        }}  className='sideBar'>
                        <NavLink to={"/dashboard/settings"} className="flex flex-row items-center gap-x-3 py-2 px-6 ">
                            <VscSettingsGear />
                            <p>Settings</p>
                        </NavLink>
                    </div>

                    <div  className="flex flex-row items-center gap-x-3 py-2 px-6 cursor-pointer " onClick={(e) => {
                        e.stopPropagation()
                        setSideBar(false)
                        setOpen((pre) => !pre)
                    }} 
                        >
                        <VscSignOut className='text-[1.125rem]'/>
                        LogOut
                    </div>
            </div>
            }
        </div>


        {
            open && 
            <CustomModal 
                text1={"Are You Sure?"} 
                text2={"You will be logged out"}
                textBtn1={"LogOut"}
                textBtn2={"Cancel"}
                handler1={() => {
                    setOpen(false)
                    dispatch(logout(navigate))
                }}
                handler2={() => setOpen(false)}
                />
        }

    </div>
  )
}

export default NavSideBar