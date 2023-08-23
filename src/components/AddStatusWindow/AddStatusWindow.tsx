import React, {FC, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import {IStatus} from "../../types";
import {emptyStatus} from "../../utils/constants";
import Button from "../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {pushStatus} from "../../store/Slices/statusesSlice";
import {setAddStatusWindowVisibility} from "../../store/Slices/modalsSlice";

const AddStatusWindow: FC = () => {
    const isVisible = useAppSelector(state => state.modals.addStatusModal)
    const [status, setStatus] = useState<IStatus>(emptyStatus)
    const dispatch = useAppDispatch()
    const setVisibility = (bool: boolean) => {
        dispatch(setAddStatusWindowVisibility(bool))
    }
    const createNewStatus = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!status.status)
            return;
        setVisibility(false);
        dispatch(pushStatus(status));
        setStatus(emptyStatus);
    }
    return (
        <Modal isVisible={isVisible} setVisibility={setVisibility}>
            <h3>Add status</h3>
            <form onSubmit={createNewStatus}>
                <Input type={'text'} placeholder={'Status'} value={status.status} autoFocus
                       onChange={(e) => setStatus({...status, status: e.target.value})}/>
                <Input type={"color"} value={status.color}
                       onChange={(e) => setStatus({...status, color: e.target.value})}/>
                <Button type={"submit"}>Add</Button>
            </form>
        </Modal>
    );
};

export default AddStatusWindow;