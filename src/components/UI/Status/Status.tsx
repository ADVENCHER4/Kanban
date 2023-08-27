import React, {FC} from 'react';
import {IStatus} from "../../../types";
import cl from './Status.module.css'

export interface StatusProps {
    status: IStatus;
}

const Status: FC<StatusProps> = ({status}) => {
    return (
        <div className={cl.status} >
            <div style={{background: status.color}} className={cl.indicator}/>
            {status.status}
        </div>
    );
};

export default Status;