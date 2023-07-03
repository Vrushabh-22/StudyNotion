import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import courseSlice from "./slices/courseSlice";
import viewCourseSlice from "./slices/viewCourseSlice";



const store = configureStore({
    reducer: {
        auth : authSlice,
        cart : cartSlice,
        profile: profileSlice,
        course: courseSlice,
        viewCourse: viewCourseSlice
    }
});

export default store;