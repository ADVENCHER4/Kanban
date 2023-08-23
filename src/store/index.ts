import {configureStore} from "@reduxjs/toolkit";
import noteReducer from './Slices/notesSlice'
import draggingCardReducer from "./Slices/draggingCardSlice";
import statusesReducer from './Slices/statusesSlice'
import editingCardReducer from './Slices/editingNoteSlice';
import modalsReducers from './Slices/modalsSlice'
import userReducer from './Slices/userSlice'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        draggingCard: draggingCardReducer,
        statuses: statusesReducer,
        editingCard: editingCardReducer,
        modals: modalsReducers,
        user: userReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch