import React, {FC, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import {IBoard} from "../../types";
import {emptyBoard, emptyStatus} from "../../utils/constants";
import Button from "../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setCreateBoardWindowVisibility} from "../../store/Slices/modalsSlice";
import {pushBoard} from "../../store/Slices/boardsSlice";

const AddBoardWindow: FC = () => {
    const isVisible = useAppSelector(state => state.modals.createBoardModal)
    const [board, setBoard] = useState<IBoard>(emptyBoard)
    const dispatch = useAppDispatch()
    const setVisibility = (bool: boolean) => {
        dispatch(setCreateBoardWindowVisibility(bool))
    }
    const createNewStatus = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!board.name)
            return;
        setVisibility(false);
        dispatch(pushBoard(board));
        setBoard(emptyBoard);
    }
    return (
        <Modal isVisible={isVisible} setVisibility={setVisibility}>
            <h3>Create board</h3>
            <form onSubmit={createNewStatus}>
                <Input type={'text'} placeholder={'Name'} value={board.name} autoFocus
                       onChange={(e) => setBoard({...board, name: e.target.value})}/>
                <Button type={"submit"}>Add</Button>
            </form>
        </Modal>
    );
};

export default AddBoardWindow;