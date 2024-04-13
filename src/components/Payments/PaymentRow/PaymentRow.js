import React from 'react';
import styles from './PaymentRow.module.css'
import tableStyles from '../../Table/Table.module.css'
import {applicationsapi} from "../../../api/applicationsApi";

const PaymentRow = (element) => {
    const key = Object.keys(element["data"])
    const rowData = element["data"][key]
    // const style = {true: styles.row_true, false: null}
    const [update, {data, error}] = applicationsapi.useUpdateStatusMutation()
    async function updateStat(status) {
        const body = {'foreign_id': key, 'status': status}
        update(body)
    }
    if (data) {
        if (data['access']) {
            document.getElementById(key[0]).remove()
        }
    }

    if (error) {
        console.error(error)
    }
    return (
            <tr id={element["id"]} className={tableStyles.tr}>
                <th className={tableStyles.th}>{key}</th>
                <th className={tableStyles.th}>{rowData[0]}</th>
                <th className={tableStyles.th}>{rowData[1]}</th>
                <th className={tableStyles.th}>{rowData[2]}</th>
                <th className={tableStyles.th}>{rowData[3]}</th>
                <th className={tableStyles.th}>{rowData[4]}</th>
                <th className={tableStyles.th}>{rowData[6]}</th>
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