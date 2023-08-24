import React, {FC, useEffect} from 'react';
import Container from "../components/Container/Container";
import Divider from "../components/UI/Divider/Divider";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchBoards} from "../store/Slices/boardsSlice";
import Button from "../components/UI/Button/Button";
import {setCreateBoardWindowVisibility} from "../store/Slices/modalsSlice";
import AddBoardWindow from "../components/AddBoardWindow/AddBoardWindow";
import BoardList from "../components/BoardList/BoardList";

const BoardsPage: FC = () => {
    const boards = useAppSelector(state => state.boards.boards)
    const isPending = useAppSelector(state => state.boards.isPending)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchBoards(null))
    }, []);
    const createBoard = () => {
        dispatch(setCreateBoardWindowVisibility(true))
    }
    return (
        <Container>
            <nav>
                <h2 className='board-title'>Boards</h2>
            </nav>
            <Divider/>
            {isPending ?
                <h2>Loading...</h2>
                : <>
                    <BoardList boards={boards}/>
                    <Button onClick={createBoard}>Create board</Button>
                    <AddBoardWindow/>
                </>
            }
        </Container>
    );
};

export default BoardsPage;