import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalsState {
    editingNoteModal: boolean;
    addStatusModal: boolean;
    createNoteModal: boolean;
    createBoardModal: boolean;
}

const initialState: ModalsState = {
    editingNoteModal: false,
    addStatusModal: false,
    createNoteModal: false,
    createBoardModal: false,
};
const notesSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setEditingNoteWindowVisibility(state, action: PayloadAction<boolean>) {
            state.editingNoteModal = action.payload;
        },
        setAddStatusWindowVisibility(state, action: PayloadAction<boolean>) {
            state.addStatusModal = action.payload;
        },
        setCreateNoteWindowVisibility(state, action: PayloadAction<boolean>) {
            state.createNoteModal = action.payload;
        },
        setCreateBoardWindowVisibility(state, action: PayloadAction<boolean>) {
            state.createBoardModal = action.payload;
        },
    }
});

export const {setEditingNoteWindowVisibility, setCreateNoteWindowVisibility, setAddStatusWindowVisibility, setCreateBoardWindowVisibility} = notesSlice.actions;
export default notesSlice.reducer;