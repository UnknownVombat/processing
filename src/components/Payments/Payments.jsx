// import React, { useEffect, useState } from 'react';
import React, { useEffect } from 'react';
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
    // const [intervalId, setIntervalId] = useState(null);
    const {data: allApps, refetch: allAppsRefetch } = applicationsapi.useActiveApplicationsQuery("", {
        refetchOnMountOrArgChange: true
    })
    const [triggerStatus] = applicationsapi.useUpdateStatusMutation()

    useEffect(() => {
        let id = 0
        // console.log(intervalId)
        if (needUpdates) {
          id = setInterval(() => {
            allAppsRefetch();
          }, 5000);
          // setIntervalId(id);
        }
        return () => {
          clearInterval(id);
        };
      }, [needUpdates, allAppsRefetch]);
    

    function updateStatus({ newStatus, key, clientName }) {
        const body = {'foreign_id': key, 'status': newStatus}
        triggerStatus(body)
        allAppsRefetch()
        if(newStatus === "paid") {
            toast.success(`Заявка для ${clientName} подтверждена!`)
        } else {
            toast.warn(`Заявка для ${clientName} отклонена!`)
        }
    }


    return (
        <div className='payments_apps_container'>
            <h2>Выплаты</h2>
            <div className='payments_buttons_container'>
                <button id='active' className='payments_submit clicked' onClick={() => allAppsRefetch()}>Активные</button>
                <button id='all' className='payments_submit' onClick={() => navigate("/history")}>Все</button>
            </div>
            <div className='payments_table_container'>
                <PaymentTable elements={allApps ? allApps["result"]: []} updateStat={updateStatus}/>
            </div>
        </div>
    );
};

export default Payments;
