import {configureStore} from "@reduxjs/toolkit";
import noteReducer from './Slices/notesSlice'
import statusesReducer from './Slices/statusesSlice'
import modalsReducers from './Slices/modalsSlice'
import userReducer from './Slices/userSlice'
import boardsReducer from './Slices/boardsSlice'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        statuses: statusesReducer,
        modals: modalsReducers,
        user: userReducer,
        boards: boardsReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch