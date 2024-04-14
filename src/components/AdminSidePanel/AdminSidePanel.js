import React from 'react';
import styles from './AdminSidePanel.module.css'
import PanelHeader from "../SidePanel/PanelHeader/PanelHeader";
import users from "../../icons/bxs-user.svg";
import withdraws from '../../icons/money-withdraw-regular-24.png'
import deals from '../../icons/bxs-receipt.svg'
import {NavLink} from "react-router-dom";
import logout from "../../icons/bxs-log-out.svg";
import {authStorage} from "../../storages/AuthStorage";

const AdminSidePanel = () => {
    const resetKey = authStorage((state) => state.resetKey)
    function logoutF(){
        resetKey('')
        window.location.href = '/admin/auth'
    }
    return (
        <div className={styles.side_panel}>
            <PanelHeader />
            <div className={styles.main_icons}>
                <NavLink to='/admin'><div className={styles.inline_block}>
                    <div className={styles.image_div}><img src={users} alt='Dash'/></div>
                    <div className={styles.text_div}>Команды</div>
                </div></NavLink>
            </div>
            <div className={styles.main_icons}>
                <NavLink to='/admin/withdraws'><div className={styles.inline_block}>
                    <div className={styles.image_div}><img src={withdraws} alt='Dash'/></div>
                    <div className={styles.text_div}>Пополнения</div>
                </div></NavLink>
            </div>
            <div className={styles.main_icons}>
                <NavLink to='/admin/all_payments'><div className={styles.inline_block}>
                    <div className={styles.image_div}><img src={deals} alt='Dash'/></div>
                    <div className={styles.text_div}>Все сделки</div>
                </div></NavLink>
            </div>
            <div className={styles.main_icons}>
                <NavLink to='/admin/auth'><div className={styles.inline_block} onClick={logoutF}>
                    <div className={styles.image_div}><img src={logout} alt='Login'/></div>
                    <div className={styles.text_div}>Выход</div>
                </div></NavLink>
            </div>
        </div>
    );
};

export default AdminSidePanel;