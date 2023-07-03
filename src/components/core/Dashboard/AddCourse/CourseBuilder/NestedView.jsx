import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {AiFillCaretDown, AiFillEdit, AiFillDelete} from "react-icons/ai"
import {MdAdd} from "react-icons/md"
import CustomModal from '../../../../common/CustomModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseOperations'
import { setCourse } from '../../../../../redux/slices/courseSlice'
import SubSectionModal from './SubSectionModal'

const NestedView = ({handleEdit}) => {

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)

    const [modal, setModal] = useState(null);

    const [addSubSection, SetAddSubSection] = useState(null)
    const [viewSubSection, SetViewSubSection] = useState(null)
    const [editSubSection, SetEditSubSection] = useState(null)

    const handleDeleteSection = async (sectionId, courseId) => {
        setModal(null)
        const result = await dispatch(deleteSection({sectionId, courseId}, token))
        if(result){
            dispatch(setCourse(result))
        }
    }
    const handleDeleteSubSection = async (courseId, subSectionId) => {
        setModal(null)
        const result = await deleteSubSection({courseId, subSectionId}, token)
        if(result){
            dispatch(setCourse(result))    
        }
    }

  return (
    <div className='bg-richblack-700 border-[0.5px] border-richblack-600 rounded-md py-3 px-6 text-richblack-50'>
            {   
            course.courseContent.length > 0 && 

                course.courseContent.map((section) => (
                    <details key={section._id} open>

                        <summary  className='flex flex-row items-center justify-between border-b-[1px] border-richblack-600 py-2'>
                            <div className='flex flex-row items-center gap-x-2'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className='flex flex-row items-center gap-x-2'>
                                <button onClick={() => handleEdit(section._id, section.sectionName)}>
                                    <AiFillEdit />
                                </button>
                                <button onClick={() => setModal({
                                                text1: "Are You Sure?", 
                                                text2: "Section will be deleted", 
                                                textBtn1: "Delete", 
                                                textBtn2: "Cancel",
                                                handler1: () => handleDeleteSection(section._id, course._id),
                                                handler2: () => setModal(null), 
                                            })} >
                                    <AiFillDelete />
                                </button>
                                <span>|</span>
                                <button>
                                    <AiFillCaretDown />
                                </button>
                            </div>
                        </summary>

                        <div className='py-3 space-y-4'>
                            {
                                section.subSections.map((item) => (
                                    <div onClick={() => SetViewSubSection(item)} key={item._id} className='flex flex-row items-center justify-between  pl-6 '>
                                        <div className='flex flex-row items-center gap-x-2'>
                                            <RxDropdownMenu/>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className='flex flex-row items-center gap-x-2'>
                                            <button  onClick={(e) =>  {
                                                SetEditSubSection({...item, sectionId: section._id})
                                                e.stopPropagation();
                                            }}>
                                                <AiFillEdit/>
                                            </button>
                                            <button onClick={(e) => {
                                                setModal({
                                                text1: "Are You Sure?", 
                                                text2: "Lecture will be deleted", 
                                                textBtn1: "Delete", 
                                                textBtn2: "Cancel",
                                                handler1: () => handleDeleteSubSection(course._id, item._id), 
                                                handler2: () => setModal(null), 
                                            })
                                            e.stopPropagation();
                                            }}>
                                                <AiFillDelete  />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button onClick={() => SetAddSubSection(section._id)} className='flex flex-row items-center gap-x-2 text-yellow-50 px-6'>
                                <MdAdd className='text-[1.125rem]'/>
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </details>
                ))
            }
            {
                addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={SetAddSubSection} add={true}/> 
                : viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={SetViewSubSection} view={true}/>
                : editSubSection ?<SubSectionModal modalData={editSubSection} setModalData={SetEditSubSection} edit={true}/>
                : <></>
            }
            {
                modal && <CustomModal {...modal}/>
            }
    </div>

  )
}

export default NestedView