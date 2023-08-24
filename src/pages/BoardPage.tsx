import React, {FC, useEffect, useState} from 'react';
import '../styles/Board.css'
import AddNoteWindow from "../components/AddNoteWindow/AddNoteWindow";
import {IStatus} from "../types";
import {emptyStatus} from "../utils/constants";
import AddStatusWindow from "../components/AddStatusWindow/AddStatusWindow";
import NotesColumns from "../components/NotesColumns/NotesColumns";
import EditNoteWindow from "../components/EditNoteWindow/EditNoteWindow";
import Container from "../components/Container/Container";
import Button from '../components/UI/Button/Button';
import {useAuth} from "../hooks/useAuth";
import {fetchNotes} from "../store/Slices/notesSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchStatuses} from "../store/Slices/statusesSlice";
import Divider from "../components/UI/Divider/Divider";

const App: FC = () => {
    const [newStatus, setNewStatus] = useState<IStatus>(emptyStatus);
    const {signOut} = useAuth()
    const {name} = useAppSelector(state => state.boards.currentBoard!)
    const dispatch = useAppDispatch()
    const isNotesPending = useAppSelector(state => state.notes.isPending)
    const isStatusesPending = useAppSelector(state => state.statuses.isPending)

    useEffect(() => {
        dispatch(fetchNotes(null))
        dispatch(fetchStatuses(null))
    }, [])
    return (
        <Container>
            <nav>
                <h2 className='board-title'>{name}</h2>
                <Button onClick={signOut}>Logout</Button>
            </nav>
            <Divider/>
            {isNotesPending || isStatusesPending ?
                <h2>Loading...</h2>
                :
                <>
                    <NotesColumns setNewNoteStatus={setNewStatus}/>
                    <AddNoteWindow status={newStatus}/>
                    <AddStatusWindow/>
                    <EditNoteWindow/>
                </>
            }
        </Container>
    );
};

export default App;