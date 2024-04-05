import React, {useEffect, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import {checkAdminAuth, getTeams} from "../../Requests";
import styles from "./AdminUsers.module.css";

const AdminUsers = () => {
    const key = authStorage((state) => state.key)
    const setUsers = dataStorage((state) => state.resetUsers)
    const [authented, setAuth] = useState(true)
    useEffect(() => {
        async function auth() {
            let result = await checkAdminAuth(key)
            let data = await getTeams(key)
            console.log(data)
            setAuth(result)
            setUsers(data)
        }
        auth()
    }, [setAuth, key, setUsers]);
    const users = dataStorage((state) => state.users)
    if (authented === true){
        return (
            <div className={styles.dashboard}>
                <h2>Команды и пользователи</h2>
                <div className={styles.payments_table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>Айди команды</th>
                            <th>Название</th>
                            <th>Контакт админа</th>
                            <th>Активных реквизитов</th>
                            <th>Работников</th>
                            <th>Сумма балансов</th>
                            <th>В бане</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                console.log(user)
                                const key = Object.keys(user)[0]
                                const data = user[key]
                                return (
                                    <tr>
                                        <th>{key}</th>
                                        <th>{data[0]}</th>
                                        <th>{data[1]}</th>
                                        <th>{data[3]}</th>
                                        <th>{data[4]}</th>
                                        <th>{data[5]}</th>
                                        <th>{(data[2] === true ? 'Да': 'Нет')}</th>
                                        <th>
                                            <div className={(data[2] === true ? styles.submit: styles.decline)}
                                                 onClick={() => {console.log('Click')}}>
                                                {(data[2] === true ? 'Разбан': 'Бан')}
                                            </div>
                                        </th>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                <div className={styles.create_block}>
                    <div className={styles.create_inner_block}>
                        <h3>Добавить команду</h3>
                        <label>Введите название команды</label>
                        <input type='text' placeholder='Название команды' id='team_name'/>
                        <label>Введите контакт админа</label>
                        <input type='text' placeholder='Контакт админа' id='admin_contact'/>
                        <button className={styles.submit}>Добавить</button>
                    </div>
                    <div className={styles.create_inner_block}>
                        <h3>Добавить пользователя</h3>
                        <div className={styles.row_div}>
                            <div className={styles.column_div}>
                                <label>Введите имя пользователя</label>
                                <input type='text' placeholder='Имя пользователя' id='user_name'/>
                                <label>Введите логин</label>
                                <input type='text' placeholder='Логин' id='login'/>
                            </div>
                            <div className={styles.column_div}>
                                <label>Пользователь админ?</label>
                                <div className={styles.row_div}>
                                    <input type='radio' name='admin' value='admin_true' id='is_admin'/>
                                    <label htmlFor='admin_true'>Да</label>
                                    <input type='radio' name='admin' value='admin_false' id='is_admin'/>
                                    <label htmlFor='admin_false'>Нет</label>
                                </div>
                                <label>Введите айди команды</label>
                                <input type='number' placeholder='Айди' id='team_id'/>
                            </div>
                        </div>
                        <div className={styles.row_div}>
                            <div className={styles.column_div}>
                                <label>Введите пароль</label>
                                <input type='text' placeholder='Пароль' id='password'/>
                                <button className={styles.submit}>Добавить</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.create_inner_block}>
                        <h3>Создать API ключи</h3>
                        <div className={styles.column_div}>
                            <label>Введите имя партнера</label>
                            <input type='text' placeholder='Имя партнера' id='source_name'/>
                            <button className={styles.submit}>Создать</button>
                            <p>Ключ:</p>
                            <p>{}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.href = '/admin/auth'
    }
};

export default AdminUsers;