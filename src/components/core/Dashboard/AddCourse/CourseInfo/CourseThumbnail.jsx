import React, { useEffect, useState } from 'react'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const CourseThumbnail = ({register, setValue, errors, getValues}) => {
     
    const {course, editCourse} = useSelector((state) => state.course)
    const [preview, setPreview] = useState();
    

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles[0].size > 6291456 ){
            toast.error("Image is to large")
            return;
        }
        const support = ["jpeg", "jpg", "png"]
        if( !support.includes(acceptedFiles[0].type.split("/").at(-1))){
            toast.error("File type not supported")
            return;
        }
        setValue("thumbnail",acceptedFiles[0] )
        setPreview(URL.createObjectURL(acceptedFiles[0]))
    }, [setValue])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        maxFiles:1,
        
    })

    useEffect(() => {
        if(editCourse){
            setValue("thumbnail", course?.thumbnail)
            setPreview(course?.thumbnail)
        }

        register("thumbnail", {required:true})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

  return (
    <>
    <div className='w-full  p-8 text-richblack-200 bg-richblack-700 border-[2px] border-dashed border-richblack-800 rounded-lg'>
        
        <div {...getRootProps()}>
            
                <input {...getInputProps()} name='thumbnail' id='tumbnail' />

                {
                    isDragActive ?

                    <p>Drop the files here ...</p> : 

                    preview ? (
                        <div className='space-y-2 cursor-pointer'>
                            <img src={preview} alt='preview' className='mx-auto max-h-[200px]' />
                            <p className=' text-richblack-200 text-center '>Click again to change image</p>
                        </div>
                        ) : (
                        <div className='w-[60%] mx-auto text-[0.75rem] font-semibold space-y-4 select-none cursor-pointer'>
                            <div className='mx-auto bg-black w-[45px] aspect-square rounded-full grid place-items-center'>
                                <FaCloudUploadAlt className='text-yellow-50 text-[1.5rem]' />
                            </div>
                            <h2 className=' text-richblack-200 text-center'>
                                <p>Drag and drop an image, or <span className='text-yellow-50 cursor-pointer'>Browse </span></p> 
                                <p>Max 6MB each (12MB for videos)</p>
                            </h2>
                            <ul className='list-disc flex flex-row justify-between text-richblack-400 '>
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    )
                }
        </div>

    </div>
    {
        errors.thumbnail && (<span className='text-xs text-pink-500'>! Thumbnail is required</span>)
    }
    </>
  )
}

export default CourseThumbnail