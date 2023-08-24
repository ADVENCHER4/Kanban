import React, {FC} from 'react';
import {IBoard} from "../../types";
import cl from './BoardItem.module.css'
import {Link} from "react-router-dom";
import Button from "../UI/Button/Button";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {deleteBoard, setCurrentBoard} from "../../store/Slices/boardsSlice";

const BoardItem: FC<IBoard> = ({id, name}) => {
    const dispatch = useAppDispatch()
    const clickHandler = () => {
        dispatch(setCurrentBoard(id))
    }
    const remove = () => {
        dispatch(deleteBoard(id))
    }
    return (
        <div className={cl.boardItem}>
            <Link to={`/boards/${id}`} onClick={clickHandler}>{name}</Link>
            <Button onClick={remove}>x</Button>
        </div>
    );
};

export default BoardItem;