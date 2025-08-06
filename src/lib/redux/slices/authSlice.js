import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const storedUser = Cookies.get('NeoVar_user') ? JSON.parse(Cookies.get('NeoVar_user')) : null;
const initialState = {
    user: storedUser,
    accessToken: Cookies.get("accessToken") || null,
    refreshToken: Cookies.get("refreshToken") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            Cookies.set("NeoVar_user", JSON.stringify(action.payload) , {expires: 7}); // Store user in cookies for 7 days
        },
        logout: (state) => {
            state.user = null;
            Cookies.remove("access_token");
            Cookies.remove("refreshToken");
            Cookies.remove("NeoVar_user");
        },
        seeUser: (state) => {
            const user = Cookies.get('NeoVar_user') ? JSON.parse(Cookies.get('NeoVar_user')) : null;
            state.user = user;
        }

    },
});
export const { setUser, logout, seeUser } = authSlice.actions;
export default authSlice.reducer;