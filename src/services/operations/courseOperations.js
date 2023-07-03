import { apiConnector } from "../ApiConnector"
import  {categoryEndpoints, courseEndpoints, ratingEndpoints, sectionEndpoints, subSectionEndpoints}  from "../API"
import { toast } from "react-hot-toast";

const {GETALLCATEGORIES_API, CATEGORYPAGEDETAILS_API} = categoryEndpoints

export async function getAllCategories () {
   
    let categories = []
    try {
        const response = await apiConnector("GET", GETALLCATEGORIES_API )
        categories = response.data.categories
    } catch (error) {
        console.log(error);
    }
    return categories

}
export async function getCategoryPageDetails (categoryId) {
    let result
    try {
        const response = await apiConnector("POST", CATEGORYPAGEDETAILS_API, {categoryId} )
        result = response.data
    } catch (error) {
        console.log(error);
    }
    return result
}



const {CREATECOURSE_API, GETCOURSES_API, GETCOURSEDETAILS_API, EDITCOURSE_API, GETINSTRUCTORCOURSES_API, DELETECOURSE_API, GETCOURSEFULLDETAILS_API, UPDATECOURSEPROGRESS_API} = courseEndpoints

export function createCourse (data, token) {
    return async () => {
        let course = null
        const toastId = toast.loading("Creating Course Information")
        try {
            const response = await apiConnector("POST", CREATECOURSE_API, data, {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`})
            course = response.data.newCourse
        } catch (error) {
            console.log(error);
            toast.error("Error creating course")
        }
            toast.success("Course Information Created")
            toast.dismiss(toastId)
        return course
    }
}

export async function editCourseDetails (data, token) {
    
        let updatedCourse ;
        const toastId = toast.loading("Editing Course Information")
        try {
            const response = await apiConnector("POST", EDITCOURSE_API, data, {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            });
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed to update course")
        }
        toast.success("Course Information Edited")
        toast.dismiss(toastId)
        return updatedCourse
    
}


export async function fetchInstructorCourses (token) {
    let courses;
    try {
        const response = await apiConnector("GET", GETINSTRUCTORCOURSES_API, null, {Authorization : `Bearer ${token}`})
        courses = response.data.courses
    } catch (error) {
        console.log(error)
    }
    return courses
}


export async function getCourseDetails (courseId) {
    let course;
    let totalDuration;
    try {
        const response = await apiConnector("POST", GETCOURSEDETAILS_API, {courseId})
        course = response.data.courseDetails
        totalDuration = response.data.totalDuration
    } catch (error) {
        console.log(error)
    }
    return {course, totalDuration}
}

export async function getCourseFullDetails (courseId, token) {
    let totalDuration;
    let completedVideos
    let course;
    try {
        const response = await apiConnector("POST", GETCOURSEFULLDETAILS_API, {courseId}, {Authorization : `Bearer ${token}`})
        course = response.data.courseDetails
        totalDuration = response.data.totalDuration
        completedVideos = response.data.completedVideos
    } catch (error) {
        console.log(error)
    }
    return {course, totalDuration, completedVideos}
}

export async function deleteCourse (courseId, token){
    const toastId = toast.loading("Deleting Course")
    let result
    try {
        const response = await apiConnector("DELETE", DELETECOURSE_API, {courseId}, {Authorization : `Bearer ${token}`})
        result = response.data.success
        toast.success("Course Deleted")
    } catch (error) {
        toast.error("Failed to delete course")
        console.log(error)
    }
    toast.dismiss(toastId)
    return result
}

export async function updateProgress (data, token){
    let result
    let response
    const toastId = toast.loading("Updating Course Progress")
    try {
        response = await apiConnector("POST", UPDATECOURSEPROGRESS_API, data, {Authorization : `Bearer ${token}`})
        result = response.data.success

        if(result){
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
    toast.dismiss(toastId)
    return result
}


//section

const { CREATESECTION_API,UPDATESECTION_API, DELETESECTION_API} = sectionEndpoints

export function createSection (data, token) {
    return async () => {
        const toastId = toast.loading("Creating a section")
        let updatedCourse
        try {
            const response = await apiConnector("POST", CREATESECTION_API, data, {Authorization : `Bearer ${token}`})
            updatedCourse = response.data.updateCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed add a section")
        }
        toast.success("Section Added")
        toast.dismiss(toastId)
        return updatedCourse
    }
}

export function updateSection (data, token) {
    return async () => {
        const toastId = toast.loading("Updating a section")
        let updatedCourse
        try {
            const response = await apiConnector("POST", UPDATESECTION_API, data, {Authorization : `Bearer ${token}`})
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed update a section")
        }
        toast.success("Section Updated")
        toast.dismiss(toastId)
        return updatedCourse
    }
}

export function  deleteSection (data, token) {
    return async () => {
        const toastId = toast.loading("Deleting a section")
        let updatedCourse
        try {
            const response = await apiConnector("POST", DELETESECTION_API, data, {Authorization : `Bearer ${token}`})
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed delete a section")
        }
        toast.success("Section Deleted")
        toast.dismiss(toastId)
        return updatedCourse
    }
}

//subSection
const {CREATESUBSECTION_API, DELETESUBSECTION_API, UPDATESUBSECTION_API} = subSectionEndpoints

export function createSubSection (data, token) {
    return async () => {
        const toastId = toast.loading("Creating a subSection")
        let updatedCourse
        try {
            const response = await apiConnector("POST", CREATESUBSECTION_API, data, {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            })
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed add a section")
        }
        toast.success("Section Added")
        toast.dismiss(toastId)
        return updatedCourse
    }
}

export async function  deleteSubSection (data, token) {
    
        const toastId = toast.loading("Deleting a Lecture")
        let updatedCourse
        try {
            const response = await apiConnector("POST", DELETESUBSECTION_API, data, {Authorization : `Bearer ${token}`})
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed delete a lecture")
        }
        toast.success("Lecture Deleted")
        toast.dismiss(toastId)
        return updatedCourse
    
}

export async function updateSubSection (data, token) {
   
        const toastId = toast.loading("Updating a SubSection")
        let updatedCourse
        try {
            const response = await apiConnector("POST", UPDATESUBSECTION_API, data, {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            })
            updatedCourse = response.data.updatedCourse
        } catch (error) {
            console.log(error);
            toast.error("Failed update a SubSection")
        }
        toast.success("SubSection Updated")
        toast.dismiss(toastId)
        return updatedCourse
    
}

//rating and review 

const {CREATERATING_API, GETALLRATINGS_API} = ratingEndpoints;

export async function createRating (data, token) {
    let response
    const toastId = toast.loading("Rating Course")
    try {
        response = await apiConnector("POST", CREATERATING_API, data, {Authorization : `Bearer ${token}`})
        toast.success("Course Rated")
    } catch (error) {
        console.log(error)
        toast.error("Course already Rated")
    }
    toast.dismiss(toastId)
}


export async function getAllRatingData (data, token) {
    let result
    try {
        const response = await apiConnector("GET", GETALLRATINGS_API)
        result = response.data.ratingData
    } catch (error) {
        console.log(error)
    }
    return result
}