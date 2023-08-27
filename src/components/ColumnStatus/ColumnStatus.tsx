import React, {FC} from 'react';
import {IStatus} from "../../types";
import cl from "./ColumnStatus.module.css";
import Status from "../UI/Status/Status";
import {removeNotesByStatus} from "../../store/Slices/notesSlice";
import {deleteStatus} from "../../store/Slices/statusesSlice";
import {useAppDispatch} from "../../hooks/reduxHooks";
import IconButton from "../UI/IconButton/IconButton";

interface ColumnStatusProps {
    status: IStatus;
}

const ColumnStatus: FC<ColumnStatusProps> = ({status}) => {
    const dispatch = useAppDispatch()
    const deleteColumn = () => {
        dispatch(removeNotesByStatus(status))
        dispatch(deleteStatus(status.id))
    }
    return (
        <div className={cl.columnStatus}>
            <Status status={status}/>
            <IconButton onClick={deleteColumn}>x</IconButton>
        </div>
    );
};

export default ColumnStatus;