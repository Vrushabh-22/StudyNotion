import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseData: [],
    sectionData: [],
    completedLectures: [],
    totalLectures: 0
}

const viewCourseSlice = createSlice({
    name : "viewCourse",
    initialState,
    reducers:{
        setCourseData: (state, actions) => {
            state.courseData = actions.payload
        },
        setSectionData: (state, actions) => {
            state.sectionData = actions.payload
        },
        setCompletedLectures: (state, actions) => {
            state.completedLectures = actions.payload
        },
        setTotalLectures: (state, actions) => {
            state.totalLectures = actions.payload
        },
        updateCompletedLectures: (state, actions) => {
            state.completedLectures = [...state.completedLectures, actions.payload]
        }
    }   
})


export const {setCourseData, setSectionData, setCompletedLectures, setTotalLectures, updateCompletedLectures} = viewCourseSlice.actions
export default viewCourseSlice.reducer;