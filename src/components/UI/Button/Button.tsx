import React, {FC, PropsWithChildren} from 'react';
import cl from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}
const Button:FC<PropsWithChildren<ButtonProps>> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={cl.button}>
            {children}
        </button>
    );
};

export default Button;