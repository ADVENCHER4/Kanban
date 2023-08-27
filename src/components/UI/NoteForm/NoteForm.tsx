import React, {FC} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import {INote} from "../../../types";
import TextArea from "../TextArea/TextArea";

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
            <TextArea placeholder='Note' value={note.content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote({
                          ...note,
                          content: e.target.value
                      })}/>
            <Button type='submit'>{buttonTitle}</Button>
        </form>
    );
};

export default NoteForm;