import React, {FC} from 'react';
import cl from './Container.module.css'
const Container: FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className={cl.container}>
            {children}
        </div>
    );
};

export default Container;