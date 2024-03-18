import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { user } from "../../src/LoginPage"

export type LoginState={
    loggedUser:user|null
}
const initialState: LoginState={
    loggedUser:null
}
export const loginSlice = createSlice({
    initialState,
    name:'login',
    reducers:{
        userLogin:(state, action: PayloadAction<user>) =>{
            state.loggedUser = action.payload
        },
        userLogout:(state)=>{
            state.loggedUser = null
        }
    }
})
export const {userLogin, userLogout} = loginSlice.actions
const loginReducer = loginSlice.reducer
export default loginReducer