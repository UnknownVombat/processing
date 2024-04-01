import React, {useEffect, useState} from 'react';
import styles from './Dashboard.module.css'
import {checkAuth} from "../../Requests";
import {authStorage} from "../../storages/AuthStorage";

const Dashboard = () => {
    const key = authStorage((state) => state.key)
    const [authented, setAuth] = useState(true)
    useEffect(() => {
        async function auth() {
            let result = await checkAuth(key)
            setAuth(result)
        }
        auth()
    }, [setAuth, key]);
    if (authented === true){
        return (
            <div className={styles.dashboard}>
                <p>DASHBOARD</p>
            </div>
        );
    } else {
        // console.log('suka')
        window.location.href = '/auth'
    }
};

export default Dashboard;