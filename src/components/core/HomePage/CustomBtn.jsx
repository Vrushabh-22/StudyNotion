import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"

const CustomBtn = ({content, active, linkto, icon}) => {
  return (
    <Link to={linkto}>
        <button className={`flex flex-row items-center gap-x-2 lg:gap-x-3 px-4 py-2 lg:px-6 lg:py-3 rounded-md font-medium transition-all duration-200 hover:scale-95 ${active ? "bg-yellow-50 text-richblack-900 border-r-[1px] border-b-[1px] border-white" : "bg-richblack-800 text-white border-r-[1px] border-b-[1px] border-richblack-300"}`}>
            <span>{content}</span>
            {icon ? <FaArrowRight /> : <></>}      
        </button>
    </Link>
  )
}

export default CustomBtn