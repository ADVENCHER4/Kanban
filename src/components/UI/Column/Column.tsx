import React, {FC} from 'react';
import cl from './Column.module.css'
const Column: FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div className={cl.column} {...props}>
            {children}
        </div>
    );
};

export default Column;