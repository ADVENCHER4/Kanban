import React, {FC, InputHTMLAttributes} from 'react';
import cl from './Input.module.css'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input {...props} className={cl.input} autoComplete='off'/>
    );
};

export default Input;