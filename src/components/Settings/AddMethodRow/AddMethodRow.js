import React from 'react';
import styles from "../../Dashboard/UserRow/UserRow.module.css";
import {teamsapi} from "../../../api/teamsApi";

const AddMethodRow = (method) => {
    const [addNewMethod, {data, error, isError}] = teamsapi.useAddMethodMutation()
    function addMethod() {
        const body = {'method_id': method['PaymentMethods']['id']}
        addNewMethod(body)
    }
    if (data) {
        if (data['access'] === true) {
            window.location.reload()
        }
    }
    if (isError) {
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