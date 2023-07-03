import React, { useEffect, useState } from 'react'
import {VscClose} from "react-icons/vsc"
import { useSelector } from 'react-redux';

const InstructionsField = ({setValue, register, getvalue, errors}) => {

    const {course, editCourse} = useSelector((state) => state.course)
    const [instructions, setInstructions] = useState([]);

    const handleInput = (e) => {
        if(e.key === "Enter" || e.key === ","){
            e.preventDefault();
            if(e.target.value !== ""){
                setInstructions([...instructions, e.target.value.trim()])
            e.target.value = "";
            }
        }
    }

    const handleClose = (instructionIndex) => {
        const filter = instructions.filter((instruction, index) => index !== instructionIndex )
        setInstructions(filter)
    } 

    useEffect(() => {
        if(editCourse){
            setInstructions(course?.instructions)
        }
        register("instructions", {required:true})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue("instructions", instructions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instructions]);


  return (
    <div>
        <label htmlFor='instructions' className='space-y-2'>
            <p className='text-richblack-5 text-[0.875rem] font-normal'>Requirements / Instructions <sup className='text-pink-200'>*</sup></p>
            {
                instructions.length > 0 && 
                <div className='flex flex-row items-center flex-wrap gap-x-3 text-yellow-300 pb-1'>
                {
                    instructions.map((instruction, index) => (
                        <p key={index} className='flex flex-row items-center gap-x-2 py-1 px-3 bg-yellow-700 rounded-full'>
                            <span>{instruction}</span> 
                            <span className='cursor-pointer'><VscClose onClick={() => handleClose(index)}/></span>
                        </p>
                    ))
                }
                </div>
            }
            <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
            type='text'
            id='instructions'
            name='instructions'
            placeholder='Enter instructions'
            onKeyDown={handleInput}
            />
            {
                errors.instructions && (<span className='text-xs text-pink-500'>! Please Enter Instructions</span>)
            }
        </label>

    </div>
  )
}

export default InstructionsField