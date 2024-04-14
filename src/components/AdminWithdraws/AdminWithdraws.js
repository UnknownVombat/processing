import React, { useCallback } from 'react';
import styles from './AdminWithdraws.module.css'
import useAuthRedirect from '../../hooks/keyCheckHook';
import { withdrawsapi } from '../../api/withdrawsApi';
import { toast } from 'react-toastify';
import Table from '../Table/MainTable';
import CopyToClipboard from 'react-copy-to-clipboard';

const AdminWithdraws = () => {

    useAuthRedirect()
    const { data: withdrawsData, isError: withdrawsIsError,  refetch: withdrawsRefetch } = withdrawsapi.useWithdrawsQuery()
    const [ trigger ] = withdrawsapi.useUpdateWithdrawMutation()

    if(withdrawsIsError) {
        toast.error("Ошибка получения данных!")
    }

    const actionClick = useCallback(
        ({userId, action}) => {
            toast.info(userId)
            if (action === "ok"){
                const course = window.prompt(`Введите курс пополнения: ${userId}`);
                const courseD = parseFloat(course);
                if (!isNaN(courseD) && (Number.isInteger(courseD) || Number.isFinite(courseD))) {
                    console.log('Введенный код:', course);
                    trigger({"id": userId, "course": course})
                    withdrawsRefetch()
                    toast.success(`Вывод для команды ${userId} подтвержден!`)
                } else {
                    toast.error('Курс не может быть строковым представлением!')
                }
            } else if (action === "cancel") {
                toast.warn(`Вывод для команды ${userId} отклонен`)
                trigger({"id": userId, "course": "Отмена"})
            }
        }, [trigger, withdrawsRefetch]
    )


    const columns = React.useMemo(() => [
        {
            Header: "ID ЗАЯВКИ",
            accessor: "id"
          },
          {
              Header: "ID КОМАНДЫ",
              accessor: "team_id"
          },
          {
              Header: "ИМЯ",
              accessor: "name"
          },
          {
              Header: "СУММА",
              accessor: "amount",
              Cell: ({ row }) => (
                  row?.original?.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace(/\./, ',')
              )
          },
          {
            Header: "АДРЕС",
            accessor: "address",
            Cell: ({ row }) => (
              <CopyToClipboard text={row?.original?.address}>
                <div style={{ cursor: "pointer"}} onClick={() => toast.info(`Реквизиты заявки с ID ${row.original.id} скопированы!`)}>{row?.original?.address}</div>
              </CopyToClipboard>
            )
          },
          
          {
            Header: "ДЕЙСТВИЯ",
            Cell: ({ row }) => (
              <>
              <button className='button green' onClick={() => actionClick({userId: row.original.id, action: "ok"})}>
                ПОДТВЕРДИТЬ
              </button>
              <button className='button red' onClick={() => actionClick({userId: row.original.id, action: "cancel"})}>
                ОТКЛОНИТЬ
              </button>
              </>
              
            )
          }
    ], [actionClick])

    return (
        <div className={styles.dashboard}>
            <h2>Заявки на пополнения</h2>
            <Table columns={columns} data={withdrawsData ? withdrawsData["result"] : []}/>
        </div>
    );

};

export default AdminWithdraws;