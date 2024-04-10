import React, {useState} from 'react';
import styles from './Settings.module.css'
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import MethodRow from "./MethodRow/MethodRow";
import AddMethodRow from "./AddMethodRow/AddMethodRow";
import {userapi} from "../../api/userApi";
import {methodsapi} from "../../api/methodsApi";

const Settings = () => {
    const key = authStorage((state) => state.key)
    const resetStatus = dataStorage((state) => state.resetStatus)
    const resetMethods = dataStorage((state) => state.resetMethods)
    const resetOtherMethods = dataStorage((state) => state.resetOtherMethods)

    const header = {'Authorization': key}
    const {data: authData, error: authError} = userapi.useAuthQuery(header)
    const {data: workersData, error: workersError} = userapi.useWorkersQuery(header)
    const {data: methodsData, error: methodsError} = methodsapi.useMethodsQuery(header)
    const [addBot, {data, error}] = userapi.useAddBotMutation()

    const [authented, setAuth] = useState(true)
    const [status, setStatus] = useState('user')
    let notHaveMethods = ''
    const methods = dataStorage((state) => state.methods)
    const otherMethods = dataStorage((state) => state.otherMethods)
    const haveMethods = methods.map((element) => {return element['method_id']})

    if (authData) {
        setAuth(authData['access'])
    }
    if (authError) {
        console.error(authError)
    }
    if (workersData) {
        setStatus(workersData['status'])
        resetStatus(workersData['user']['name'], workersData['user']['balance'], workersData['user']['status'])}
    if (methodsData) {
        if (methodsData['access'] === true) {
            resetMethods(methods['result'])
            resetOtherMethods(otherMethods['result'])
            function contains(arr, elem) {
                return arr.find((i) => i === elem);
            }
            // eslint-disable-next-line array-callback-return
            notHaveMethods = otherMethods.map((element) => {
                if (!contains(haveMethods, element['PaymentMethods']['id'])) {
                    return element
                }
            })
        }
    }
    if (methodsError) {
        console.error(methodsError)
    }
    if (workersError) {
        console.error(workersError)
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
    async function addNewBot(){
        const bot_token = document.getElementById('bot_token').value
        const bot_name = document.getElementById('bot_name').value
        const tg_id = document.getElementById('tg_id').value
        const body = {'bot_token': bot_token, 'bot_name': bot_name, 'telegram_id': tg_id}
        addBot(body, header)
    }
    if (authented === true){
        if (status === 'user') {
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
                    <div className={styles.settings_div}>
                        <h2>Реквизиты</h2>
                        {methods.map((element) => {return MethodRow(element, key)})}
                        {/* eslint-disable-next-line array-callback-return */}
                        {notHaveMethods.map((element) => {
                            if (typeof element === 'object'){
                                return AddMethodRow(element, key)
                            }
                        })}
                    </div>
                </div>
            )
        }
    } else {
        window.location.href = '/auth'
    }

};

export default Settings;