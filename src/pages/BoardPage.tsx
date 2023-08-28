import React, {FC, useEffect, useMemo, useState} from 'react';
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
import {fetchBoards, setCurrentBoard} from "../store/Slices/boardsSlice";
import {useBoard} from "../hooks/useBoard";

const BoardPage: FC = () => {
    const id = Number(useParams<{ id: string }>().id)
    const isNotesPending = useAppSelector(state => state.notes.isPending)
    const isStatusesPending = useAppSelector(state => state.statuses.isPending)
    const isBoardsPending = useAppSelector(state => state.boards.isPending)
    const [newStatus, setNewStatus] = useState<IStatus>(emptyStatus);
    const isShowLoader = isBoardsPending || isStatusesPending || isNotesPending
    const {name} = useBoard(id)
    return (
        <>
            <Nav title={name}/>
            <Container>
                {isShowLoader ?
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