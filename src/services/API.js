

const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETTOKEN_API : BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL + "/auth/resetPassword",
    CONTACTUS_API : BASE_URL + "/auth/contactus"
}

export const profileEndpoints = {
    UPDATEPROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGEPROFILEIMAGE_API : BASE_URL + "/profile/changeProfileImage",
    GETUSERDETAILS_API : BASE_URL + "/profile/getUserDetails",
    GETENROLLEDCOURSES_API : BASE_URL + "/profile/getEnrolledCourses",
    DELETEACCOUNT_API : BASE_URL + "/profile/deleteAccout",
    CHANGEPASSWORD_API : BASE_URL + "/auth/changePassword",
    DASHBOARDDATA_API : BASE_URL + "/profile/instructorDashboardData"
}

export const categoryEndpoints = {
    GETALLCATEGORIES_API : BASE_URL + "/course/getCategories",
    CATEGORYPAGEDETAILS_API : BASE_URL + "/course/categoryPageDetails"
}

export const courseEndpoints = {
    CREATECOURSE_API : BASE_URL + "/course/createCourse",
    EDITCOURSE_API : BASE_URL + "/course/editCourse",
    GETCOURSES_API : BASE_URL + "/course/getCourses",
    GETCOURSEDETAILS_API : BASE_URL + "/course/getCourseDetails",
    GETCOURSEFULLDETAILS_API : BASE_URL + "/course/getCourseFullDetails",
    GETINSTRUCTORCOURSES_API : BASE_URL + "/course/getInstructorCourses",
    DELETECOURSE_API : BASE_URL + "/course/deleteCourse",
    UPDATECOURSEPROGRESS_API : BASE_URL + "/course/updateCourseProgress"
}

export const sectionEndpoints = {
    CREATESECTION_API : BASE_URL + "/course/createSection",
    UPDATESECTION_API : BASE_URL + "/course/updateSection",
    DELETESECTION_API : BASE_URL + "/course/deleteSection",
}

export const subSectionEndpoints = {
    CREATESUBSECTION_API : BASE_URL + "/course/createSubSection",
    UPDATESUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETESUBSECTION_API : BASE_URL + "/course/deleteSubSection",
}

export const paymentEndpoints = {
    CRAETEORDER_API : BASE_URL + "/payment/createOrder",
    VERIFYSIGNATURE_API : BASE_URL + "/payment/verifySignature",
}


export const ratingEndpoints = {
    CREATERATING_API : BASE_URL + "/course/createRatingAndReview",
    GETALLRATINGS_API : BASE_URL + "/course/getAllRatingReviews"
}
