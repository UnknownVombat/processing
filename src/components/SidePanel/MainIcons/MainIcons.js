import React from 'react';
import 'boxicons'
import styles from './MainIcons.module.css'
import dashboard from '../../../icons/bxs-dashboard.svg'
import logincircle from '../../../icons/bxs-log-in-circle.svg'
import receipt from '../../../icons/bxs-receipt.svg'
import {NavLink} from 'react-router-dom'

const MainIcons = () => {
    return (
        <div className={styles.main_icons}>
            <NavLink to='/'><div className={styles.inline_block}>
                <div className={styles.image_div}><img src={dashboard} alt='Dash'/></div>
                <div className={styles.text_div}>Дашборд</div>
            </div></NavLink>
            <a href='/payments'><div className={styles.inline_block}>
                <div className={styles.image_div}><img src={logincircle} alt='Login'/></div>
                <div className={styles.text_div}>Выплаты</div>
            </div></a>
            <div className={styles.inline_block}>
                <div className={styles.image_div}><img src={receipt} alt='Dash'/></div>
                <div className={styles.text_div}>Поддержка</div>
            </div>
        </div>
    );
};

export default MainIcons;