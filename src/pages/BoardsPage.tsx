import React, {FC, useEffect} from 'react';
import Container from "../components/Container/Container";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import Button from "../components/UI/Button/Button";
import {setCreateBoardWindowVisibility} from "../store/Slices/modalsSlice";
import AddBoardWindow from "../components/AddBoardWindow/AddBoardWindow";
import BoardList from "../components/BoardList/BoardList";
import Nav from "../components/UI/Nav/Nav";
import Loader from "../components/UI/Loader/Loader";
import {fetchBoards} from "../store/Slices/boardsSlice";

const BoardsPage: FC = () => {
    const isPending = useAppSelector(state => state.boards.isPending)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchBoards(null))
    }, []);
    const createBoard = () => {
        dispatch(setCreateBoardWindowVisibility(true))
    }
    return (
        <>
            <Nav title='Boards'/>
            <Container>
                {isPending ?
                    <Loader/>
                    : <>
                        <BoardList/>
                        <Button onClick={createBoard}>Create board</Button>
                        <AddBoardWindow/>
                    </>
                }
            </Container>
        </>
    );
};

export default BoardsPage;