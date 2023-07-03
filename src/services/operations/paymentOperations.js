import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import logo from "../../assets/Logo/rzp_logo.png"


const { paymentEndpoints } = require("../API");


const {CRAETEORDER_API, VERIFYSIGNATURE_API} = paymentEndpoints


export async function buyCourse (courses, token, user, navigate, dispatch) {
    let response
    const toastId = toast.loading("Order Being Placed")
    try {
        response = await apiConnector("POST", CRAETEORDER_API, {courses}, 
        {Authorization : `Bearer ${token}`});

        const options = {
            key : process.env.RAZORPAY_KEY,
            amount : response.data.order.amount,
            currency : response.data.order.currency,
            name : "StudyNotion",
            description : "Thank you for purchase",
            image : logo,
            order_id: response.data.order.id,
            handler: function (resp) {
                
                verifyPayment({...resp, courses}, token, navigate, dispatch)
            },
            prefill: {
                name: `${user.name}`,
                email: user.email,
            },
            theme: {
                "color" : "#026144"
            }
        }

        const razer = new window.Razorpay(options)
        razer.open();
        
    } catch (error) {
        console.log(error)
        toast.error(response.data.message)
    }
    toast.dismiss(toastId)

}


export async function verifyPayment (data, token, navigate, dispatch) {

    const toastId = toast.loading("Verifying Payment")
    try {

        const response = await apiConnector("POST", VERIFYSIGNATURE_API, data, {Authorization : `Bearer ${token}`})

        if(!response.data.success){
            toast.error("Payment Failed")
        }
        toast.success("Payment Successful");
        navigate("/dashboard/enrolled-courses")

    } catch (error) {
        console.log(error)
    }
    toast.dismiss(toastId)
}

