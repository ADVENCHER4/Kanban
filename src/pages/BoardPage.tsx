import React, {FC, useEffect, useState} from 'react';
import AddNoteWindow from "../components/AddNoteWindow/AddNoteWindow";
import {IStatus} from "../types";
import {emptyStatus} from "../utils/constants";
import AddStatusWindow from "../components/AddStatusWindow/AddStatusWindow";
import NotesColumns from "../components/NotesColumns/NotesColumns";
import EditNoteWindow from "../components/EditNoteWindow/EditNoteWindow";
import Container from "../components/Container/Container";
import {fetchNotes} from "../store/Slices/notesSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchStatuses} from "../store/Slices/statusesSlice";
import Nav from "../components/UI/Nav/Nav";
import {useParams} from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";

const BoardPage: FC = () => {
    const id = Number(useParams<{ id: string }>().id)
    const {name} = useAppSelector(state => state.boards.currentBoard!)
    const boards = useAppSelector(state => state.boards.boards)
    const dispatch = useAppDispatch()
    const isNotesPending = useAppSelector(state => state.notes.isPending)
    const isStatusesPending = useAppSelector(state => state.statuses.isPending)
    const [newStatus, setNewStatus] = useState<IStatus>(emptyStatus);

    const checkExists = (): boolean => {
        for (const board of boards) {
            if (board.id === id)
                return true;
        }
        return false;
    }

    useEffect(() => {
        dispatch(fetchNotes(null))
        dispatch(fetchStatuses(null))
        // console.log(checkExists())
        // console.log(board)
    }, [])
    return (
        <>
            <Nav title={name}/>
            <Container>
                {isNotesPending || isStatusesPending ?
                    <Loader/>
                    :
                    <>
                        <NotesColumns setNewNoteStatus={setNewStatus}/>
                        <AddNoteWindow status={newStatus}/>
                        <AddStatusWindow/>
                        <EditNoteWindow/>
                    </>
                }
            </Container>
        </>
    );
};

export default BoardPage;