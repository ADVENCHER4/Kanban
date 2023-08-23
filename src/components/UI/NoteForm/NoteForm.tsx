import React, {FC, SetStateAction} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import {INote} from "../../../types";

interface NoteFormProps {
    note: INote;
    setNote: (note: INote) => void;
    buttonTitle: string;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}
const NoteForm: FC<NoteFormProps> = ({note, setNote, submitHandler, buttonTitle}) => {
    return (
        <form onSubmit={submitHandler}>
            <Input type='text' placeholder='Title' value={note.title} autoFocus
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote({
                       ...note,
                       title: e.target.value
                   })}/>
            <Input type='text' placeholder='Note' value={note.content}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote({
                       ...note,
                       content: e.target.value
                   })}/>
            <Button type='submit'>{buttonTitle}</Button>
        </form>
    );
};

export default NoteForm;