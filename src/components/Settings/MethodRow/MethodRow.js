import React from 'react';
import styles from "../../Dashboard/UserRow/UserRow.module.css";
import {teamsapi} from "../../../api/teamsApi";

const MethodRow = (method, key) => {
    const [switchMethod, {data, error}] = teamsapi.useSwitchActiveMutation()
    async function switchActive() {
        const active = method['active']
        const header = {'Authorization': key}
        const body = {'team_id': method['id'], 'method_id': method['method_id'], 'active': !active}
        switchMethod(body, header)
    }
    if (data) {
        if (data['access'] === true) {
            window.location.reload()
        }
    }
    if (error) {
        console.error(error)
    }
    return (
        <div className={styles.user_row_block} key={method['method_id']}>
            <p className={styles.big_p}>Банк: {method['name']} Статус: {method['active'] === true ? 'Включен': 'Выключен'}</p>
            <button className={styles.submit} onClick={switchActive}>{method['active'] === true ? 'Выключить': 'Включить'}</button>
        </div>
    );
};

export default MethodRow;