import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCategories, getCategoryPageDetails } from '../services/operations/courseOperations';
import CourseCard from '../components/core/Catelog/CourseCard';
import Crousel from '../components/core/Catelog/Crousel';
import Loader from '../components/common/Loader';
import Footer from '../components/common/Footer';


const Catelog = () => {

    const {catelogName} = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [differentCategory, setDifferentCategory] = useState(null)
    const [mostSellingCourses, setMostSellingCourses] = useState(null)
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(true)

    const fetchCategories = async () => {
        const result = await getAllCategories();
        const id = result.filter((category, index) => category.name.split(" ").join("-").toLowerCase() === catelogName)[0]._id
        setCategoryId(id)
    }

    const fetchCatelogPageDetails = async () => {
        setLoading(true)
        const result = await getCategoryPageDetails(categoryId);
        setSelectedCategory(result.selectedCategory)
        setDifferentCategory(result.differentCategory)
        setMostSellingCourses(result.mostSellingCourses)
        setLoading(false)
    }

    useEffect(() => {
        if(categoryId){
            fetchCatelogPageDetails();
        }
    }, [categoryId])

    useEffect(() => {
        fetchCategories();
    },[catelogName])


  return (
    <>
        <section className={`${loading ? "w-full min-h-[calc(100vh-4.125rem)] grid place-items-center" : ""}`}>
        {/* section1 */}
       {
        loading ? <Loader/> : (
            <>
            <div className='bg-richblack-800 py-8'>
                <div className='container mx-auto'>
                    <div className='w-[90%] lg:w-[80%] mx-auto grid lg:grid-cols-[1fr_0.5fr]'>
                        <div className='space-y-4'>
                            <p className='text-richblack-300 text-[0.875rem]'>Home / Catelog / 
                                <span className='text-yellow-50'> {selectedCategory?.name}</span>
                            </p>
                            <h2 className='text-richblack-5 text-[1.875rem] font-medium'>{selectedCategory?.name}</h2>
                            <p className='text-richblack-200 text-[0.875rem]'>{selectedCategory?.description}</p>
                        </div>
                        <div className='hidden lg:block place-self-end self-start space-y-3'>
                            <h2 className='text-[1.125rem] text-richblack-5 font-medium '>Related resources</h2>
                            <ul className='list-disc text-[0.875rem] text-richblack-100 space-y-2 pl-3'>
                                <li>Doc {selectedCategory?.name}</li>
                                <li>CheetSheets</li>
                                <li>Articles</li>
                                <li>Community Forums</li>
                                <li>Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-14 '>

                <div className='w-[90%] lg:w-[80%] mx-auto space-y-14'>

                    {/* section1 */}
                    <div className='space-y-10'>
                        <div>
                            <h2 className='text-richblack-5 text-[1.875rem] font-semibold'>Courses to get you started</h2>
                            <p className='border-b-[0.8px] border-richblack-300 text-richblack-5 pb-2 flex flex-row gap-x-6'>
                                <span onClick={() => setActive(true)} className={`cursor-pointer ${active ? "text-yellow-50 underline underline-yellow-50 underline-offset-[0.9rem]" : "" }`}>Most Popular</span>
                                <span onClick={() => setActive(false)} className={`cursor-pointer ${!active ? "text-yellow-50 underline underline-yellow-50 underline-offset-[0.9rem]" : "" }`}>New</span>
                            </p>
                        </div>
                        
            
                        <Crousel courses = {active ? selectedCategory?.courses : differentCategory?.courses}/>
                    </div>
                    
                    {/* section 2 */}
                    <div className='space-y-10'>
                        <h2 className='text-richblack-5 text-[1.875rem] font-semibold'>Top Courses in {differentCategory?.name}</h2>
                        <Crousel courses = {differentCategory?.courses}/>
                    </div>

                    {/* section3 */}
                    <div className='space-y-10'>
                        <h2 className='text-richblack-5 text-[1.875rem] font-semibold'>Frequently Bought Together</h2>
                        <div className='grid lg:grid-cols-3 gap-12'>
                        {
                            mostSellingCourses && 
                            mostSellingCourses.map((course, index) => (
                                    <CourseCard key={index} course={course}/>
                                ))
                                
                            
                        }
                        </div>
                    </div>

                </div>

            </div>
            </>
        )
       }
    </section>
    <Footer/>
    </>
  )
}

export default Catelog