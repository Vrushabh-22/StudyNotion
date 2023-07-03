import React from 'react'



const CustomModal = ({text1, text2, handler1, handler2, textBtn1, textBtn2}) => {

  return (
    <div className='z-[1000] fixed w-[100vw] h-[100vh] left-0 top-0 grid place-items-center  bg-white/10 backdrop-filter backdrop-blur'>
        <div className='bg-richblack-800 p-14 rounded-lg text-center space-y-6 '>
            <div className=''>
              <h1 className='text-richblack-100 font-semibold text-[2.125rem]'>{text1}</h1>
              <p className='text-richblack-300 text-[1.125rem]'>{text2}</p>
            </div>
            <div className='flex flex-row  gap-x-10 py-3 w-fit mx-auto'>
                <button onClick={handler1} className='px-4 py-2 lg:px-6 lg:py-3 rounded-md font-medium transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900 border-r-[1px] border-b-[1px] border-white'>{textBtn1}</button>
                <button onClick={handler2} className='px-4 py-2 lg:px-6 lg:py-3 rounded-md font-medium transition-all duration-200 hover:scale-95 bg-richblack-700 text-white border-r-[1px] border-b-[1px] border-richblack-300'>{textBtn2}</button>
            </div>
        </div>
    </div>
  )
}

export default CustomModal