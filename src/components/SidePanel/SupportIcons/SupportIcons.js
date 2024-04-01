import React from 'react';
import styles from './SupportIcons.module.css'
import cog from "../../../icons/bxs-cog.svg";
import logout from "../../../icons/bxs-log-out.svg";
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../../Requests";
import {authStorage} from "../../../storages/AuthStorage";

const SupportIcons = () => {
    const key = authStorage((state) => state.key)
    const resetKey = authStorage((state) => state.resetKey)
    function logoutF(){
        resetKey('')
        logoutUser(key)
    }
    return (
        <div className={styles.support_icons}>
            <NavLink to='/settings'><div className={styles.inline_block}>
                <div className={styles.image_div}><img src={cog} alt='Dash'/></div>
                <div className={styles.text_div}>Настройки</div>
            </div></NavLink>
            <NavLink to='/auth'><div className={styles.inline_block} onClick={logoutF}>
                <div className={styles.image_div}><img src={logout} alt='Login'/></div>
                <div className={styles.text_div}>Выход</div>
            </div></NavLink>
        </div>
    );
};

export default SupportIcons;