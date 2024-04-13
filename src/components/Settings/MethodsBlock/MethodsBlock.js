import React from 'react';
import styles from "../Settings.module.css";
import {teamsapi} from "../../../api/teamsApi";
import {useNavigate} from "react-router-dom";
import { MethodsTable } from '../../Table/MethodsTable'
import { toast } from 'react-toastify';




const MethodsBlock = () => {
    const {data: methodsData, error: methodsError, isError: methodsIsError, refetch: methodRefetch} = teamsapi.useMethodsQuery()
    const [switchMethod, {error, isError}] = teamsapi.useSwitchActiveMutation()
    const [addNewMethod, {data: addData, error: addError, isError: addIsError}] = teamsapi.useAddMethodMutation()

    const navigate = useNavigate()

    function switchActive(method) {
        const active = method['active']
        const body = {'team_id': method['id'], 'method_id': method['method_id'], 'active': !active}
        switchMethod(body)
        methodRefetch()
    }

    if (isError) {
        if (error.status === 401) {
            console.error(error)
            navigate('/auth')
        } else {
            toast.error("Активность не изменена")
            console.error(error)
        }
    }

    if(addData) {
        toast.success("Метод добавлен", {autoClose: 2000})
    }

    function addMethod(method) {
        const body = {'method_id': method['PaymentMethods']['id']}
        addNewMethod(body)
        methodRefetch()
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
                    <MethodsTable methodsData={methodsData['haveMethods']} switchActive={switchActive} />

                    {methodsData['notHaveMethods'].map((method) => {return (
                        <div className={styles.user_row_block} key={method['PaymentMethods']['id']}>
                            <p className={styles.big_p}>Банк: {method['PaymentMethods']['name']}</p>
                            <button className={styles.row_submit} onClick={() => addMethod(method)}>Добавить</button>
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