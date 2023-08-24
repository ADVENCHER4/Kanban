import React, {FC} from 'react';
import {IBoard} from "../../types";
import BoardItem from "../BoardItem/BoardItem";
import cl from './BoardList.module.css'
interface BoardsListProps {
    boards: IBoard[];
}

const BoardList: FC<BoardsListProps> = ({boards}) => {
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