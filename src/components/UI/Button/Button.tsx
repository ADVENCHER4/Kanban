import React, {FC} from 'react';
import cl from './Button.module.css'


const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
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

export default Button;