import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        registerSuccess: false,
        isLoggedIn: false,
        authUser: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.authUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.rejected, (state) => {
                state.registerSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.registerSuccess = true;
            })
            .addCase(userLogin.rejected, (state) => {
                state.isLoggedIn = false;
                state.authUser = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.authUser = action.payload.user;
            })
    }
});

export const authActions = authSlice.actions;
export default authSlice;