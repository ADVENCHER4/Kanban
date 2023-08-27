import React, {FC} from 'react';
import BoardItem from "../BoardItem/BoardItem";
import cl from './BoardList.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";


const BoardList: FC = () => {
    const boards = useAppSelector(state => state.boards.boards)

    return (
        <div className={cl.boardsList}>
            {
                boards.length ?
                    <>
                        {boards.map(board => <BoardItem {...board} key={board.id}/>)}
                    </>
                    :
                    <h2>No boards</h2>
            }
        </div>
    );
};

export default BoardList;