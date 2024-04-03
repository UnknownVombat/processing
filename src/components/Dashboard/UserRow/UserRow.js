import React from 'react';
import styles from './UserRow.module.css'

const UserRow = (user) => {
    return (
        <div className={styles.user_row_block} key={user['id']}>
            <p className={styles.little_p}>Имя: {user['name']}   Баланс: {user['balance']}   Статус: {user['status']}</p>
        </div>
    );
};

export default UserRow;