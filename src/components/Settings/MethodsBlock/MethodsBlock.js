import React from 'react';
import styles from "../Settings.module.css";
import {teamsapi} from "../../../api/teamsApi";
import {useNavigate} from "react-router-dom";

const MethodsBlock = () => {
    const {data: methodsData, error: methodsError, isError: methodsIsError} = teamsapi.useMethodsQuery()
    const [switchMethod, {data, error, isError}] = teamsapi.useSwitchActiveMutation()

    const navigate = useNavigate()
    function switchActive(method) {
        const active = method['active']
        const body = {'team_id': method['id'], 'method_id': method['method_id'], 'active': !active}
        switchMethod(body)
    }
    if (data) {
        if (data['access'] === true) {
            window.location.reload()
        }
    }
    if (isError) {
        if (error.status === 401) {
            console.error(error)
            navigate('/auth')
        } else {
            console.error(error)
        }
    }
    const [addNewMethod, {data: addData, error: addError, isError: addIsError}] = teamsapi.useAddMethodMutation()

    function addMethod(method) {
        const body = {'method_id': method['PaymentMethods']['id']}
        addNewMethod(body)
    }
    if (addData) {
        if (data['access'] === true) {
            window.location.reload()
        }
    }
    if (addIsError) {
        if (addError.status === 401) {
            console.error(addError)
            navigate('/auth')
        } else {
            console.error(addError)
        }
    }
    if (methodsData) {
        console.log(methodsData)
        if (methodsData['access'] === true) {
            return (
                <div className={styles.settings_div}>
                    <h2>Реквизиты</h2>
                    {methodsData['haveMethods'].map((method) => {return (
                        <div className={styles.user_row_block} key={method['method_id']}>
                            <p className={styles.big_p}>Банк: {method['name']} Статус: {method['active'] === true ? 'Включен': 'Выключен'}</p>
                            <button className={styles.submit} onClick={() => switchActive(method)}>{method['active'] === true ? 'Выключить': 'Включить'}</button>
                        </div>
                    )})}
                    {methodsData['notHaveMethods'].map((method) => {return (
                        <div className={styles.user_row_block} key={method['PaymentMethods']['id']}>
                            <p className={styles.big_p}>Банк: {method['PaymentMethods']['name']}</p>
                            <button className={styles.submit} onClick={() => addMethod(method)}>Добавить</button>
                        </div>
                    )})}
                </div>
            );
        }
    }
    if (methodsIsError) {
        console.error(methodsError)
    }
};

export default MethodsBlock;