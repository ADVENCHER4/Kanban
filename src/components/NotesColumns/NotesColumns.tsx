import React, {FC} from 'react';
import cl from './NotesColumns.module.css'
import NotesColumn from "../NotesColumn/NotesColumn";
import Button from "../UI/Button/Button";
import {IStatus} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setAddStatusWindowVisibility} from "../../store/Slices/modalsSlice";

interface ColumnsProps {
    setNewNoteStatus: (status: IStatus) => void;
}
const NotesColumns: FC<ColumnsProps> = ({setNewNoteStatus}) => {
    const dispatch = useAppDispatch()
    const showAddStatusWindow = () => dispatch(setAddStatusWindowVisibility(true))
    const statuses = useAppSelector(state => state.statuses.statuses)
    return (
        <div className={cl.columns}>
            {statuses.map(status =>
                <NotesColumn status={status} setNewNoteStatus={setNewNoteStatus} key={status.id}/>
            )}
            <Button onClick={showAddStatusWindow}>+</Button>
        </div>
    );
};

export default NotesColumns;