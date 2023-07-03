import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import {VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory, VscArchive, VscSettingsGear, VscSignOut} from "react-icons/vsc"
import { NavLink, useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authOperations'
import CustomModal from '../../common/CustomModal'


const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
            name: "Add Course",
            path: "/dashboard/add-course",
            type: ACCOUNT_TYPE.INSTRUCTOR,
            icon: <VscAdd />,
        },
        
    ]


  return (
    <div  className='hidden lg:block min-h-[calc(100vh-4.125rem)] bg-richblack-800 py-7 border-r-[0.5px] border-richblack-700'>

        <div  className='text-richblack-300 text-[0.875rem] font-medium space-y-6'>
            <div className=''>
                {
                    sideBarData.map((link, item) => (
                        user.role === link.type  &&
                                <div  key={link.id} className='sideBar'>
                                    <NavLink to={link.path} className="flex flex-row items-center gap-x-3 py-2 px-6 ">
                                        <p className='text-[1.125rem]'>{link.icon}</p>
                                        <p>{link.name}</p>
                                    </NavLink>
                                </div>
                    ))
                }
            </div>
            <div className='border-t-[0.5px] border-richblack-600 text-richblack-300 text-[0.875rem] font-medium pt-2'>
                
                <div className='sideBar'>
                    <NavLink to={"/dashboard/settings"} className="flex flex-row items-center gap-x-3 py-2 px-6 ">
                        <VscSettingsGear />
                        <p>Settings</p>
                    </NavLink>
                </div>

                <div  className="flex flex-row items-center gap-x-3 py-2 px-6 cursor-pointer " onClick={() => setOpen((pre) => !pre)} 
                    >
                    <VscSignOut className='text-[1.125rem]'/>
                    LogOut
                </div>
            </div>
        </div>


        {
            open && 
            <CustomModal 
                text1={"Are You Sure?"} 
                text2={"You will be logged out"}
                textBtn1={"LogOut"}
                textBtn2={"Cancel"}
                handler1={() => dispatch(logout(navigate))}
                handler2={() => setOpen(false)}
                />
        }

    </div>
  )
}

export default Sidebar