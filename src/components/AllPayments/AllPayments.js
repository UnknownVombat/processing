import React from 'react';
import './AllPayments.css'
import {applicationsapi} from "../../api/applicationsApi";
import {useNavigate} from "react-router-dom";
import useAuthRedirect from '../../hooks/keyCheckHook';
import PaymentHistoryTable from '../Table/PaymentsHistory';
import { toast } from 'react-toastify';

const AllPayments = () => {
    useAuthRedirect()
    const navigate = useNavigate()

    const {data: historyData, isError: historyError, error: historyErrorData, refetch } = applicationsapi.useAllApplicationsQuery()

    if(historyError){
        if (historyErrorData.status === 401) {
            navigate("/auth")
        }
        toast.error(`Ошибка получения истории!`)
    }

    return (
        <div className='payments_apps_container'>
            <h2>Выплаты</h2>
            <div className='payments_buttons_container'>
                <button id='active' className='payments_submit' onClick={() => navigate("/payments")}>Активные</button>
                <button id='all' className='payments_submit clicked' onClick={() => refetch}>Все</button>
            </div>
            <table>

            </table>
            <div className='payments_table_container'>
                <PaymentHistoryTable elements={historyData ? historyData["result"] : []}/>
            </div>
        </div>
    );

};

export default AllPayments;