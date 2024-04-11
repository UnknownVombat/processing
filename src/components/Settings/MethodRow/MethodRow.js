import React from 'react';
import styles from "../../Dashboard/UserRow/UserRow.module.css";
import {teamsapi} from "../../../api/teamsApi";
import {useNavigate} from "react-router-dom";

const MethodRow = (method) => {
    const [switchMethod, {data, error, isError}] = teamsapi.useSwitchActiveMutation()

    const navigate = useNavigate()
    function switchActive() {
        const active = method['active']
        const body = {'team_id': method['id'], 'method_id': method['method_id'], 'active': !active}
        switchMethod(body)
    }
    if (data) {
        if (data['access'] === true) {
            window.location.reload()
        }
    }
    if (isError) {
        if (error.status === 401) {
            console.error(error)
            navigate('/auth')
        } else {
            console.error(error)
        }
    }
    return (
        <div className={styles.user_row_block} key={method['method_id']}>
            <p className={styles.big_p}>Банк: {method['name']} Статус: {method['active'] === true ? 'Включен': 'Выключен'}</p>
            <button className={styles.submit} onClick={switchActive}>{method['active'] === true ? 'Выключить': 'Включить'}</button>
        </div>
    );
};

export default MethodRow;