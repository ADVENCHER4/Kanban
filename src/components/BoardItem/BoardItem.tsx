import React, {FC} from 'react';
import {IBoard} from "../../types";
import cl from './BoardItem.module.css'
import {useAppDispatch} from "../../hooks/reduxHooks";
import {deleteBoard, setCurrentBoard} from "../../store/Slices/boardsSlice";
import {useNavigate} from "react-router-dom";
import IconButton from "../UI/IconButton/IconButton";

const BoardItem: FC<IBoard> = ({id, name}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const clickHandler = () => {
        dispatch(setCurrentBoard(id))
        navigate(`/boards/${id}`)
    }
    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(deleteBoard(id))
    }
    return (
        <div className={cl.boardItem} onClick={clickHandler}>
            <h3>{name}</h3>
            <IconButton onClick={remove}>x</IconButton>
        </div>
    );
};

export default BoardItem;