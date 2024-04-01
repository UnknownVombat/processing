import React, {useEffect, useState} from 'react';
import styles from './Dashboard.module.css'
import {checkAuth} from "../../Requests";

const Dashboard = () => {
    const [authented, setAuth] = useState(true)
    useEffect(() => {
        async function auth() {
            let result = await checkAuth()
            setAuth(result)
        }
        auth()
    }, [setAuth]);
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