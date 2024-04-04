import React from 'react';
import styles from './PaymentRow.module.css'

const PaymentRow = (element) => {
    const key = Object.keys(element)
    const style = {true: styles.row_true, false: null}
    return (
        <tr className={style[element[key][5]]}>
            <th>{key}</th>
            <th>{element[key][0]}</th>
            <th>{element[key][1]}</th>
            <th>{element[key][2]}</th>
            <th>{element[key][3]}</th>
            <th>{element[key][4]}</th>
            <th>{element[key][6]}</th>
            <th className={styles.buttons_th}>
                <div className={styles.submit}>
                    Подтвердить
                </div>
                <div className={styles.decline}>
                    Отменить
                </div>
            </th>
        </tr>
    );
};

export default PaymentRow;