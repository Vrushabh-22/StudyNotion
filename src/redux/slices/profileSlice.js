import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    profileDetails : localStorage.getItem("profileDetails") ? JSON.parse(localStorage.getItem("profileDetails")) : null,
    profileImage : localStorage.getItem("profileImage") ? JSON.parse(localStorage.getItem("profileImage")) : null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload
        },
        setProfileImage : (state, actions) => {
            state.profileImage = actions.payload
        },
        setProfileDetails : (state, actions) => {
            state.profileDetails = actions.payload
        },
        
    }
});


export const {setUser, setProfileDetails, setProfileImage} = profileSlice.actions;
export default profileSlice.reducer;