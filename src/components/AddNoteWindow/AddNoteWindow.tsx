import React, {FC, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import {INote, IStatus} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {pushNote} from "../../store/Slices/notesSlice";
import {emptyNote} from "../../utils/constants";
import NoteForm from "../UI/NoteForm/NoteForm";
import {setCreateNoteWindowVisibility} from "../../store/Slices/modalsSlice";

interface AddNoteWindowProps {
    status: IStatus;
}

const AddNoteWindow: FC<AddNoteWindowProps> = ({status}) => {
    const isVisible = useAppSelector(state => state.modals.createNoteModal)
    const [note, setNote] = useState<INote>(emptyNote);
    const dispatch = useAppDispatch();
    const setVisibility = (bool: boolean) => {
        dispatch(setCreateNoteWindowVisibility(bool))
    }
    const addNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!(note.title || note.content))
            return;
        const newNote = {
            ...note,
            id: Date.now(),
            status: status
        }
        dispatch(pushNote(newNote))
        setNote({...note, title: '', content: ''});
        setVisibility(false);
    }
    return (
        <Modal isVisible={isVisible} setVisibility={setVisibility}>
            <h3>New note</h3>
            <NoteForm note={note} setNote={setNote} submitHandler={addNote} buttonTitle={'Add'}/>
        </Modal>
    );
};

export default AddNoteWindow;