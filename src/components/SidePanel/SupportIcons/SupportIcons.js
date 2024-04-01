import React from 'react';
import styles from './SupportIcons.module.css'
import cog from "../../../icons/bxs-cog.svg";
import logout from "../../../icons/bxs-log-out.svg";
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../../Requests";

const SupportIcons = () => {
    return (
        <div className={styles.support_icons}>
            <NavLink to='/settings'><div className={styles.inline_block}>
                <div className={styles.image_div}><img src={cog} alt='Dash'/></div>
                <div className={styles.text_div}>Настройки</div>
            </div></NavLink>
            <NavLink to='/auth'><div className={styles.inline_block} onClick={logoutUser}>
                <div className={styles.image_div}><img src={logout} alt='Login'/></div>
                <div className={styles.text_div}><a href='/logout'>Выход</a></div>
            </div></NavLink>
        </div>
    );
};

export default SupportIcons;