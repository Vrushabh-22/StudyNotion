import { apiConnector } from "../ApiConnector";
import { toast } from "react-hot-toast";
import { profileEndpoints } from "../API";
import { setProfileDetails, setProfileImage } from "../../redux/slices/profileSlice";



const {CHANGEPROFILEIMAGE_API, UPDATEPROFILE_API, GETUSERDETAILS_API, DELETEACCOUNT_API, CHANGEPASSWORD_API, GETENROLLEDCOURSES_API, DASHBOARDDATA_API} = profileEndpoints



export function accountDelete (token, navigate) {
    return async (dispatch) => {
        toast.success("Deleting Account")
        try {
            await apiConnector("DELETE", DELETEACCOUNT_API, null, {Authorization: `Bearer ${token}`})
            toast.success("Account Deleted")
            navigate("/login")
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to delete account")
        }
    }   
}

export  function changeProfileImg (profileImage, token) {
    return async (dispatch) => {
        toast.success("Chnaging Profile Image")
        try {
            const response = await apiConnector("PUT", CHANGEPROFILEIMAGE_API, profileImage, {
                'Content-Type': "multipart/form-data",
                Authorization : `Bearer ${token}`
            });
            dispatch(setProfileImage(response.data.profileImg))
            localStorage.setItem("profileImage", JSON.stringify(response.data.profileImg))
            toast.success("Profile Image Changed")
        } catch (error) {
            console.log(error.message);
            toast.error("failed to Change profile image")
        }
    }
}

export function updateProfile (data, token) {
    return async (dispatch) => {
        toast.success("Updating Details")
        try {
            const response = await apiConnector("PUT", UPDATEPROFILE_API, data, {Authorization : `Bearer ${token}`});
            dispatch(setProfileDetails(response.data.profile))
            localStorage.setItem("profileDetails", JSON.stringify(response.data.profile))
            toast.success("Profile Updated")
        } catch (error) {
            console.log(error.message);
            toast.error("Update Profile Failed");
        }
    }
} 


export function changepassword (data, token) {
    return async (dispatch) => {
        toast.success("Updating Password")
        try {
            await apiConnector("POST", CHANGEPASSWORD_API, data, {Authorization : `Bearer ${token}`});
            toast.success("Password Updated") 
        } catch (error) {
            console.log(error.message);
            toast.error("Unable to update Password")
        }
    }
}


export function getUserDetails (token) {
    return async (dispatch) => {
        try {
            await apiConnector("GET", GETUSERDETAILS_API, null, {Authorization : `Bearer ${token}`});
        } catch (error) {
            console.log(error.message);
        }
    }
} 

export async function getEnrolledCourses (token)  {
    
        let result;
        try {
            const response = await apiConnector("GET", GETENROLLEDCOURSES_API, null, {Authorization : `Bearer ${token}`})
            result = response.data.courses
        } catch (error) {
            console.log(error.message);
        }
        return result
    
}


export async function getInstructorDashboardData (token) {
    let result
    try {
        const response = await apiConnector("GET", DASHBOARDDATA_API, null, {Authorization: `Bearer ${token}`})
        result = response.data.data
    } catch (error) {
        console.log(error)
    }
    return result
}