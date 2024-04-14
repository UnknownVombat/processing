import React, { useEffect, useCallback } from 'react';
import { applicationsapi } from "../../api/applicationsApi";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/keyCheckHook"
import { toast } from 'react-toastify';
import './Payments.css'
import { dataStorage } from '../../storages/DataStorage';
import CopyToClipboard from 'react-copy-to-clipboard';
import Table from '../Table/MainTable';


const Payments = () => {
    useAuthRedirect()
    const navigate = useNavigate()
    const needUpdates = dataStorage((state) => state.getAppsUpdate)
    const {data: allApps, refetch: allAppsRefetch } = applicationsapi.useActiveApplicationsQuery("", {
        refetchOnMountOrArgChange: true
    })
    const [triggerStatus] = applicationsapi.useUpdateStatusMutation()

    // const [filteredApps, setFilteredApps] = useState(allApps ? allApps["result"] : [])

    useEffect(() => {
        let id = 0
        if (needUpdates) {
          id = setInterval(() => {
            allAppsRefetch();
          }, 2000);
        }
        return () => {
          clearInterval(id);
        };
      }, [needUpdates, allAppsRefetch]);

    const updateStatus = useCallback(({ newStatus, key, clientName }) => {
        const body = {'foreign_id': key, 'status': newStatus}
        triggerStatus(body)
        allAppsRefetch()
        if(newStatus === "paid") {
            toast.success(`Заявка для ${clientName} подтверждена!`)
        } else {
            
            const message = window.prompt(`Введите причину отклонения для заявки:${key} | ${clientName}`);
            if (message !== null) {
                console.log(`Введенная причина для ${key} | ${clientName} :`, message);
                toast.warn(`Заявка для ${clientName} отклонена!`)
            }
        }
    }, [triggerStatus, allAppsRefetch]);

    const columns = React.useMemo(
        () => [
          {
            Header: "ID",
            accessor: "foreign_id"
          },
          {
            Header: "СУММА",
            accessor: "amount",
            Cell: ({ row }) => (
                row?.original?.amount.toFixed(2).replace(/\d(?=(\d{3})+.)/g, '$& ').replace(/./, ',')
            )
          },
          {
            Header: "РЕКВИЗИТЫ",
            accessor: "requisite",
            Cell: ({ row }) => (
              <CopyToClipboard text={row?.original?.requisite.replace(/[^a-zA-Z0-9]/g, '')}>
                <span style={{ cursor: "pointer", textDecoration: "underline"}} onClick={()=> toast.info(`Реквизиты для ${row?.original?.client_initials} скопированы!`)}>{row?.original?.requisite}</span>
              </CopyToClipboard>
            )
          },
          {
            Header: "МЕТОД",
            accessor: "name"
          },
          {
            Header: "ФИО",
            accessor: "client_initials"
          },
          {
            Header: "СТАТУС",
            accessor: "status",
            Cell: ({ row }) => (
              <div className={`status ${row?.original?.status}`} >{row?.original?.status}</div>
            )
          },
          {
            Header: "ВРЕМЯ СОЗДАНИЯ",
            accessor: "created_at",
            Cell: ({ row }) => 
                new Date(row.original.created_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
          },
          {
            Header: "ДЕЙСТВИЯ",
            Cell: ({ row }) => (
                <div>
                    <button className='button green' onClick={() => updateStatus({ newStatus: "paid", key: row.original.foreign_id, clientName: row.original.client_initials })}>Подтвердить</button>
                    <button className='button red' onClick={() => updateStatus({ newStatus: "canceled", key: row.original.foreign_id, clientName: row.original.client_initials })}>Отклонить</button>
                    <CopyToClipboard text={
                      `${row.original.foreign_id}\n\n${row.original.name.toUpperCase()}\n\n${row?.original?.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}\n\n${row.original.client_initials}\n\n${row?.original?.requisite.replace(/[^a-zA-Z0-9]/g, '')}`
                      }>
                        <button className='button copy' onClick={() => toast.info(`Заявка № ${row.original.foreign_id} скопирована в буфер обмена`)}>Копировать</button>
                    </CopyToClipboard>
                </div>
            )
          }
        ],
        [updateStatus]
      );


    return (
        <div className='payments_apps_container'>
            <h2>Выплаты</h2>
            <div className='payments_buttons_container'>
                <button id='active' className='payments_submit clicked' onClick={() => allAppsRefetch()}>Активные</button>
                <button id='all' className='payments_submit' onClick={() => navigate("/history")}>Все</button>
            </div>
            <div className='payments_table_container'>
                <Table data={allApps ? allApps["result"]: []} columns={columns}/>
            </div>
        </div>
    );
};

export default Payments;
