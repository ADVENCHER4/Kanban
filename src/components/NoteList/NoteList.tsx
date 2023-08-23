import React, {FC} from 'react';
import NoteItem from "../NoteItem/NoteItem";
import cl from './NoteList.module.css'
import {INote, IStatus} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useAppSelector} from "../../hooks/reduxHooks";

interface NoteListProps {
    status: IStatus;
}

const NoteList: FC<NoteListProps> = ({status}) => {
    const notes = useAppSelector(state => state.notes.notes);
    return (
        <div className={cl.noteList}>
            {notes.map(n => {
                    if (n.status.id === status.id) {
                        return (<NoteItem {...n} key={n.id}/>);
                    }
                }
            )}
        </div>
    );
};

export default NoteList;