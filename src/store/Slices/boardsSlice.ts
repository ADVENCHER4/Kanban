import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBoard, IFetchable} from "../../types";
import {UserState} from "./userSlice";
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {Dispatch} from "../index";

export const fetchBoards = createAsyncThunk<IBoard[], null, {
    rejectWithValue: string,
    state: { user: UserState }
}>
(
    'boards/fetchStatuses',
    async (_, {rejectWithValue, getState}) => {
        try {
            const user = getState().user.user;
            const querySnapshot = await getDocs(collection(db, `users/${user.id}/boards`));
            const fetchedBoards: IBoard[] = []
            querySnapshot.forEach((doc) => {
                fetchedBoards.push(doc.data() as IBoard);
            })
            return fetchedBoards;
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const pushBoard = createAsyncThunk<undefined, IBoard, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: { user: UserState }
}>
(
    'boards/pushBoard',
    async (board, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(addBoard(board))
            const user = getState().user.user;
            await setDoc(doc(db, `users/${user.id}/boards`, `${board.id}`), board);
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const deleteBoard = createAsyncThunk<undefined, number, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: { user: UserState }
}>
(
    'boards/deleteBoard',
    async (id, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(removeBoard(id))
            const user = getState().user.user;
            const notesRef = collection(db, `users/${user.id}/boards/${id}/notes`)
            const statusesRef = collection(db, `users/${user.id}/boards/${id}/statuses`)
            const notesQuerySnapshot = await getDocs(notesRef)
            for (let i = 0; i < notesQuerySnapshot.size; i++) {
                const document = notesQuerySnapshot.docs[i]
                await deleteDoc(doc(db, document.ref.path))
            }
            const statusesQuerySnapshot = await getDocs(statusesRef)
            for (let i = 0; i < statusesQuerySnapshot.size; i++) {
                const document = statusesQuerySnapshot.docs[i]
                await deleteDoc(doc(db, document.ref.path))
            }
            await deleteDoc(doc(db, `users/${user.id}/boards/${id}`));
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export interface BoardsState extends IFetchable {
    boards: IBoard[];
    currentBoard: IBoard | undefined;
}

const initialState: BoardsState = {
    boards: [],
    currentBoard: undefined,
    isPending: true,
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard(state, action: PayloadAction<IBoard>) {
            const b = action.payload;
            b.id = Date.now();
            state.boards.push(b);
        },
        removeBoard(state, action: PayloadAction<number>) {
            state.boards = state.boards.filter((b: IBoard) => b.id !== action.payload)
        },
        setCurrentBoard(state, action: PayloadAction<number>) {
            state.currentBoard = state.boards.find((b: IBoard) => b.id === action.payload)
        },
    },
    extraReducers({addCase}) {
        addCase(fetchBoards.pending,
            (state) => {
                state.isPending = true;
            })
        addCase(fetchBoards.fulfilled,
            (state, action) => {
                state.boards = action.payload;
                state.isPending = false;
            })
        addCase(fetchBoards.rejected,
            (state) => {
                state.isPending = false;
            })
    }
});

const {addBoard, removeBoard} = boardsSlice.actions;
export const {setCurrentBoard} = boardsSlice.actions
export default boardsSlice.reducer;