import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"
Chart.register(...registerables)


const InstructorChart = ({data}) => {

    const [studentChart, setStudentChart] = useState(true);

    const generateRandomColors = (noOfColors) => {
        let colors = []
        for (let i = 0; i < noOfColors; i++){
            const color = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)}
            )`

            colors.push(color)
        }
        return colors;
    }

    const studentsData = {
        labels : data?.map((course) => course?.courseName),
        datasets : [
            {
                data : data?.map((course) => course?.totalStudentsEnrolled),
                backgroundColor : generateRandomColors(data?.length)
            }
        ]
    }

    const incomeData = {
        labels : data?.map((course) => course?.courseName),
        datasets : [
            {
                data : data?.map((course) => course?.totalAmount),
                backgroundColor : generateRandomColors(data?.length)
            }
        ]
    }

    const options = {

    }

  return (
    <div className='bg-richblack-800 p-6 rounded-lg h-full space-y-4 ' >
        <h2 className='text-richblack-5 font-semibold text-[1.125rem]'>Visualize</h2>

        <div className='flex flex-row items-center gap-x-4'>
            <button className={`px-4 py-1 ${studentChart ? "text-yellow-100 bg-richblack-700" : "text-yellow-400"}`}
            onClick={() => setStudentChart(true)}>
                Student
            </button>
            <button className={`px-4 py-1 ${!studentChart ? "text-yellow-100 bg-richblack-700" : "text-yellow-400"}`}
            onClick={() => setStudentChart(false)}>
                Income
            </button>
        </div>

        <div className='w-[100%] lg:max-w-[80%] mx-auto'>
            <Pie data={studentChart ? studentsData : incomeData}
                options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart