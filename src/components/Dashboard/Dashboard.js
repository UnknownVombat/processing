// import React, {useState} from 'react';
import React from "react";
import styles from './Dashboard.module.css'
import {authStorage} from "../../storages/AuthStorage";
import UserRow from "./UserRow/UserRow";
import {userapi} from "../../api/userApi";
import {useNavigate} from "react-router-dom";
import WithdrawBlock from "./WithdrawBlock/WithdrawBlock";

const Dashboard = () => {
    const key = authStorage((state) => state.key)
    const header = {'Authorization': key}
    const {data: workersData, error: workersError, isError: workersIsError} = userapi.useWorkersQuery(header)
    const navigate = useNavigate()
    const [deleteSession, {data, error, isError}] = userapi.useDeleteSessionMutation()
    function delSession(element, user_id) {
        const body = {'user_id': user_id}
        deleteSession(body, header)
        element.target.remove()
    }
    if (data) {
        if (data['success'] === true) {
            // document.getElementById('session' + session['id']).remove()
            alert('Успешно!')
        } else {
            alert('Не успешно!')
        }
    }
    if (isError) {
        console.error(error)
    }
    if (workersIsError) {
        if (workersError.status === 401) {
            console.error(workersError)
            navigate('/auth')
        } else {
            console.error(workersError.status)
        }
    }
    if (workersData) {
        if (workersData['status'] === 'user'){
            return (
                <div className={styles.user_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.user_row}>
                        <p>Имя: {workersData['user']['name']}</p>
                        <p>Баланс: {workersData['user']['balance']}</p>
                        <p>Статус: {workersData['user']['status']}</p>
                        <WithdrawBlock />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.all_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.your_data}>
                        <p className={styles.big_p}>Ваши данные:</p>
                        <p className={styles.little_p}>Имя: {workersData['user']['name']} Баланс: {workersData['user']['balance']} Статус: {workersData['user']['status']}</p>
                    </div>
                    <div className={styles.dashboard}>
                        <div className={styles.user_dashboard}>
                            <div className={styles.users_row}>
                                <p className={styles.big_p}>Данные о команде:</p>
                                {workersData['users'].map((element) => {return UserRow(element)})}
                                <WithdrawBlock />
                            </div>
                        </div>
                        <div className={styles.user_dashboard}>
                            <p className={styles.session_p}>Данные о сессиях:</p>
                            {workersData['sessions'].map((element) => {
                                return (
                                <div className={styles.user_row_block} key={element['WorkersSessions']['id']} id={element['WorkersSessions']['id']}>
                                    <p>Пользователь: {element['WorkersSessions']['user']} IP: {element['WorkersSessions']['ip']} ({element['WorkersSessions']['city']})</p>
                                    <button className={styles.row_submit} onClick={() => delSession(this, element['WorkersSessions']['id'])}>Завершить</button>
                                </div>
                            )})}

                            {/*{workersData['sessions'].map((element) => {return SessionRow(element['WorkersSessions'], key)})}*/}
                        </div>
                    </div>
                </div>
            )
        }
    }
};


export default Dashboard;