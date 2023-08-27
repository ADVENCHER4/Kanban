import React, {FC, PropsWithChildren} from 'react';
import cl from './IconButton.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({children, onClick, className}) => {
    return (
        <button onClick={onClick} className={[cl.button, className].join(' ')}>
            {children}
        </button>
    );
};

export default Button;