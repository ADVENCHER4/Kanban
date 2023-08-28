import {useEffect, useState} from "react";
import {setCurrentBoard} from "../store/Slices/boardsSlice";
import {fetchNotes} from "../store/Slices/notesSlice";
import {fetchStatuses} from "../store/Slices/statusesSlice";
import {useAppDispatch, useAppSelector} from "./reduxHooks";

export const useBoard = (id: number) => {
    const boards = useAppSelector(state => state.boards.boards)
    const dispatch = useAppDispatch()
    const isBoardsPending = useAppSelector(state => state.boards.isPending)
    const [name, setName] = useState<string>('')
    const board = useAppSelector(state => state.boards.currentBoard)

    useEffect(() => {
        if (!isBoardsPending) {
            if(!checkBoardExists())
                throw new Response()
            dispatch(setCurrentBoard(id))
            dispatch(fetchNotes(null))
            dispatch(fetchStatuses(null))
            setName(board?.name || '')
        }
    }, [isBoardsPending, board])

    const checkBoardExists = (): boolean => {
        for (const board of boards) {
            if (board.id === id)
                return true
        }
        return false
    }
    return {name};
}