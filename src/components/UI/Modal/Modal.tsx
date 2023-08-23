import React, {Dispatch, FC, PropsWithChildren, SetStateAction} from 'react';
import classes from "./Modal.module.css";

export interface ModalProps {
    isVisible: boolean;
    setVisibility: (bool: boolean) => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({children, isVisible, setVisibility}) => {
    const modalClasses: string[] = [classes.modal];
    if (isVisible) {
        modalClasses.push(classes.active);
    }
    return (
        <div className={modalClasses.join(' ')} onClick={() => setVisibility(false)}>
            <div className={classes.modalContent}
                 onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;