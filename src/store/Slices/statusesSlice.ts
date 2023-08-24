import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFetchable, IStatus} from "../../types";
import {defaultStatuses} from "../../utils/constants";
import {UserState} from "./userSlice";
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {Dispatch} from "../index";
import {BoardsState} from "./boardsSlice";

export const fetchStatuses = createAsyncThunk<IStatus[], null, {
    rejectWithValue: string,
    state: { user: UserState, boards: BoardsState }
}>
(
    'statuses/fetchStatuses',
    async (_, {rejectWithValue, getState}) => {
        try {
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            const querySnapshot = await getDocs(collection(db, `users/${user.id}/boards/${boardId}/statuses`));
            let fetchedStatuses: IStatus[] = []
            if (querySnapshot.empty) {
                fetchedStatuses = defaultStatuses;
                for (let i = 0; i < defaultStatuses.length; i++) {
                    const status = defaultStatuses[i]
                    await setDoc(doc(db, `users/${user.id}/boards/${boardId}/statuses`, `${status.id}`), status);
                }
            } else {
                querySnapshot.forEach((doc) => {
                    fetchedStatuses.push(doc.data() as IStatus);
                })
            }
            return fetchedStatuses;
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const pushStatus = createAsyncThunk<undefined, IStatus, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: { user: UserState, boards: BoardsState }
}>
(
    'statuses/pushStatus',
    async (status, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(addStatus(status))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await setDoc(doc(db, `users/${user.id}/boards/${boardId}/statuses`, `${status.id}`), status);
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const deleteStatus = createAsyncThunk<undefined, number, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: { user: UserState, boards: BoardsState }
}>
(
    'statuses/deleteStatus',
    async (id, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(removeStatus(id))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await deleteDoc(doc(db, `users/${user.id}/boards/${boardId}/status/${id}`));

        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

interface StatusesState extends IFetchable {
    statuses: IStatus[];
}

const initialState: StatusesState = {
    statuses: [],
    isPending: true,
};

const statusesSlice = createSlice({
    name: 'statuses',
    initialState,
    reducers: {
        addStatus(state, action: PayloadAction<IStatus>) {
            const s = action.payload;
            s.id = state.statuses.length;
            state.statuses.push(s);
        },
        removeStatus(state, action: PayloadAction<number>) {
            state.statuses = state.statuses.filter((s: IStatus) => s.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchStatuses.pending,
            (state) => {
                state.isPending = true;
            })
        builder.addCase(fetchStatuses.fulfilled,
            (state, action) => {
                state.statuses = action.payload;
                state.isPending = false;
            })
        builder.addCase(fetchStatuses.rejected,
            (state) => {
                state.isPending = false;
            })
    }
});

const {addStatus, removeStatus} = statusesSlice.actions;
export default statusesSlice.reducer;