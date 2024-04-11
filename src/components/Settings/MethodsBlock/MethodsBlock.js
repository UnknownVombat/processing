import React from 'react';
import styles from "../Settings.module.css";
import MethodRow from "../MethodRow/MethodRow";
import AddMethodRow from "../AddMethodRow/AddMethodRow";
import {teamsapi} from "../../../api/teamsApi";

const MethodsBlock = () => {
    const {data: methodsData, error: methodsError, isError: methodsIsError} = teamsapi.useMethodsQuery()
    if (methodsData) {
        if (methodsData['access'] === true) {
            return (
                <div className={styles.settings_div}>
                    <h2>Реквизиты</h2>
                    {methodsData['haveMethods'].map((element) => {return MethodRow(element)})}
                    {methodsData['notHaveMethods'].map((element) => {return AddMethodRow(element)})}
                </div>
            );
        }
    }
    if (methodsIsError) {
        console.error(methodsError)
    }
};

export default MethodsBlock;