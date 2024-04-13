import React, { useEffect, useState } from 'react';
// import { authStorage } from "../../storages/AuthStorage";
// import { applicationStorage } from "../../storages/ApplicationStorage";
// import { methodsapi } from "../../api/methodsApi";
import { applicationsapi } from "../../api/applicationsApi";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/keyCheckHook"
import PaymentTable from '../Table/PaymentsTable';
import { toast } from 'react-toastify';
import './Payments.css'
import { dataStorage } from '../../storages/DataStorage';


const Payments = () => {
    useAuthRedirect()
    const navigate = useNavigate()
    const needUpdates = dataStorage((state) => state.getAppsUpdate)
    const [intervalId, setIntervalId] = useState(null);
    const {data: allApps, refetch: allAppsRefetch } = applicationsapi.useActiveApplicationsQuery()
    const [triggerStatus] = applicationsapi.useUpdateStatusMutation()

    useEffect(() => {
        if (needUpdates) {
          const id = setInterval(() => {
            allAppsRefetch();
          }, 1500);
          setIntervalId(id);
        } else {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        return () => {
          clearInterval(intervalId);
        };
      }, [needUpdates, allAppsRefetch, intervalId]);
    

    function updateStatus({ newStatus, key, clientName }) {
        const body = {'foreign_id': key, 'status': newStatus}
        triggerStatus(body)
        if(newStatus === "paid") {
            toast.success(`Заявка для ${clientName} подтверждена!`)
            allAppsRefetch()
        } else {
            toast.warn(`Заявка для ${clientName} отклонена!`)
            allAppsRefetch()
        }
    }

    function clickButton(el_id){
        if (el_id === 'active') {
            window.location.reload()
        } else {
            navigate('/history')
        }
    }

    return (
        <div className='payments_apps_container'>
            <h2>Выплаты</h2>
            <div className='payments_buttons_container'>
                <button id='active' className='payments_submit clicked' onClick={() => clickButton('active')}>Активные</button>
                <button id='all' className='payments_submit' onClick={() => clickButton('all')}>Все</button>
            </div>
            <div className='payments_table_container'>
                <PaymentTable elements={allApps ? allApps["result"]: []} updateStat={updateStatus}/>
            </div>
        </div>
    );
};

export default Payments;
