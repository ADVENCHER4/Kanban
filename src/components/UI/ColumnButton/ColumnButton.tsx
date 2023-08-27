import React, {FC} from 'react';
import cl from './ColumnButton.module.css';

const ColumnButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
    ({
         children,
         onClick,
         ...props
     }) => {
        return (
            <button onClick={onClick} className={cl.button} {...props}>
                {children}
            </button>
        );
    };

export default ColumnButton;