import React, {FC} from 'react';
import cl from './TextArea.module.css'

const TextArea: FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    return (
        <textarea {...props} className={cl.area}/>
    );
};

export default TextArea;