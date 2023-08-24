export interface IStatus {
    id: number;
    status: string;
    color: string;
}

export interface INote {
    id: number;
    title: string;
    content: string;
    status: IStatus;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IFetchable {
    isPending: boolean;
    error?: string;
}

export interface IBoard {
    id: number;
    name: string;
}



