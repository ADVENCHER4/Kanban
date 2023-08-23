import React, {FC} from 'react';
import {IStatus} from "../../types";
import NoteList from "../NoteList/NoteList";
import Button from "../UI/Button/Button";
import cl from './NotesColumn.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {updateNoteStatus} from "../../store/Slices/notesSlice";
import {setCreateNoteWindowVisibility} from "../../store/Slices/modalsSlice";
import ColumnStatus from "../ColumnStatus/ColumnStatus";

interface NotesColumnProps {
    status: IStatus;
    setNewNoteStatus: (status: IStatus) => void;
}

const NotesColumn: FC<NotesColumnProps> = ({status, setNewNoteStatus}) => {
    const dispatch = useAppDispatch()
    const draggingCard = useAppSelector(state => state.draggingCard.note)
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(updateNoteStatus({id: draggingCard.id, newStatus: status}))
    }

    return (
        <div className={cl.column} onDragOver={dragOverHandler} onDrop={(e) => dropHandler(e)}>
            <ColumnStatus status={status}/>
            <div className={cl.columnContent}>
                <NoteList status={status}/>
                <Button onClick={() => {
                    dispatch(setCreateNoteWindowVisibility(true))
                    setNewNoteStatus(status)
                }
                }>Add</Button>
            </div>
        </div>
    );
};

export default NotesColumn;