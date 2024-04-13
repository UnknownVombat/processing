import React from 'react';
import styles from './UserRow.module.css'

const UserRow = (user) => {
    return (
        <div className={styles.user_row_block} key={user['id']}>
            <p className={styles.little_p}>Имя:</p> 
            <span>{user['name']}</span>   
            <p className={styles.little_p}>Баланс:</p>
            <span>{user['balance']}</span>   
            <p className={styles.little_p}>Статус:</p>
            <span>{user['status']}</span>
        </div>
    );
};

export default UserRow;