import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiUpload } from 'react-icons/bi'
import { changeProfileImg } from '../../../../services/operations/profileOperations';


const ProfileImage = () => {

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)
    const {profileImage} = useSelector((state) => state.profile)
    const [preview, setPreview] = useState("");
    const [img, setImg] = useState(null);



    const handleChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setPreview(URL.createObjectURL(file))
            setImg(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profileImage", img)
        dispatch(changeProfileImg(formData, token))
        setPreview("")
    }


  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6 ' >
        <div className='flex flex-col items-center gap-y-3 lg:gap-y-0 lg:flex-row gap-x-6'>
            <div>
            <img src={preview ? preview : profileImage} alt='userImg' className='w-[80px] aspect-square rounded-full object-cover self-start'/>
            </div>
            <div className='space-y-3'>
                <p className='text-richblack-25 font-medium text-center lg:text-left'>Change Profile Picture</p>
                <form onSubmit={handleSubmit} className='w-fit flex flex-row items-center gap-x-6'>
                    <label htmlFor='profileImage' className='text-richblack-200 bg-richblack-700 rounded-md py-2 px-6 font-medium transition-all duration-200 hover:scale-95 appearance-none outline-none'>
                        Select
                        <input type='file'  name='profileImage' id='profileImage' className='hidden' 
                        onChange={handleChange}
                        />
                    </label>
                        <button type='submit' className='flex flex-row items-center gap-x-3  py-2 px-6 rounded-md font-medium transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900'>
                            Upload
                            <BiUpload />
                        </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfileImage