import React from 'react';
import styles from './SupportIcons.module.css'
import cog from "../../../icons/bxs-cog.svg";
import logout from "../../../icons/bxs-log-out.svg";
import {NavLink, useNavigate} from "react-router-dom";
import {authStorage} from "../../../storages/AuthStorage";
import {userapi} from "../../../api/userApi";

const SupportIcons = () => {
    const resetKey = authStorage((state) => state.resetKey)

    const [logOut, {data: logoutData, error: logoutError}] = userapi.useLogoutMutation()

    const navigate = useNavigate()
    function logoutF(){
        logOut()
        resetKey('')
    }
    if (logoutData) {
        navigate('/auth')
    }
    if (logoutError) {
        console.error(logoutError)
        navigate('/auth')
    }
    return (
        <div className={styles.support_icons}>
            <NavLink to='/settings'><div className={styles.inline_block}>
                <div className={styles.image_div}><img src={cog} alt='Dash'/></div>
                <div className={styles.text_div}>Настройки</div>
            </div></NavLink>
            <a href='/auth'><div className={styles.inline_block} onClick={logoutF}>
                <div className={styles.image_div}><img src={logout} alt='Login'/></div>
                <div className={styles.text_div}>Выход</div>
            </div></a>
        </div>
    );
};

export default SupportIcons;