import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INote} from "../../types";
import {emptyNote} from "../../utils/constants";
interface DraggingCardState {
    note: INote;
}
const initialState: DraggingCardState = {
    note: emptyNote
};
const draggingCardSlice = createSlice({
    name: 'draggingCard',
    initialState,
    reducers: {
        setDraggingCard(state, action: PayloadAction<INote>) {
            state.note = action.payload;
        }
    }
});

export const {setDraggingCard} = draggingCardSlice.actions;
export default draggingCardSlice.reducer;