import React, {FC} from 'react';
import Modal from "../UI/Modal/Modal";
import NoteForm from "../UI/NoteForm/NoteForm";
import {INote} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setEditingNoteWindowVisibility} from "../../store/Slices/modalsSlice";
import {setEditingNote, updateNote} from "../../store/Slices/notesSlice";

const EditNoteWindow: FC = () => {
    const dispatch = useAppDispatch()
    const editingNote = useAppSelector(state => state.notes.editingNote)
    const isVisible = useAppSelector(state => state.modals.editingNoteModal)

    const setNote = (note: INote) => {
        dispatch(setEditingNote(note))
    }
    const setVisibility = (bool: boolean) => {
        dispatch(setEditingNoteWindowVisibility(bool))
    }
    const changeNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateNote(editingNote));
        setVisibility(false)
    }
    return (
        <Modal isVisible={isVisible} setVisibility={setVisibility}>
            <h3>Edit</h3>
            <NoteForm note={editingNote} setNote={setNote} submitHandler={changeNote} buttonTitle={'Edit'}/>
        </Modal>
    );
};

export default EditNoteWindow;