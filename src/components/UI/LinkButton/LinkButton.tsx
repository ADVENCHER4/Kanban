import React, {FC} from 'react';
import {Link, LinkProps} from "react-router-dom";
import cl from './LinkButton.module.css'

const LinkButton: FC<LinkProps> = ({children, ...props}) => {
    return (
        <Link {...props} className={cl.btn}>{children}</Link>
    );
};

export default LinkButton;