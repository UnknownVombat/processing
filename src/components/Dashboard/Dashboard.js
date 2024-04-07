import React, {useEffect, useState} from 'react';
import styles from './Dashboard.module.css'
import {checkAuth, getCode, getWorkers, sendWithdraw} from "../../Requests";
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import UserRow from "./UserRow/UserRow";
import SessionRow from "./SessionRow/SessionRow";

const Dashboard = () => {
    const key = authStorage((state) => state.key)
    const setUsers = dataStorage((state) => state.resetUsers)
    const resetStatus = dataStorage((state) => state.resetStatus)
    const setSessions = dataStorage((state) => state.resetSessions)
    const [authented, setAuth] = useState(true)
    const [status, setStatus] = useState('user')
    const [code, setCode] = useState('')
    useEffect(() => {
        async function auth() {
            let result = await checkAuth(key)
            let data = await getWorkers(key)
            const codeRes = await getCode(key)
            setCode(codeRes)
            setAuth(result)
            setUsers(data['users'])
            setSessions(data['sessions'])
            setStatus(data['status'])
            resetStatus(data['user']['name'], data['user']['balance'], data['user']['status'])
        }
        auth()
    }, [setAuth, key, setUsers, setSessions, resetStatus]);
    const user = dataStorage((state) => state.user)
    const users = dataStorage((state) => state.users)
    const sessions = dataStorage((state) => state.sessions)
    async function withdraw() {
        const amount = document.getElementById('amount').value
        const result = await sendWithdraw(amount, key)
        if (result === true) {
            alert('Успешно!')
        } else {
            alert('Не хватает средств!')
        }
        return result
    }
    if (authented === true){
        if (status === 'user'){
            return (
                <div className={styles.user_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.user_row}>
                        <p>Имя: {user['name']}</p>
                        <p>Баланс: {user['balance']}</p>
                        <p>Статус: {user['status']}</p>
                        <div className={styles.withdraw}>
                            <label>Вывести баланс</label>
                            <input id='amount' type='number' placeholder='Сумма вывода'/>
                            <button className={styles.submit} onClick={withdraw}>Вывести</button>
                        </div>
                        <p>Код гарантекс для последней заявки на вывод: {code}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.all_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.your_data}>
                        <p className={styles.big_p}>Ваши данные:</p>
                        <p className={styles.little_p}>Имя: {user['name']} Баланс: {user['balance']} Статус: {user['status']}</p>
                    </div>
                    <div className={styles.dashboard}>
                        <div className={styles.user_dashboard}>
                            <div className={styles.users_row}>
                                <p className={styles.big_p}>Данные о команде:</p>
                                {users.map((element) => {return UserRow(element)})}
                                <div className={styles.withdraw}>
                                    <label>Вывести баланс</label>
                                    <input type='text' placeholder='Сумма вывода'/>
                                    <button className={styles.submit} onClick={withdraw}>Вывести</button>
                                </div>
                                <p>Код гарантекс для последней заявки на вывод: {code}</p>
                            </div>
                        </div>
                        <div className={styles.user_dashboard}>
                            <p className={styles.session_p}>Данные о сессиях:</p>
                            {sessions.map((element) => {return SessionRow(element['WorkersSessions'], key)})}
                        </div>
                    </div>
                </div>
            )
        }

    } else {
        // console.log('suka')
        window.location.href = '/auth'
    }
};

export default Dashboard;