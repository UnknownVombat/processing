import React from 'react';
import styles from './SessionRow.module.css'
import {deleteSession} from "../../../Requests";

const SessionRow = (session, key) => {
    async function delSession() {
        const result = await deleteSession(key, session['id'])
        window.location.reload()
        return result
    }
    return (
        <div className={styles.user_row_block} key={session['id']}>
            <p>Пользователь: {session['user']} IP: {session['ip']} ({session['city']})</p>
            <button className={styles.submit} onClick={delSession}>Завершить</button>
        </div>
    );
};

export default SessionRow;