import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INote} from "../../types";
import {emptyNote} from "../../utils/constants";
interface EditingNoteState {
    note: INote;
}
const initialState: EditingNoteState = {
    note: emptyNote
};
const editingSlice = createSlice({
    name: 'editingCard',
    initialState,
    reducers: {
        setEditingNote(state, action: PayloadAction<INote>) {
            state.note = action.payload;
        }
    }
});

export const {setEditingNote} = editingSlice.actions;
export default editingSlice.reducer;