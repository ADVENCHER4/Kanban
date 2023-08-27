import React, {FC, useState} from 'react';
import Button from "../Button/Button";
import {useAuth} from "../../../hooks/useAuth";
import {useIsAuth} from "../../../hooks/useIsAuth";
import cl from './Nav.module.css'
import IconButton from "../IconButton/IconButton";

interface NavProps {
    title: string;
}

const Nav: FC<NavProps> = ({title}) => {
    const {signOut} = useAuth()
    const {name} = useIsAuth()
    const [isVisible, setVisibility] = useState<boolean>(false)
    return (
        <nav className={cl.nav}>
            <h2>{title}</h2>
            <div className={cl.userModule}>
                <h3>{name}</h3>
                <Button onClick={signOut}>Logout</Button>
            </div>
            <IconButton className={cl.burgerBtn} onClick={() => setVisibility(!isVisible)}>☰</IconButton>
            {isVisible &&
                <div className={cl.burgerMenu} onClick={() => setVisibility(false)}>
                    <div className={cl.burgerMenuContent} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                        <h3>{name}</h3>
                        <Button onClick={signOut}>Logout</Button>
                    </div>
                </div>
            }
        </nav>
    );
};

export default Nav;