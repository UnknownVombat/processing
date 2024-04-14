import React, { useCallback } from "react";
import styles from './Dashboard.module.css'
import { userapi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import WithdrawBlock from "./WithdrawBlock/WithdrawBlock";
import useAuthRedirect from "../../hooks/keyCheckHook";
import Table from "../Table/MainTable";
import { toast } from "react-toastify";


const Dashboard = () => {
    useAuthRedirect()
    const navigate = useNavigate()

    const { data: workersData, error: workersError, isError: workersIsError } = userapi.useWorkersQuery()

    const [deleteSession, {error, isError}] = userapi.useDeleteSessionMutation()

    if (isError || workersIsError) {
        if (error) {
            if (error.status === 401) {
                console.log(error.message)
                navigate('/auth')
            } else {
                console.log(error.message)
            }
        }
        if(workersError) {
            if (workersError.status === 401) {
                console.log(workersError.message)
                navigate('/auth')
            } else {
                console.log(workersError.message)
            }
        }
        
    }

    const delSession = useCallback((user_id) => {
        const body = {'user_id': user_id};
        deleteSession(body);
        toast.success("Сессия удалена!");
        navigate("/")
    }, [deleteSession, navigate]);

    const columns = React.useMemo(
        () => [
            {
                Header: "ИМЯ",
                accessor: "name",
            },
            {
                Header: "БАЛАНС",
                accessor: "balance",
                Cell: ({ row }) => (
                    row?.original?.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                )
            },
            {
                Header: "СТАТУС",
                accessor: "status",
            }
        ], []
    )

    const sessionColumns = React.useMemo(
        () => [
          {
            Header: "ПОЛЬЗОВАТЕЛЬ",
            accessor: "user"
          },
          {
            Header: "IP",
            accessor: "ip"
          },
          {
            Header: "ГОРОД",
            accessor: "city"
          },
          {
            Header: "ДЕЙСТВИЯ",
            Cell: ({ row }) => (
              <button className='button red' onClick={() => delSession(row.original?.id)}>Завершить</button>
            )
          }
        ],
        [delSession]
      );


    if (workersData) {
        if (workersData['status'] === 'user'){
            return (
                <div className={styles.user_dashboard_2}>
                    <h2>Дашборд</h2>
                    <div className={styles.user_row}>
                        <p>Имя: {workersData['user']['name']}</p>
                        <p>Баланс: {workersData['user']['balance']}</p>
                        <p>Статус: {workersData['user']['status']}</p>
                        <WithdrawBlock />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.all_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.your_data}>
                        <p className={styles.big_p}>Ваши данные:</p>
                        <p className={styles.little_p}>Имя: {workersData['user']['name']} Баланс: {workersData['user']['balance']} Статус: {workersData['user']['status']}</p>
                    </div>
                    <div className={styles.dashboard}>
                        <div className={styles.user_dashboard}>
                            <div className={styles.users_row}>
                                <p className={styles.big_p}>Данные о команде:</p>
                                <Table columns={columns} data={workersData['users']}/>
                                <WithdrawBlock />
                            </div>
                        </div>
                        <div className={styles.user_dashboard}>
                            <p className={styles.session_p}>Данные о сессиях:</p>
                            <Table data={workersData ? workersData.sessions.map(session => session.WorkersSessions): []} columns={sessionColumns} />
                        </div>
                    </div>
                </div>
            )
        }
    }
};


export default Dashboard;