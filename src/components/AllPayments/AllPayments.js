import React, { useEffect} from 'react';
import './AllPayments.css'
import {applicationsapi} from "../../api/applicationsApi";
import {useNavigate} from "react-router-dom";
import useAuthRedirect from '../../hooks/keyCheckHook';
// import PaymentHistoryTable from '../Table/PaymentsHistory';
import { toast } from 'react-toastify';
import Table from '../Table/MainTable';
import SearchBlock from '../AdminAllPayments/SearchBlock';
import { adminFilterStorage } from '../../storages/FilterStorage';

const AllPayments = () => {
    useAuthRedirect()
    const navigate = useNavigate()

    const {data: historyData, isError: historyError, error: historyErrorData, refetch } = applicationsapi.useAllApplicationsQuery()
    const paymentsData = adminFilterStorage((state) => state.filteredPayments )
    const setPayments = adminFilterStorage((state) => state.setPayments)

    const baseFilter = adminFilterStorage((state) => state.getFilteredPayments)

    if(historyError){
        if (historyErrorData.status === 401) {
            navigate("/auth")
        }
        toast.error(`Ошибка получения истории!`)
    }

    useEffect(() => {
      if(historyData) {
        setPayments(historyData["result"])
        baseFilter()
      }
    }, [historyData, setPayments, baseFilter])

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
          },
        ],
        []
      );

    return (
        <div className='payments_apps_container'>
            <h2>Выплаты</h2>
            <SearchBlock />
            <div className='payments_buttons_container'>
                <button id='active' className='payments_submit' onClick={() => navigate("/payments")}>Активные</button>
                <button id='all' className='payments_submit clicked' onClick={() => refetch}>Все</button>
            </div>
            <table>

            </table>
            <div className='payments_table_container'>
                {/* <PaymentHistoryTable elements={historyData ? historyData["result"] : []}/> */}
                <Table data={paymentsData ? paymentsData : []} columns={columns}/>
            </div>
        </div>
    );

};

export default AllPayments;