import React from 'react';
import styles from './AdminWithdraws.module.css'
import useAuthRedirect from '../../hooks/keyCheckHook';
import { withdrawsapi } from '../../api/withdrawsApi';
import { toast } from 'react-toastify';
import { AdminWithDrawsTable } from '../Table/AdminWithdrawsTable';

const AdminWithdraws = () => {
    useAuthRedirect()
    const { data: withdrawsData, isError: withdrawsIsError,  refetch: withdrawsRefetch } = withdrawsapi.useWithdrawsQuery()
    const [ trigger ] = withdrawsapi.useUpdateWithdrawMutation()

    if(withdrawsIsError) {
        toast.error("Ошибка получения данных!")
    }

    const actionClick = ({userId, action}) => {
        toast.info(userId)
        if (action === "ok"){
            const code = window.prompt(`Введите код Garantex для заявки: ${userId}`);
            if (code !== null) {
                console.log('Введенный код:', code);
                trigger({"id": userId, "code": code})
                withdrawsRefetch()
                toast.success(`Вывод для команды ${userId} подтвержден!`)
            }
        } else if (action === "cancel") {
            toast.warn(`Вывод для команды ${userId} отклонен`)
            trigger({"id": userId, "code": "Отмена"})
        }
    };

    return (
        <div className={styles.dashboard}>
            <h2>Заявки на вывод</h2>
            <AdminWithDrawsTable data={withdrawsData ? withdrawsData["result"] : []} actionClick={actionClick}/>
        </div>
    );

};

export default AdminWithdraws;