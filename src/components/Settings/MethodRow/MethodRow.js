import React from 'react';
import styles from "../../Dashboard/UserRow/UserRow.module.css";
import {switchMethodActive} from "../../../Requests";

const MethodRow = (method, key) => {
    async function switchActive() {
        const active = method['active']
        const result = await switchMethodActive(method['id'], method['method_id'], !active, key)
        alert(active)
        // window.location.reload()
        return result
    }
    return (
        <div className={styles.user_row_block} key={method['method_id']}>
            <p className={styles.big_p}>Банк: {method['name']} Статус: {method['active'] === true ? 'Включен': 'Выключен'}</p>
            <button className={styles.submit} onClick={switchActive}>{method['active'] === true ? 'Выключить': 'Включить'}</button>
        </div>
    );
};

export default MethodRow;