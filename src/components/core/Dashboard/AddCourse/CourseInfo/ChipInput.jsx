import React, { useEffect, useState } from 'react'
import {VscClose} from "react-icons/vsc"
import { useSelector } from 'react-redux';

const ChipInput = ({setValue, register, getValues, errors, name}) => {

    const [tags, setTags] = useState([]);
    const {course, editCourse} = useSelector((state) => state.course)

    const handleInput = (e) => {
        if(e.key === "Enter" || e.key === "," ){
            e.preventDefault();
            if(e.target.value !== ""){
                setTags([...tags, e.target.value.trim()])
                e.target.value = "";
            }
            
        }
    }

    const handleClose = (tagIndex) => {
        const filter = tags.filter((tag, index) => index !== tagIndex )
        setTags(filter)
    } 

    useEffect(() => {
        if(editCourse){
            setTags(course?.tags)
        }
        register(name, {required:true})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue("tags", tags)
    }, [tags, setValue]);


  return (
    <div>
        <label htmlFor={name} className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Tags <sup className='text-pink-200'>*</sup></p>
            {
                tags.length > 0 && 
                <div className='flex flex-row items-center flex-wrap gap-3 text-yellow-300 pb-1'>
                {
                    tags.map((tag, index) => (
                        <p key={index} className='flex flex-row items-center gap-x-2 py-1 px-3 bg-yellow-700 rounded-full'>
                            <span>{tag}</span> 
                            <span className='cursor-pointer'><VscClose onClick={() => handleClose(index)}/></span>
                        </p>
                    ))
                }
                </div>
            }
            <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type='text'
            id="tags"
            name="tags"
            placeholder='Enter tags'
            onKeyDown={handleInput}
            />
            {
                errors.tags && (<span className='text-xs text-pink-500'>! Please Enter Tags</span>)
            }
        </label>

    </div>
  )
}

export default ChipInput