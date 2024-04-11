import React, {useState} from 'react';
import styles from "../Dashboard.module.css";
import {withdrawsapi} from "../../../api/withdrawsApi";
import {authStorage} from "../../../storages/AuthStorage";

const WithdrawBlock = () => {
    const key = authStorage((state) => state.key)

    const header = {'Authorization': key}
    const [sendWithdraw, {data: withdrawData, error: withdrawError}] = withdrawsapi.useSendWithdrawMutation()
    const {data: codeData, error: codeError, isLoading: codeLoading} = withdrawsapi.useTakeCodeQuery(header)

    const [code, setCode] = useState('')
    async function withdraw() {
        const amount = document.getElementById('amount').value
        const body = {'amount': amount}
        sendWithdraw(body, header)
    }
    if (withdrawData) {
        if (withdrawData['access'] === true) {
            alert('Успешно!')
        } else {
            alert('Не хватает средств!')
        }
    }
    if (withdrawError) {
        console.error(withdrawError)
    }
    if (codeData) {
        setCode(codeData['result'])
    }
    if (codeError) {
        console.error(codeError)
    }
    if (codeLoading) {
        console.log('Loading...')
    }
    return (
        <div className={styles.withdraw}>
            <label>Вывести баланс</label>
            <input id='amount' type='number' placeholder='Сумма вывода'/>
            <button className={styles.submit} onClick={withdraw}>Вывести</button>
            <p>Код гарантекс для последней заявки на вывод: {code}</p>
        </div>
    );
};

export default WithdrawBlock;