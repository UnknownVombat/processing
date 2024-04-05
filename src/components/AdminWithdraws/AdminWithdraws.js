import React, {useEffect, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import {checkAdminAuth, getWithdraws} from "../../Requests";
import styles from './AdminWithdraws.module.css'

const AdminWithdraws = () => {
    const key = authStorage((state) => state.key)
    const setUsers = dataStorage((state) => state.resetUsers)
    const users = dataStorage((state) => state.users)
    const [authented, setAuth] = useState(true)
    useEffect(() => {
        async function auth() {
            let result = await checkAdminAuth(key)
            let data = await getWithdraws(key)
            console.log(data)
            setAuth(result)
            setUsers(data)
        }
        auth()
    }, [setAuth, key, setUsers]);
    if (authented === true) {
        return (
            <div className={styles.dashboard}>
                <h2>Заявки на вывод</h2>
                <div className={styles.payments_table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>Имя</th><th>Айди команды</th><th>Сумма</th><th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((withdraw) => {return (
                                <tr>
                                    <th>{withdraw['name']}</th><th>{withdraw['team_id']}</th><th>{withdraw['amount']}</th>
                                    <th>
                                        <div className={styles.submit}>Подтвердить</div>
                                        <div className={styles.decline}>Отменить</div>
                                    </th>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        window.location.href = '/admin/auth'
    }

};

export default AdminWithdraws;