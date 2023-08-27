import React, {FC} from 'react';
import cl from './ErrorSpan.module.css'
const ErrorSpan: FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className={cl.err}>
            {children}
        </div>
    );
};

export default ErrorSpan;