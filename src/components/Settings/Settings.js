import React, {useEffect, useState} from 'react';
import styles from './Settings.module.css'
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import {addBot, checkAuth, getAllMethods, getMethods, getWorkers} from "../../Requests";
import MethodRow from "./MethodRow/MethodRow";
import AddMethodRow from "./AddMethodRow/AddMethodRow";

const Settings = () => {
    const key = authStorage((state) => state.key)
    const resetStatus = dataStorage((state) => state.resetStatus)
    const resetMethods = dataStorage((state) => state.resetMethods)
    const resetOtherMethods = dataStorage((state) => state.resetOtherMethods)
    const [authented, setAuth] = useState(true)
    const [status, setStatus] = useState('user')
    useEffect(() => {
        async function auth() {
            let result = await checkAuth(key)
            let data = await getWorkers(key)
            let methods = await getMethods(key)
            let otherMethods = await getAllMethods()
            setAuth(result)
            setStatus(data['status'])
            resetStatus(data['user']['name'], data['user']['balance'], data['user']['status'])
            resetMethods(methods['result'])
            resetOtherMethods(otherMethods['result'])
        }
        auth()
    }, [setAuth, key, resetStatus, resetMethods, resetOtherMethods]);
    const methods = dataStorage((state) => state.methods)
    const otherMethods = dataStorage((state) => state.otherMethods)
    const haveMethods = methods.map((element) => {return element['method_id']})
    function contains(arr, elem) {
        return arr.find((i) => i === elem);
    }
    // eslint-disable-next-line array-callback-return
    let notHaveMethods = otherMethods.map((element) => {
        if (!contains(haveMethods, element['PaymentMethods']['id'])) {
            return element
        }
    })
    async function addNewBot(){
        const bot_token = document.getElementById('bot_token').value
        const bot_name = document.getElementById('bot_name').value
        const tg_id = document.getElementById('tg_id').value
        addBot(bot_token, bot_name, tg_id, key)
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
                    <button className={styles.submit} onClick={addNewBot}>Добавить бота</button>
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
                        <button className={styles.submit} onClick={addNewBot}>Добавить бота</button>
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
    }

};

export default Settings;