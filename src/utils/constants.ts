import {IBoard, INote, IStatus, IUser} from "../types";

export const emptyUser: IUser = {
    id: '',
    name: '',
    email: '',
}
export const emptyStatus: IStatus = {
    id: 0,
    status: '',
    color: ''
}

export const emptyNote: INote = {
    id: 0,
    title: '',
    status: emptyStatus,
    content: ''
}

export const emptyBoard: IBoard = {
    id: 0,
    name: ''
}

export const defaultStatuses: IStatus[] = [
    {
        id: 0,
        status: 'Not started',
        color: '#ff8187'
    },
    {
        id: 1,
        status: 'In progress',
        color: '#fff77d'
    },
    {
        id: 2,
        status: 'Done',
        color: '#98ff9b'
    }
]