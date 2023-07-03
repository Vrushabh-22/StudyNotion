import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
    cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalCost : localStorage.getItem("totalCost") ? JSON.parse(localStorage.getItem("totalCost")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addTocart : (state, actions) => {

            
            const course = actions.payload;
            const index = state.cartItems.findIndex((item) => item._id === course._id)
            
            if(index >= 0){
                toast.success("Course Already Added")
                return
            }

            state.cartItems.push(course)
            state.totalItems++
            state.totalCost += course.price
            
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItem("totalCost", JSON.stringify(state.totalCost))

            toast.success("Course Added To Wishlist")
        },
        removeFromCart : (state, actions) => {

            const courseId = actions.payload
            const index = state.cartItems.findIndex((item) => item._id === courseId)

            if(index >= 0 ){
                state.totalItems--
                state.totalCost -= state.cartItems[index].price
                state.cartItems.splice(index, 1)

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                localStorage.setItem("totalCost", JSON.stringify(state.totalCost))

                toast.success("Course Removed From Wishlist")
            }

        },
        resetCart : (state, actions) => {
            state.cartItems = []
            state.totalItems = 0
            state.totalCost = 0

            localStorage.removeItem("cartItems")
            localStorage.removeItem("totalItems")
            localStorage.removeItem("totalCost")
        }
    }
})



export const {addTocart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;