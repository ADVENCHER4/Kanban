import React, {FC} from 'react';
import {IStatus} from "../../../types";
import cl from './Status.module.css'

export interface StatusProps {
    status: IStatus;
}

const Status: FC<StatusProps> = ({status}) => {
    return (
        <div className={cl.status} style={{background: status.color}}>
            {status.status}
        </div>
    );
};

export default Status;