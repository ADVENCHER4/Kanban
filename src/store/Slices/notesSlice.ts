import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFetchable, INote, IStatus} from "../../types";
import {db} from "../../firebase";
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {Dispatch} from "../index";
import {UserState} from "./userSlice";
import {BoardsState} from "./boardsSlice";
import {emptyNote} from "../../utils/constants";

export const fetchNotes = createAsyncThunk<INote[], null, {
    rejectWithValue: string,
    state: {
        user: UserState,
        boards: BoardsState
    }
}>
(
    'notes/fetchNotes',
    async (_, {rejectWithValue, getState}) => {
        try {
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            const querySnapshot = await getDocs(collection(db, `users/${user.id}/boards/${boardId}/notes`));
            const fetchedNotes: INote[] = []
            querySnapshot.forEach((doc) => {
                fetchedNotes.push(doc.data() as INote);
            })
            return fetchedNotes;
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const pushNote = createAsyncThunk<undefined, INote, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: {
        user: UserState,
        boards: BoardsState
    }
}>
(
    'notes/pushNote',
    async (note, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(createNote(note))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await setDoc(doc(db, `users/${user.id}/boards/${boardId}/notes`, `${note.id}`), note);
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const updateNoteStatus = createAsyncThunk<undefined, {
    id: number,
    newStatus: IStatus
}, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: {
        user: UserState,
        boards: BoardsState
    }
}>
(
    'notes/updateNoteStatus',
    async ({id, newStatus}, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(changeNoteStatus({id, newStatus}))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await updateDoc(doc(db, `users/${user.id}/boards/${boardId}/notes/${id}`), {
                status: newStatus
            });
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const updateNote = createAsyncThunk<undefined, INote, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: {
        user: UserState,
        boards: BoardsState
    }
}>
(
    'notes/updateNote',
    async (note, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(editNote(note))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await updateDoc(doc(db, `users/${user.id}/boards/${boardId}/notes/${note.id}`), {
                title: note.title,
                content: note.content
            });
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const removeNote = createAsyncThunk<undefined, number, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: {
        user: UserState,
        boards: BoardsState
    }
}>
(
    'notes/removeNote',
    async (id, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(deleteNote(id))
            const user = getState().user.user;
            const boardId = getState().boards.currentBoard?.id;
            await deleteDoc(doc(db, `users/${user.id}/boards/${boardId}/notes/${id}`));
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const removeNotesByStatus = createAsyncThunk<undefined, IStatus, {
    rejectWithValue: string,
    dispatch: Dispatch,
    state: {
        user: UserState,
        notes: NotesState,
        boards: BoardsState
    }
}>
(
    'notes/removeNotesByStatus',
    async (status, {dispatch, rejectWithValue, getState}) => {
        try {
            const user = getState().user.user;
            const notes = getState().notes.notes;
            const boardId = getState().boards.currentBoard?.id;
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i]
                if (note.status === status) {
                    dispatch(deleteNote(note.id))
                    await deleteDoc(doc(db, `users/${user.id}/boards/${boardId}/notes/${note.id}`));
                }
            }
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

interface NotesState extends IFetchable {
    notes: INote[];
    draggingNote: INote;
    editingNote: INote;
}

const initialState: NotesState = {
    notes: [],
    draggingNote: emptyNote,
    editingNote: emptyNote,
    isPending: true,
};
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action: PayloadAction<INote>) {
            state.notes.push(action.payload);
        },
        changeNoteStatus(state, action: PayloadAction<{
            id: number,
            newStatus: IStatus
        }>) {
            state.notes.forEach((n: INote) => {
                if (n.id === action.payload.id) {
                    n.status = action.payload.newStatus;
                }
            });
        },
        editNote(state, action: PayloadAction<INote>) {
            const editingNote = state.notes.find((note: INote) => note.id === action.payload.id);
            if (editingNote) {
                editingNote.title = action.payload.title;
                editingNote.content = action.payload.content;
            }
        },
        deleteNote(state, action: PayloadAction<number>) {
            state.notes = state.notes.filter((n: INote) => n.id !== action.payload)
        },
        setDraggingCard(state, action: PayloadAction<INote>) {
            state.draggingNote = action.payload;
        },
        setEditingNote(state, action: PayloadAction<INote>) {
            state.editingNote = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchNotes.pending,
            (state) => {
                state.isPending = true;
            })
        builder.addCase(fetchNotes.fulfilled,
            (state, action) => {
                state.notes = action.payload
                state.isPending = false;
            })
        builder.addCase(fetchNotes.rejected,
            (state) => {
                state.isPending = false;
            })
    }
});

const {createNote, changeNoteStatus, deleteNote, editNote} = notesSlice.actions;
export const {setDraggingCard, setEditingNote} = notesSlice.actions
export default notesSlice.reducer;