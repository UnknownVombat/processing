import React from 'react';
import styles from './Auth.module.css'
import {loginUser} from "../../Requests";
import {authStorage} from "../../storages/AuthStorage";

const Auth = () => {
    const resetKey = authStorage((state) => state.resetKey)
    function getIP() {
        let result = fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {return data.ip});
        return result
    }
    function getCity(ip) {
        let result = fetch("http://ipwho.is/" + ip, {method: 'GET'}).then(res => res.json())
            .then(data => {return data.city});
        return result
    }
    async function loginResult(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const ip = await getIP()
        const city = await getCity(ip)
        const result = await loginUser(login, password, ip, city)
        if (result['result']){
            resetKey(result['access_key'])
            window.location.href = '/'
            // console.log('Запрос прошел')
        } else {
            alert('Ошибка авторизации!')
        }
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