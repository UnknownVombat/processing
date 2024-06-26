import React from 'react';
import styles from './SessionRow.module.css'
import {userapi} from "../../../api/userApi";

const SessionRow = (session) => {
    const [deleteSession, {data, error, isError}] = userapi.useDeleteSessionMutation()
    function delSession() {
        const body = {'user_id': session['id']}
        deleteSession(body)
    }
    if (data) {
        if (data['success'] === true) {
            document.getElementById('session' + session['id']).remove()
        }
    }
    if (isError) {
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