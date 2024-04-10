import React from 'react';
import styles from "../../Dashboard/UserRow/UserRow.module.css";
import {teamsapi} from "../../../api/teamsApi";

const AddMethodRow = (method, key) => {
    const [addNewMethod, {data, error}] = teamsapi.useAddMethodMutation()
    async function addMethod() {
        const body = {'method_id': method['PaymentMethods']['id']}
        const header = {'Authorization': key}
        addNewMethod(body, header)
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
        <div className={styles.user_row_block} key={method['PaymentMethods']['id']}>
            <p className={styles.big_p}>Банк: {method['PaymentMethods']['name']}</p>
            <button className={styles.submit} onClick={addMethod}>Добавить</button>
        </div>
    );
};

export default AddMethodRow;