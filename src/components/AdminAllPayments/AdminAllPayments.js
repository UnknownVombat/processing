import React from 'react';
import useAuthRedirect from '../../hooks/keyCheckHook';
import {applicationsapi} from "../../api/applicationsApi"
import AdminPaymentsTable from '../Table/AdminAllpayments';
import { toast } from 'react-toastify';


const AdminAllPayments = () => {
    useAuthRedirect()

    const {data: appsData, error: appsError, isError: appsIsError } = applicationsapi.useAdminAllApplicationsQuery()

    if(appsIsError){
        toast.error("Ошибка получения данных!")
        console.log(appsError)
    }

    return (
        <div className='payments_apps_container'>
            <h2>Все сделки</h2>
            <div className='payments_table_container'>
                <AdminPaymentsTable payments={appsData ? appsData["result"] : []}/>
            </div>
        </div>
    );

};

export default AdminAllPayments;