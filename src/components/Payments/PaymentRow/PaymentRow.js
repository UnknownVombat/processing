import React from 'react';
import styles from './PaymentRow.module.css'
import {updateStatus} from "../../../Requests";
import {applicationStorage} from "../../../storages/ApplicationStorage";

const PaymentRow = (element, keys) => {
    const key = Object.keys(element)
    const style = {true: styles.row_true, false: null}
    const resetLastApp = applicationStorage((state) => state.resetLastApp)
    async function updateStat(status) {
        const result = await updateStatus(status, key[0], keys)
        resetLastApp(key[0])
        document.getElementById(key[0]).remove()
        return result
    }
    return (
            <tr className={style[element[key][5]]} id={key[0]}>
                <th>{key}</th>
                <th>{element[key][0]}</th>
                <th>{element[key][1]}</th>
                <th>{element[key][2]}</th>
                <th>{element[key][3]}</th>
                <th>{element[key][4]}</th>
                <th>{element[key][6]}</th>
                <th className={styles.buttons_th}>
                    <div className={styles.submit} onClick={() => updateStat('paid')}>
                        Подтвердить
                    </div>
                    <div className={styles.decline} onClick={() => updateStat('canceled')}>
                        Отменить
                    </div>
                </th>
            </tr>
        );
};

export default PaymentRow;