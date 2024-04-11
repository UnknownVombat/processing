import React from 'react';
import styles from './Auth.module.css'
import {authStorage} from "../../storages/AuthStorage";
import {userapi} from "../../api/userApi";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const resetKey = authStorage((state) => state.resetKey)
    const [auth, {data, isError, isLoading, error}] = userapi.useLoginMutation()
    const navigate = useNavigate()
    function getIP() {
        return fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {return data.ip});
    }
    function getCity(ip) {
        return fetch("https://ipwho.is/" + ip, {method: 'GET'}).then(res => res.json())
            .then(data => {return data.city});
    }
    async function loginResult(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const ip = await getIP()
        const city = await getCity(ip)
        const body = {'login': login, 'password': password, 'ip': ip, 'city': city}
        auth(body)
    }

    if (isError) {
        console.log(error)
    }
    if (data) {
        resetKey(data['access_token'])
        window.location.reload()
        navigate('/')
    }
    if (isLoading) {
        console.log('Загрузка')
    }
    return (
        <div className={styles.container}>
            <div className={styles.vertical}>
                <div className={styles.horizontal}>
                    <label>Логин:</label>
                    <input type="text" id="login" name="login" />
                    <label>Пароль:</label>
                    <input type="password" id="password" name="password" />
                    <button className={styles.submit} onClick={loginResult}>Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Auth;