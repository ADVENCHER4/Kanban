import React, {FC} from 'react';
import cl from './Loader.module.css'
const Loader: FC = () => {
    return (
        <div className={cl.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;