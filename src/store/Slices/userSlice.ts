import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types";
import {emptyUser} from "../../utils/constants";

export interface UserState {
    user: IUser;
}

const initialState: UserState = {
    user: emptyUser
};

const statusesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = {...action.payload}
        },
        clearUser(state) {
            state.user = emptyUser;
        }
    }
});

export const {setUser, clearUser} = statusesSlice.actions;
export default statusesSlice.reducer;