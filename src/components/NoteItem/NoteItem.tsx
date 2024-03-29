import React, {FC} from 'react';
import cl from './NoteItem.module.css'
import {INote} from "../../types";
import Status from "../UI/Status/Status";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {removeNote, setDraggingCard, setEditingNote} from "../../store/Slices/notesSlice";
import {setEditingNoteWindowVisibility} from "../../store/Slices/modalsSlice";
import IconButton from "../UI/IconButton/IconButton";

const NoteItem: FC<INote> = ({id, title, status, content}) => {
    const dispatch = useAppDispatch()
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(setDraggingCard({id, title, status, content}));
    }
    const clickHandler = () => {
        dispatch(setEditingNote({id, title, status, content}))
        dispatch(setEditingNoteWindowVisibility(true))
    }
    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(removeNote(id))
    }
    return (
        <div className={cl.noteCard} draggable onDrag={dragHandler} onClick={clickHandler}>
            <div>
                <h3 className={cl.title}>{title}</h3>
                <div className={cl.status}>
                    <Status status={status}/>
                </div>
                <p className={cl.content}>{content}</p>
            </div>
            <IconButton onClick={deleteHandler}>x</IconButton>
        </div>
    );
};

export default NoteItem;