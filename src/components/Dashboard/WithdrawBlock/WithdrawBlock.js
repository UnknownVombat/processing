import React from "react";
import styles from "../Dashboard.module.css";
import {withdrawsapi} from "../../../api/withdrawsApi";
import useAuthRedirect from "../../../hooks/keyCheckHook";
import { toast } from "react-toastify";

const WithdrawBlock = () => {
    useAuthRedirect()
    const [sendWithdraw, {data: withdrawData, error: withdrawError, isError}] = withdrawsapi.useSendWithdrawMutation()
    const {data: courseData, error: courseError, isError: courseIsError} = withdrawsapi.useTakeCodeQuery()

    function withdraw() {
        const amount = document.getElementById('amount').value
        const trc20 = document.getElementById('trc20').value
        const body = {'amount': amount, 'address': trc20}
        sendWithdraw(body)
    }
    if (withdrawData) {
        if (withdrawData['access'] === true) {
            alert('Успешно!')
            toast.success("Успешно отправлено!")
            window.location.reload()
        } else {
            alert('Не хватает средств!')
            toast.error("Не отправлено!")
        }
    }
    if (isError) {
        console.error(withdrawError)
        toast.error("Не отправлено!")
    }

    if (courseIsError) {
        console.error(courseError)
        toast.error("Не отправлено!")
    }

    if (courseData){
        console.log(`Course data ${JSON.stringify(courseData)}`)
    }

    return (
        <div className={styles.withdraw}>
            <label>Пополнить баланс</label>
            <input id='amount' type='number' placeholder='Сумма пополнения: ' min={0}/>
            <input id='trc20' type='text' placeholder='TRC20 реквизиты' min={0}/>
            <button className={styles.submit} onClick={withdraw}>Пополнить</button>
            <p>Курс последнего пополнения: { courseData && courseData["access"] !== false ? <span>{courseData["result"] } RUB\USDT</span> : "Не обнаружено"}</p>
        </div>

    );
};

export default WithdrawBlock;