import React from 'react';
import styles from './Settings.module.css'
import {userapi} from "../../api/userApi";
import {useNavigate} from "react-router-dom";
import MethodsBlock from "./MethodsBlock/MethodsBlock";

const Settings = () => {
    const {data: workersData, error: workersError, isError: workersIsError} = userapi.useWorkersQuery()
    const [addBot, {data, error}] = userapi.useAddBotMutation()

    const navigate = useNavigate()

    if (workersIsError) {
        if (workersError.status === 401) {
            console.error(workersError)
            navigate('/auth')
        } else {
            console.error(workersError.status)
        }
    }
    if (data) {
        if (data['access'] === true) {
            alert('Успешно!')
            window.location.reload()
        }
    }
    if (error) {
        console.error(error)
    }
    function addNewBot(){
        const bot_token = document.getElementById('bot_token').value
        const bot_name = document.getElementById('bot_name').value
        const tg_id = document.getElementById('tg_id').value
        const body = {'bot_token': bot_token, 'bot_name': bot_name, 'telegram_id': tg_id}
        addBot(body)
    }
    if (workersData){
        if (workersData['status'] === 'user') {
            return (
                <div className={styles.settings_div}>
                    <h2>Настройки</h2>
                    <label>Введите токен бота</label>
                    <input type='text' placeholder='Токен бота' id='bot_token'/>
                    <label>Введите имя бота</label>
                    <input type='text' placeholder='Имя бота' id='bot_name'/>
                    <label>Введите ваш телеграм ID</label>
                    <input type='text' placeholder='Телеграм ID' id='tg_id'/>
                    <button className={styles.submit} onClick={addNewBot}>Добавить</button>
                </div>
            )
        } else {
            return (
                <div className={styles.block}>
                    <div className={styles.settings_div}>
                        <h2>Настройки</h2>
                        <label>Введите токен бота</label>
                        <input type='text' placeholder='Токен бота' id='bot_token'/>
                        <label>Введите имя бота</label>
                        <input type='text' placeholder='Имя бота' id='bot_name'/>
                        <label>Введите ваш телеграм ID</label>
                        <input type='text' placeholder='Телеграм ID' id='tg_id'/>
                        <button className={styles.submit} onClick={addNewBot}>Добавить</button>
                    </div>
                    <MethodsBlock />
                </div>
            )
        }
    } else {
        window.location.href = '/auth'
    }

};

export default Settings;