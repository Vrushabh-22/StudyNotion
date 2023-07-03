import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signupData:null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setLoading : (state, actions) => {
            state.loading = actions.payload
        },
        setToken : (state, actions ) => {
            state.token = actions.payload
        },
        setSignupData : (state, actions ) => {
            state.signupData = actions.payload
        },
    }

});

export const {setToken, setSignupData, setLoading} = authSlice.actions;
export default authSlice.reducer