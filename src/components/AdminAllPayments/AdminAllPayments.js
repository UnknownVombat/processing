import React, { useEffect } from 'react';
import useAuthRedirect from '../../hooks/keyCheckHook';
import {applicationsapi} from "../../api/applicationsApi"
import Table from '../Table/MainTable';
import { toast } from 'react-toastify';
import SearchBlock from './SearchBlock';
import { adminFilterStorage } from '../../storages/FilterStorage';


const AdminAllPayments = () => {
    useAuthRedirect()
    const paymentsData = adminFilterStorage((state) => state.filteredPayments )
    const setPayments = adminFilterStorage((state) => state.setPayments)

    const baseFilter = adminFilterStorage((state) => state.getFilteredPayments)

    const {data: appsData, error: appsError, isError: appsIsError } = applicationsapi.useAdminAllApplicationsQuery()
    console.log(appsData)
    useEffect(() => {
      if(appsData) {
        setPayments(appsData["result"])
        baseFilter()
      }
    }, [appsData, setPayments, baseFilter])

    const columns = React.useMemo(
        () => [
          {
            Header: "Айди заявки",
            accessor: "foreign_id"
          },
          {
            Header: "ID команды",
            accessor: "team_id"
          },
          {
            Header: "ID юзера",
            accessor: "worker_id"
          },
          {
            Header: "СУММА",
            accessor: "amount",
            Cell: ({ row }) => (
                row?.original?.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace(/\./, ',')
            )
          },
          {
            Header: "Реквизиты",
            accessor: "requisite"
          },
          {
            Header: "Метод",
            accessor: "name"
          },
          {
            Header: "ФИО",
            accessor: "client_initials"
          },
          {
            Header: "Статус",
            accessor: "status",
            Cell: ({ row }) => (
              <div className={`status ${row?.original?.status}`} >{row?.original?.status}</div>
            )
          },
          {
            Header: "Время создания",
            accessor: "created_at",
            Cell: ({ row }) => (
                new Date(row.original.created_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            )
          },
          {
            Header: "Время закрытия",
            accessor: "closed_at",
            Cell: ({ row }) => (
                <>
                {row?.original?.closed_at ? new Date(row.original.closed_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }) : "Ожидает оплаты"}
                </>
            )
          }
        ],
        []
      );

    if(appsIsError){
        toast.error("Ошибка получения данных!")
        console.log(appsError)
    }

    return (
        <div className='payments_apps_container'>
            <h2>Все сделки</h2>
            <SearchBlock/>
            <div className='payments_table_container'>
                <Table data={paymentsData ? paymentsData : []} columns={columns}/>
            </div>
        </div>
    );

};

export default AdminAllPayments;