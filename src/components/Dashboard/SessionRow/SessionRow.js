import React from 'react';
import styles from './SessionRow.module.css'
import {userapi} from "../../../api/userApi";

const SessionRow = (session, key) => {
    const header = {'Authorization': key}
    const [deleteSession, {data, error}] = userapi.useDeleteSessionMutation()
    async function delSession() {
        const body = {'user_id': session['id']}
        deleteSession(body, header)
    }
    if (data) {
        if (data['success'] === true) {
            document.getElementById('session' + session['id']).remove()
        }
    }
    if (error) {
        console.error(error)
    }
    return (
        <div className={styles.user_row_block} key={session['id']} id={'session' + session['id']}>
            <p>Пользователь: {session['user']} IP: {session['ip']} ({session['city']})</p>
            <button className={styles.submit} onClick={delSession}>Завершить</button>
        </div>
    );
};

export default SessionRow;