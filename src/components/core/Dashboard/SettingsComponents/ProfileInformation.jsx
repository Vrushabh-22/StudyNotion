import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { updateProfile} from '../../../../services/operations/profileOperations'

const ProfileInformation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth)
    const {user, profileDetails} = useSelector((state) => state.profile)

    const {handleSubmit, register,  } = useForm({
        
        defaultValues: {
            firstName:user?.firstName,
            lastName:user?.lastName,
            dateOfBirth:profileDetails?.dateOfBirth,
            phoneNo:profileDetails?.phoneNo,
            about:profileDetails?.about
        }
        
    });



    

    const updateprofileDetails = (data) => {
        console.log(data);
        dispatch(updateProfile(data, token))
        //dispatch(getUserDetails(token))
    }


  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-6 space-y-6'>
        <h1 className='text-[1.125rem] font-semibold text-richblack-5'>Profile Information</h1>
        <form onSubmit={handleSubmit(updateprofileDetails)} className='grid lg:grid-cols-2 gap-3'> 

            {/* firstName */}
            <label htmlFor='firstName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>First Name</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='firstName'
                name='firstName'
                placeholder='Enter first Name'
                {...register("firstName")}
                />
                
            </label>

            {/* lastname */}
            <label htmlFor='lastName' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Last Name</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='lastName'
                name='lastName'
                placeholder='Enter last Name'
                {...register("lastName")}
                />
            </label>

            {/* date of birth */}
            <label htmlFor='dateOfBirth' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Date Of Birth</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                placeholder='dd/mm/yyyy'
                {...register("dateOfBirth")}
                />
            </label>

            {/* gender */}
            <label htmlFor='gender' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Gender</p>
                <select className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                id='gender'
                name='gender'
                {...register("gender")}
                >

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Trans">Trans</option>
                </select>
            </label>
            {/* Contact Number*/}
            <label htmlFor='phoneNo' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>Contact Number</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='phoneNo'
                name='phoneNo'
                placeholder='Enter Contact Number'
                {...register("phoneNo")}
                />
            </label>

            {/* about */}
            <label htmlFor='about' className='space-y-2'>
                <p className='text-richblack-5 text-[0.875rem] font-normal'>About</p>
                <input className='w-[100%] text-richblack-200 bg-richblack-700 border-b-[0.6px] border-richblack-300 rounded-md p-3 appearance-none outline-none '
                type='text'
                id='about'
                name='about'
                placeholder='Enter Bio Details'
                {...register("about")}
                />
            </label>

            <div className='flex flex-row items-center gap-x-6 pt-6'>
                <button className='text-richblack-200 bg-richblack-700 rounded-md py-2 px-6 font-medium transition-all duration-200 hover:scale-95' type='submit'>Save</button>
                <button onClick={() => navigate("/dashboard/my-profile")} className=' py-2 px-6 rounded-md font-medium transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900' type='button'>Cancel</button>
            </div>
            
        </form>
    </div>
  )
}

export default ProfileInformation