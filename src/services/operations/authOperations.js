import { toast } from "react-hot-toast"
import {apiConnector} from "../ApiConnector"


import {authEndpoints} from "../API"
import { setLoading, setSignupData, setToken } from "../../redux/slices/authSlice"
import { setUser,setProfileImage, setProfileDetails} from "../../redux/slices/profileSlice"


//Destructing auth endpoints

const {SENDOTP_API, SIGNUP_API, LOGIN_API, RESETTOKEN_API, RESETPASSWORD_API, CONTACTUS_API} = authEndpoints


export function sendotp (email, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Sending OTP")
        dispatch(setLoading(true))
        try {
            await apiConnector("POST", SENDOTP_API, { email });
            toast.success("OTP sent")
            navigate("/verify-email")
        } catch (error) {
            console.log(error);
            toast.error("Failed to send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

} 

export function sendresetpasstoken (email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            await apiConnector("POST", RESETTOKEN_API, {email});
            toast.success("Reset link send to email")
            setEmailSent(true)
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to send reset link")
        }
        dispatch(setLoading(false))
    } 
}   

export function resetPassword (newPassword, confirmNewPassword, token, setResetComplete) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try {
            await apiConnector("POST", RESETPASSWORD_API, {newPassword, confirmNewPassword, token});
            setResetComplete(true)
            toast.success("Password Reset Success")
        } catch (error) {
            console.log(error.message);
            toast.error("Password Reset Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp (signupData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Signing Up")
        dispatch(setLoading(true))
        try {
            await apiConnector("POST", SIGNUP_API, signupData);
            dispatch(setSignupData(null))
            toast.success("SignUp SuccessFul")
            navigate("/login")
        } catch (error) {
            console.log(error.message);
            toast.error("SignUp Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login (loginData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Logging In")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, loginData);
            dispatch(setToken(response.data.existingUser.token))
            dispatch(setUser(response.data.existingUser))
            dispatch(setProfileImage(response.data.existingUser.profileImage))
            dispatch(setProfileDetails(response.data.existingUser.profile))
            localStorage.setItem("token", JSON.stringify(response.data.existingUser.token))
            localStorage.setItem("user", JSON.stringify(response.data.existingUser))
            localStorage.setItem("profileImage", JSON.stringify(response.data.existingUser.profileImage))
            localStorage.setItem("profileDetails", JSON.stringify(response.data.existingUser.profile))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log(error.message);
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function logout (navigate) {
    return async (dispatch) => {
        dispatch(setToken(null))
        localStorage.removeItem("token")
        dispatch(setUser(null))
        localStorage.removeItem("user")
        dispatch(setProfileImage(null))
        localStorage.removeItem("profileImage")
        dispatch(setProfileDetails(null))
        localStorage.removeItem("profileDetails")
        toast.success("Logged Out")
        navigate("/login")
    } 
}

export function contact (contactData) {
    return async (dispatch) => {
        toast.success("Sending Feedback")
        try {
            await apiConnector("POST", CONTACTUS_API, contactData);
            toast.success("Feedback Sent")
        } catch (error) {
            console.log(error);
            toast.error("Failed to send feedback")
        }
    }
} 
