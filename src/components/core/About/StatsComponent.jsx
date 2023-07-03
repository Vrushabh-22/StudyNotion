import React from 'react'

const StatsComponent = () => {

    const stats = [
        {count: "5K" , field: "Active Students"},
        {count: "10+" , field: "Mentors"},
        {count: "200+" , field: "Courses"},
        {count: "50+" , field: "Awards"}
    ]

  return (
    <section className='bg-richblack-800'>
        <div className='container mx-auto'>
            <div className='w-[90%] lg:w-[80%] mx-auto grid grid-cols-4 place-items-center py-20'>

            {
                stats.map((stat, index) => (
                    <div key={index} className='text-center '>
                        <h2 className='text-richblack-5 text-[1.875rem] font-bold'>{stat.count}</h2>
                        <h3 className=' text-richblack-500 font-semibold'>{stat.field}</h3>
                    </div>
                ))
            }

            </div>
        </div>

    </section>
  )
}

export default StatsComponent