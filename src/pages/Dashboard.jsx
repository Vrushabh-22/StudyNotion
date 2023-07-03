import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {


  return (
    <section className='relative flex flex-row h-[calc(100vh-4.125rem)]'>
     
        <div className='lg:w-[15%]'>
          <Sidebar  />
        </div>

        <div className='flex-1 py-10 lg:py-12 overflow-y-scroll '>
          <Outlet/>
        </div>
    </section>
  )
}

export default Dashboard