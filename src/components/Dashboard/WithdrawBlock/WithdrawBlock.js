// import React, {useState} from 'react';
import React from "react";
import styles from "../Dashboard.module.css";
import {withdrawsapi} from "../../../api/withdrawsApi";

const WithdrawBlock = () => {
    const [sendWithdraw, {data: withdrawData, error: withdrawError, isError}] = withdrawsapi.useSendWithdrawMutation()
    const {data: codeData, error: codeError, isError: codeIsError} = withdrawsapi.useTakeCodeQuery()

    function withdraw() {
        const amount = document.getElementById('amount').value
        const body = {'amount': amount}
        sendWithdraw(body)
    }
    if (withdrawData) {
        if (withdrawData['access'] === true) {
            alert('Успешно!')
        } else {
            alert('Не хватает средств!')
        }
    }
    if (isError) {
        console.error(withdrawError)
    }
    // if (isLoading) {
    //     return <div>Loading</div>
    // }
    if (codeIsError) {
        console.error(codeError)
    }
    // if (codeLoading) {
    //     return <div>Loading</div>
    // }
    if (codeData){
        console.log(codeData)
    }
    return (
        <div className={styles.withdraw}>
            <label>Вывести баланс</label>
            <input id='amount' type='number' placeholder='Сумма вывода'/>
            <button className={styles.submit} onClick={withdraw}>Вывести</button>
            {/*<p>Код гарантекс для последней заявки на вывод: {codeData['access'] === false ? '': codeData['result']}</p>*/}
        </div>
    );
};

export default WithdrawBlock;